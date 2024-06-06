const express = require('express');
const asyncHandler = require('express-async-handler');
const { ensureAuthenticated } = require('../middleware/auth');
const Message = require('../models/message');

const router = express.Router();

router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('new-message');
});

router.post('/new', ensureAuthenticated, asyncHandler(async (req, res) => {
  const message = new Message({
    title: req.body.title,
    text: req.body.text,
    author: req.user._id
  });
  await message.save();
  res.redirect('/');
}));

router.post('/delete/:id', ensureAuthenticated, asyncHandler(async (req, res) => {
  if (req.user.isAdmin) {
    await Message.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } else {
    res.status(403).json({ errors: [{ msg: 'Unauthorized' }] });
  }
}));

module.exports = router;

