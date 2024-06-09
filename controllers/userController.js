const User = require('../models/user');
const { body, validationResult } = require('express-validator');

const SECRET_PASSCODE = process.env.SECRET_PASSCODE ;

exports.join_get = (req, res) => {
  res.render('join', { title: 'Join the Club' });
};

exports.join_post = [
  body('passcode').trim().equals(SECRET_PASSCODE).withMessage('Incorrect passcode'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('join', { title: 'Join the Club', errors: errors.array() });
    }
    try {
      req.user.isMember = true;
      await req.user.save();
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  }
];
