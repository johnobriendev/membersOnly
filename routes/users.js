const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middleware/isAuthenticated');

// Display join form
router.get('/join', isAuthenticated, userController.join_get);

// Handle join form submission
router.post('/join', isAuthenticated, userController.join_post);

module.exports = router;