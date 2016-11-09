const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newUser = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    unique: true
  }
});

var User = mongoose.model('User', newUser);

module.exports = User;
