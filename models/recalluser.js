const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecallUserSchema = new Schema({
  firstname: { type: String},
  lastname: { type: String},
  email: { type: String},
  phone: { type: Number },
  zipcode: { type: Number },
  address: { type: String },
  state: { type: String },
  profile_id:{type:String}
});

const RecallUser = mongoose.model('recalluser', RecallUserSchema);
// 'users' is Mongo collection's name

module.exports = RecallUser;
