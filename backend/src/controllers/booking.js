const Booking = require('../models/Booking');
const GamingParlour = require('../models/GamingParlour');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Device = require('../models/Device');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
exports.getBookings = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id)
        .populate({
            path: 'parlour',
            select: 'name description location price'
        })
        .populate({
            path: 'user',
            select: 'name email'
        });

    if (!booking) {
        return next(new ErrorResponse(`No booking found with id of ${req.params.id}`, 404));
    }

    // Make sure user is booking owner or admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to access this booking`, 401));
    }

    res.status(200).json({
        success: true,
        data: booking
    });
});

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.user = req.user.id;

    // Check if parlour exists
    const parlour = await GamingParlour.findById(req.body.parlour);
    if (!parlour) {
        return next(new ErrorResponse(`No parlour found with id of ${req.body.parlour}`, 404));
    }

    // Check if device exists
    const device = await Device.findById(req.body.device);
    if (!device) {
        return next(new ErrorResponse(`No device found with id of ${req.body.device}`, 404));
    }

    // Check if console unit exists in device and is available
    const consoleUnit = device.consoleUnits.find(unit => unit.consoleId === req.body.consoleUnit);
    if (!consoleUnit) {
        return next(new ErrorResponse(`Console unit ${req.body.consoleUnit} does not exist in this device`, 400));
    }
    if (consoleUnit.status !== 'available') {
        return next(new ErrorResponse(`Console unit ${req.body.consoleUnit} is not available for booking (status: ${consoleUnit.status})`, 400));
    }

    // Check if date is in the future
    const bookingDate = new Date(req.body.date);
    if (bookingDate < new Date()) {
        return next(new ErrorResponse('Booking date must be in the future', 400));
    }

    // Check if time slot is available for this specific console unit
    const existingBooking = await Booking.findOne({
        device: req.body.device,
        consoleUnit: req.body.consoleUnit,
        date: req.body.date,
        status: { $ne: 'cancelled' },
        $or: [
            {
                startTime: { $lt: req.body.endTime },
                endTime: { $gt: req.body.startTime }
            }
        ]
    });

    if (existingBooking) {
        return next(new ErrorResponse('This time slot is already booked for this console unit', 400));
    }

    // Calculate duration and total price
    const startTime = new Date(`2000-01-01T${req.body.startTime}`);
    const endTime = new Date(`2000-01-01T${req.body.endTime}`);
    const duration = (endTime - startTime) / (1000 * 60 * 60); // Convert to hours

    if (duration <= 0) {
        return next(new ErrorResponse('End time must be after start time', 400));
    }

    req.body.duration = duration;
    req.body.totalPrice = duration * parlour.price;

    const booking = await Booking.create(req.body);

    res.status(201).json({
        success: true,
        data: booking
    });
});

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = asyncHandler(async (req, res, next) => {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
        return next(new ErrorResponse(`No booking found with id of ${req.params.id}`, 404));
    }

    // Make sure user is booking owner or admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this booking`, 401));
    }

    // If booking is already completed or cancelled, prevent updates
    if (booking.status === 'completed' || booking.status === 'cancelled') {
        return next(new ErrorResponse('Cannot update a completed or cancelled booking', 400));
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: booking
    });
});

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if the booking belongs to the user
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this booking'
      });
    }

    // Check if the booking is already cancelled or completed
    if (booking.status === 'cancelled' || booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel a booking that is already ${booking.status}`
      });
    }

    // Update the booking status to cancelled
    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/user/:userId
// @access  Private/Admin
exports.getUserBookings = asyncHandler(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.params.userId })
        .populate({
            path: 'parlour',
            select: 'name description location price'
        });

    res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings
    });
});

// @desc    Get bookings for a specific parlour and date
// @route   GET /api/bookings/parlour/:parlourId
// @access  Public
exports.getParlourBookings = async (req, res) => {
  try {
    const { date } = req.query;
    const { parlourId } = req.params;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a date'
      });
    }

    const bookings = await Booking.find({
      parlour: parlourId,
      date: date,
      status: { $ne: 'cancelled' }
    }).select('consoleUnit startTime endTime status');

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
}; 