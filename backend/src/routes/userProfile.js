const express = require('express');
const {
    getUserProfile,
    updateUserProfile,
    updatePassword,
    getUserBookings,
    uploadProfilePicture,
    deleteUserAccount
} = require('../controllers/userProfile');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/password', protect, updatePassword);
router.get('/bookings', protect, getUserBookings);
router.put('/profile/picture', protect, uploadProfilePicture);
router.delete('/profile', protect, deleteUserAccount);

module.exports = router; 