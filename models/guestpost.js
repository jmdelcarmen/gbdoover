const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Guestpost = new Schema({
  username: {
    type: String
  },
  post: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  date: {type: Date, default: Date.now}
});

const Post = mongoose.model('Post', Guestpost);


module.exports = Post;
