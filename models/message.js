const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const MessageSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

MessageSchema.virtual('formattedTimestamp').get(function() {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_MED);
});
module.exports = mongoose.model('Message', MessageSchema);
