const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const Message = require('../models/message');
const User = require("../models/user");
const user = require('../models/user');

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  const messages = await Message.find().populate('author').exec();
  
  res.render('index', { 
    title: 'Members Only', 
    messages: messages,
    user: req.user,
  });
}));

module.exports = router;

