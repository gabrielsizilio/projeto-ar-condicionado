const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthGoogleController');

router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback, authController.googleAuthCallbackSuccess);
router.get('/logout', authController.logout);

module.exports = router;
