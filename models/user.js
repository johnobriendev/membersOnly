const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 50, minLength: 3 },
  last_name: { type: String, required: true, maxLength: 50, minLength: 3 },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isMember: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false }
});

UserSchema.virtual('fullname').get(function () {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model('User', UserSchema);
