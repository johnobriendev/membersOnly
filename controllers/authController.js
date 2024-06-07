const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');

// Display sign-up form
exports.sign_up_get = (req, res) => {
  res.render('sign-up');
};

// Handle sign-up form submission
exports.sign_up_post = [
  // Validation and sanitization
  body('first_name').trim().isLength({ min: 3, max: 50 }).withMessage('First name must be between 3 and 50 characters.'),
  body('last_name').trim().isLength({ min: 3, max: 50 }).withMessage('Last name must be between 3 and 50 characters.'),
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('sign-up', { errors: errors.array(), user: req.body });
    }
    try {

      const hashedPassword = await bcrypt.hash(req.body.password, 10);


      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashedPassword,  // password will be hashed by middleware
      });
      await user.save();
      res.redirect('/auth/log-in');
    } catch (err) {
      next(err);
    }
  }
];

// Display login form
exports.log_in_get = (req, res) => {
  res.render('log-in');
};

// Handle login form submission
exports.log_in_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/log-in',
  failureFlash: true
});

// Handle logout
exports.log_out_get = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
