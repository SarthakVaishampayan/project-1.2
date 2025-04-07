require('dotenv').config();
const mongoose = require('mongoose');
const Booking = require('../models/Booking');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dropIndexes = async () => {
    try {
        // Drop all indexes from the Booking collection
        await Booking.collection.dropIndexes();
        console.log('All indexes dropped successfully');
    } catch (error) {
        console.error('Error dropping indexes:', error);
    } finally {
        mongoose.disconnect();
    }
};

dropIndexes(); 