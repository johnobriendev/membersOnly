const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuth');
const messagesController = require('../controllers/messagesController');

// Display new message form
router.get('/new', isAuthenticated, messagesController.new_message_get);

// Handle new message form submission
router.post('/new', isAuthenticated, messagesController.new_message_post);

module.exports = router;