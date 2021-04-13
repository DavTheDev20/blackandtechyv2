const mongoose = require('mongoose');

// Defines the schema of a post.
const postSchema = new mongoose.Schema({
  author: String,
  title: String,
  postContent: String,
  link: String,
  dateCreated: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
