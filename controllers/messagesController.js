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

// Display all messages
exports.message_list = async (req, res, next) => {
  try {
    const messages = await Message.find().populate('author').exec();
    res.render('index', { title: 'All Messages', messages });
  } catch (err) {
    return next(err);
  }
};

// Handle message deletion
exports.message_delete_post = async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params.id).exec();
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};