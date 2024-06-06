const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();


/////SIGN UP ROUTES///////
router.get('/sign-up', (req, res) => res.render('sign-up'));

router.post('/sign-up', [
  body('username')
    .trim()
    .isLength({ min: 1 }).withMessage('Username is required.')
    .isAlphanumeric().withMessage('Username must be alphanumeric.')
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
    .escape(),
  body('confirmPassword')
    .trim()
    .isLength({ min: 6 }).withMessage('Confirm password must be at least 6 characters long.')
    .custom((value, { req }) => value === req.body.password).withMessage('Passwords must match.')
    .escape()
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('sign-up', { 
      errors: errors.array(),
      username: req.body.username
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    password: hashedPassword
  });
  await user.save();
  res.redirect('/');
}));

/////LOGIN ROUTES///////

router.get('/login', (req, res) => res.render('login'));

router.post('/login', [
  body('username')
    .trim()
    .isLength({ min: 1 }).withMessage('Username is required.')
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 1 }).withMessage('Password is required.')
    .escape()
], asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('login', { 
      errors: errors.array()
    });
  }

  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })(req, res, next);
}));

////LOG OUT ROUTES////////////
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//////JOIN ROUTES////////

router.get('/join', (req, res) => res.render('join'));

router.post('/join', asyncHandler(async (req, res) => {
  if (req.body.passcode === process.env.SECRET_PASSCODE) {
    req.user.membershipStatus = true;
    await req.user.save();
    res.redirect('/');
  } else {
    res.status(400).json({ errors: [{ msg: 'Incorrect passcode' }] });
  }
}));

module.exports = router;