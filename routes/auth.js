const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Display sign-up form
router.get('/sign-up', authController.sign_up_get);

// Handle sign-up form submission
router.post('/sign-up', authController.sign_up_post);

// Display login form
router.get('/log-in', authController.log_in_get);

// Handle login form submission
router.post('/log-in', authController.log_in_post);

// Handle logout
router.get('/log-out', authController.log_out_get);

module.exports = router;