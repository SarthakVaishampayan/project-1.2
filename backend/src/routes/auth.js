const express = require('express');
const router = express.Router();
const { register, login, getMe, makeAdmin } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/make-admin/:id', makeAdmin);

module.exports = router; 