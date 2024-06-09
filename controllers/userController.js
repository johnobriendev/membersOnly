
const { body, validationResult } = require('express-validator');

const SECRET_PASSCODE = process.env.SECRET_PASSCODE ;
const ADMIN_PASS = process.env.ADMIN_PASS;

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


exports.admin_get = (req, res) => {
  res.render('admin', { title: 'Become an Admin'});
}

exports.admin_post = [
  body('admin_passcode').trim().equals(ADMIN_PASS).withMessage('Incorrect admin passcode'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('admin-form', { title: 'Become an Admin', errors: errors.array() });
    }
    try {
      req.user.isAdmin = true;
      await req.user.save();
      res.redirect('/');
    } catch (err) {
      next(err);
    }
  }
];