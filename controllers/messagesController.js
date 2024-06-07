const Message = require('../models/message');

// Display new message form
exports.new_message_get = (req, res) => {
  res.render('new-message', { title: 'Create New Message' });
};

// Handle new message form submission
exports.new_message_post = async (req, res, next) => {
  try {
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      author: req.user._id, // Set the author to the logged-in user
    });
    await message.save();
    res.redirect('/'); // Redirect to homepage after saving the message
  } catch (err) {
    next(err);
  }
};