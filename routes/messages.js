const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const messageController = require('../controllers/messageController');

// Display new message form
router.get('/new', isAuthenticated, messageController.new_message_get);

// Handle new message form submission
router.post('/new', isAuthenticated, messageController.new_message_post);

module.exports = router;