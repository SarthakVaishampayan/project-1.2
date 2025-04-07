const Device = require('../models/Device');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Booking = require('../models/Booking');

// @desc    Get all devices
// @route   GET /api/devices
// @access  Private
exports.getDevices = asyncHandler(async (req, res, next) => {
    const devices = await Device.find().populate('parlour');
    res.status(200).json({
        success: true,
        count: devices.length,
        data: devices
    });
});

// @desc    Get single device
// @route   GET /api/devices/:id
// @access  Private
exports.getDevice = asyncHandler(async (req, res, next) => {
    const device = await Device.findById(req.params.id).populate('parlour');

    if (!device) {
        return next(new ErrorResponse(`Device not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: device
    });
});

// @desc    Create new device
// @route   POST /api/devices
// @access  Private/Admin
exports.createDevice = asyncHandler(async (req, res, next) => {
    const device = await Device.create(req.body);

    res.status(201).json({
        success: true,
        data: device
    });
});

// @desc    Update device
// @route   PUT /api/devices/:id
// @access  Private/Admin
exports.updateDevice = asyncHandler(async (req, res, next) => {
    let device = await Device.findById(req.params.id);

    if (!device) {
        return next(new ErrorResponse(`Device not found with id of ${req.params.id}`, 404));
    }

    device = await Device.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: device
    });
});

// @desc    Delete device
// @route   DELETE /api/devices/:id
// @access  Private/Admin
exports.deleteDevice = asyncHandler(async (req, res, next) => {
    const device = await Device.findById(req.params.id);

    if (!device) {
        return next(new ErrorResponse(`Device not found with id of ${req.params.id}`, 404));
    }

    await device.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc    Get devices for a parlour
// @route   GET /api/devices/parlour/:parlourId
// @access  Private
exports.getParlourDevices = asyncHandler(async (req, res, next) => {
    const devices = await Device.find({ parlour: req.params.parlourId });

    res.status(200).json({
        success: true,
        count: devices.length,
        data: devices
    });
});

// @desc    Get available devices for a parlour on a specific date
// @route   GET /api/devices/available/:parlourId
// @access  Private
exports.getAvailableDevices = asyncHandler(async (req, res, next) => {
    const { date } = req.query;
    
    if (!date) {
        return next(new ErrorResponse('Please provide a date', 400));
    }

    // Get all devices for the parlour
    const devices = await Device.find({ parlour: req.params.parlourId });

    // Get bookings for the date
    const bookings = await Booking.find({
        date: new Date(date),
        status: { $ne: 'cancelled' }
    });

    // Filter available devices and console units
    const availableDevices = devices.map(device => {
        const bookedConsoleUnits = bookings
            .filter(booking => booking.device.toString() === device._id.toString())
            .map(booking => ({
                consoleId: booking.consoleUnit,
                startTime: booking.startTime,
                endTime: booking.endTime
            }));

        const availableConsoleUnits = device.consoleUnits.map(unit => {
            const isBooked = bookedConsoleUnits.some(booked => 
                booked.consoleId === unit.consoleId
            );
            
            return {
                ...unit.toObject(),
                isBooked
            };
        });

        return {
            ...device.toObject(),
            availableConsoleUnits: availableConsoleUnits.filter(unit => !unit.isBooked)
        };
    });

    res.status(200).json({
        success: true,
        count: availableDevices.length,
        data: availableDevices
    });
});
