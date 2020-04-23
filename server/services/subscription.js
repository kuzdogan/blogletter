const { findBlog } = require('./blog');
const Subscription = require('../models/Subscription');

/**
 * Function to create a new Subscription in the database.
 * 
 * @param {String} name 
 * @param {String} email 
 * @param {Object} blog - Blog object to be subscribed to
 */
exports.createNewSubscription = (name, email, blog) => {
  console.log('Creating new subscription');
  let subscription = new Subscription({
    name,
    email,
    blog: blog._id,
    blogPostsSent: [],
    blogPostsToSend: blog.blogPosts // Same _id array.
  })
  return subscription.save();
}

exports.checkSubscriptionExists = (email, blogAddress) => {
  // If blog does not exists, the subscription also doesn't exist.
  return findBlog(blogAddress).then(blog => {
    if (!blog)
      return false;
    return Subscription.exists({ email, blog: blog._id });
  })
}

exports.findSubscriptionWithId = (_id) => {
  console.log(`Looking for the subscription with id: ${_id}`)
  return Subscription.findById(_id);
}