const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {isAuthenticated, isAdmin} = require('../middleware/isAuth');

// Display join form
router.get('/join', isAuthenticated, userController.join_get);

// Handle join form submission
router.post('/join', isAuthenticated, userController.join_post);

// New admin routes
router.get('/admin', isAuthenticated, userController.admin_get);
router.post('/admin', isAuthenticated, userController.admin_post);

module.exports = router;