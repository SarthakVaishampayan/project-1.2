const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please add a user']
    },
    parlour: {
        type: mongoose.Schema.ObjectId,
        ref: 'GamingParlour',
        required: [true, 'Please add a gaming parlour']
    },
    device: {
        type: mongoose.Schema.ObjectId,
        ref: 'Device',
        required: [true, 'Please add a device']
    },
    consoleUnit: {
        type: String,
        required: [true, 'Please specify console unit']
    },
    date: {
        type: Date,
        required: [true, 'Please add a booking date']
    },
    startTime: {
        type: String,
        required: [true, 'Please add a start time']
    },
    endTime: {
        type: String,
        required: [true, 'Please add an end time']
    },
    duration: {
        type: Number,
        required: [true, 'Please add duration in hours']
    },
    totalPrice: {
        type: Number,
        required: [true, 'Please add total price']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    paymentId: {
        type: String
    },
    specialRequests: {
        type: String,
        maxlength: [500, 'Special requests cannot be more than 500 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Calculate total price before saving
BookingSchema.pre('save', function(next) {
    if (this.isModified('duration')) {
        this.totalPrice = this.duration * this.device.pricePerHour;
    }
    next();
});

module.exports = mongoose.model('Booking', BookingSchema); 