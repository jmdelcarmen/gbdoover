const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Guestpost = new Schema({
  username: {
    type: String,
    required: true
  },
  post: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {type: Date, default: Date.now}
});

const Post = mongoose.model('Post', Guestpost);


module.exports = Post;
