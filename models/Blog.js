const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new mongoose.Schema({
  link: String,
  blogPosts: [{ type: Schema.Types.ObjectId, ref: 'BlogPost' }]
});

module.exports = mongoose.model('Blog', BlogSchema);
