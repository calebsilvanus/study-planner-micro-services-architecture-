const express = require('express');
const router = express.Router();
const { callback } = require('../controllers/authController'); // Import the callback handler

// Auth0 callback route to handle the OAuth callback
router.get('/callback', callback);  // This is where the user is redirected after login

module.exports = router;
