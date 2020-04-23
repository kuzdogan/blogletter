const Blog = require('../models/Blog');

/**
 * Checks if the blog at the blogAddress is already registered.
 * 
 * @param {String} blogAddress 
 * @returns {Promise} that resolves to the Blog if exist or to false if does not exist.
 */
exports.findBlog = (blogAddress) => {
  return Blog.findOne({ blogAddress: blogAddress })
}

/**
 * Function to create a new Blog with an address and blog posts.
 * 
 * @param {String} blogAdress - URL of the blog
 * @param {Array<Object>} blogPosts - Array of blogposts.
 * @returns {Promise} resvoling to a Blog object.
 */
exports.createBlogWithBlogPosts = (blogAddress, blogPosts) => {
  let blog = new Blog({
    blogAddress: blogAddress,
    blogPosts: blogPosts.map(blogPost => blogPost._id)
  });
  return blog.save();
}
