const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new mongoose.Schema({
  title: String,
  author: String,
  datePosted: Date,
  content: String
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
