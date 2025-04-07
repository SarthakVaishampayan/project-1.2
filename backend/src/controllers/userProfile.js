const User = require('../models/User');
const Booking = require('../models/Booking');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const path = require('path');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true
    }).select('-password');

    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc    Update password
// @route   PUT /api/users/password
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('Current password is incorrect', 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
});

// @desc    Get user booking history
// @route   GET /api/users/bookings
// @access  Private
exports.getUserBookings = asyncHandler(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.user.id })
        .populate({
            path: 'parlour',
            select: 'name description location price images'
        })
        .sort('-createdAt');

    res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings
    });
});

// @desc    Upload profile picture
// @route   PUT /api/users/profile/picture
// @access  Private
exports.uploadProfilePicture = asyncHandler(async (req, res, next) => {
    if (!req.files) {
        return next(new ErrorResponse('Please upload a file', 400));
    }

    const file = req.files.file;

    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse('Please upload an image file', 400));
    }

    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
    }

    // Create custom filename
    file.name = `photo_${req.user.id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.error(err);
            return next(new ErrorResponse('Problem with file upload', 500));
        }

        await User.findByIdAndUpdate(req.user.id, { photo: file.name });

        res.status(200).json({
            success: true,
            data: file.name
        });
    });
});

// @desc    Delete user account
// @route   DELETE /api/users/profile
// @access  Private
exports.deleteUserAccount = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    // Cancel all pending bookings
    await Booking.updateMany(
        { user: req.user.id, status: 'pending' },
        { status: 'cancelled' }
    );

    await user.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
}); 