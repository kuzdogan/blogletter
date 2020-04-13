const Subscription = require('../models/Subscription');
const emailValidator = require("email-validator");
const { fetchBlogPosts, formatBlogPosts, saveBlogPosts } = require('../services/blogPost');
const { checkBlogExists, createBlogWithBlogPosts } = require('../services/blogPost');
const { createNewSubscription, checkSubscriptionExists } = require('../services/subscription');

/**
 * @function addNewSubscription
 * Receives a subscriptionRequest = {
 *   email: <String>.required,
 *   name: <String>,
 *   link: <String>.required
 * }.
 * 
 * Makes the checks. If all pass adds subscription and returns success. If fail, returns the errors.
 */
exports.addNewSubscription = async (req, res, next) => {
  // TODO: Check if valid mail.
  let email = req.body.email;
  let name = req.body.name;
  // TODO: Put address into a standard format.
  let blogAddress = req.body.blogAddress;
  console.log(email);
  console.log(blogAddress);
  if (!emailValidator.validate(email)) {
    console.error('Invalid email ' + email);
    res.status(400).json({ message: 'Invalid email ' });
  }
  // TODO: Check if valid blog. i.e. blogger or other supported.

  checkSubscriptionExists(email, blogAddress)
    .then(doesSubsExist => {
      if (doesSubsExist) {
        res.status(400).json({ message: 'Already subscribed ' });
        throw new Error(`User ${email} already subscribed`);
      }
      else
        return checkBlogExists(blogAddress)
    })
    .then((blog) => {
      // Don't fetch all posts again if blog is already in db.
      if (blog) {
        console.log('Blog exists. No need to fetch blog posts');
        return Promise.resolve(blog);
      } else { // Fetch the blog posts and create a new Blog with posts.
        return fetchBlogPosts(blogAddress)
          .then(formatBlogPosts)
          .then(saveBlogPosts)
          .then((blogPosts) => createBlogWithBlogPosts(blogAddress, blogPosts))
      }
    })
    .then((blog) => createNewSubscription(name, email, blog))
    .then(console.log)
    .then(() => {
      res.status(200).send('New subscription added!');
    })
    .catch(err => {
      next(err); // Forward errors to express to handle.
    })
  // TODO: Create subscription.
  // TODO: Return success.
};
