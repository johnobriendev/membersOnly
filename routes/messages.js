const express = require('express');
const router = express.Router();
const {isAuthenticated, isAdmin} = require('../middleware/isAuth');
const messagesController = require('../controllers/messagesController');

// Display new message form
router.get('/new', isAuthenticated, messagesController.new_message_get);

// Handle new message form submission
router.post('/new', isAuthenticated, messagesController.new_message_post);

// Display all messages
router.get('/', isAuthenticated, messagesController.message_list);

// Handle message deletion (only for admin)
router.post('/:id/delete', isAuthenticated, isAdmin, messagesController.message_delete_post);


module.exports = router;