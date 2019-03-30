const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: false,
    trim: true
  },
  email: {
    type: String,
    unique: false,
    trim: true
  },
  post: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
