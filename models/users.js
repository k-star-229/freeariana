const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  sex: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('users', UserSchema);
// 'users' is Mongo collection's name

module.exports = User;
