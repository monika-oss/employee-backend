const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const authController = require('../controllers/authController');

// Login Route
router.post('/login', authController.login);

// Reset Password Route
router.post('/reset-password', verifyToken, authController.resetPassword);

module.exports = router;
