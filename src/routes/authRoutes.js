const express = require('express');
const router = express.Router();
const authGoogleController = require('../controllers/AuthGoogleController');

router.get('/google', authGoogleController.googleAuth);
router.get('/google/callback', authGoogleController.googleAuthCallback, authGoogleController.googleAuthCallbackSuccess);
router.get('/logout', authGoogleController.logout);

module.exports = router;
