const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new mongoose.Schema({
  title: String,
  author: String,
  datePublished: Date,
  dateUpdated: Date,
  url: String,
  content: {
    format: String, // Don't use key 'type'
    body: String
  }
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
