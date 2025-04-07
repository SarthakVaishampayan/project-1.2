const express = require('express');
const {
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking,
    getUserBookings,
    getParlourBookings
} = require('../controllers/booking');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(protect, authorize('admin'), getBookings)
    .post(protect, createBooking);

router
    .route('/:id')
    .get(protect, getBooking)
    .put(protect, updateBooking)
    .delete(protect, deleteBooking);

router.get('/user/:userId', protect, authorize('admin'), getUserBookings);
router.get('/parlour/:parlourId', getParlourBookings);

module.exports = router; 