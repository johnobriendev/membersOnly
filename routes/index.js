const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const Message = require('../models/message');

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  const messages = await Message.find().populate('author');
  res.render('index', { title: 'Members Only', messages });
}));

module.exports = router;

