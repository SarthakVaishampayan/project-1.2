const express = require('express');
const {
    getDevices,
    getDevice,
    createDevice,
    updateDevice,
    deleteDevice,
    getParlourDevices,
    getAvailableDevices
} = require('../controllers/device');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(protect, getDevices)
    .post(protect, authorize('admin'), createDevice);

router
    .route('/:id')
    .get(protect, getDevice)
    .put(protect, authorize('admin'), updateDevice)
    .delete(protect, authorize('admin'), deleteDevice);

router.get('/parlour/:parlourId', protect, getParlourDevices);
router.get('/available/:parlourId', protect, getAvailableDevices);

module.exports = router;
