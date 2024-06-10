const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {isAuthenticated, isAdmin} = require('../middleware/isAuth');


// New admin routes
router.get('/admin', isAuthenticated, userController.admin_get);
router.post('/admin', isAuthenticated, userController.admin_post);

// Display join form
router.get('/join', isAuthenticated, userController.join_get);

// Handle join form submission
router.post('/join', isAuthenticated, userController.join_post);

// Route to display all users
router.get('/', isAuthenticated, userController.users_list);

// Route to display an individual user and their messages
router.get('/:id', isAuthenticated, userController.user_detail);

module.exports = router;