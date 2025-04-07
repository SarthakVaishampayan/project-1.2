const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    parlour: {
        type: mongoose.Schema.ObjectId,
        ref: 'GamingParlour',
        required: [true, 'Please add a gaming parlour']
    },
    type: {
        type: String,
        required: [true, 'Please specify device type'],
        enum: ['PlayStation 1', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PlayStation 5', 'Xbox 360', 'Xbox One', 'Xbox Series X', 'Nintendo Switch']
    },
    consoleUnits: [{
        consoleId: {
            type: String,
            required: [true, 'Please add console unit ID']
        },
        status: {
            type: String,
            enum: ['available', 'in-use', 'maintenance'],
            default: 'available'
        }
    }],
    pricePerHour: {
        type: Number,
        required: [true, 'Please add price per hour']
    }
});

module.exports = mongoose.model('Device', DeviceSchema);
