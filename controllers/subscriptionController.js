const BlogPost = require('../models/BlogPost');
const emailValidator = require("email-validator");

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
exports.addNewSubscription = async (req, res) => {
  // TODO: Check if valid mail.
  let email = req.body.email;
  console.log(email);
  if (!emailValidator.validate(email)) {
    console.error('Invalid email ' + email);
    res.status(400).json({ message: 'Invalid email ' });
  }
  // TODO: Check if valid blog. i.e. blogger or other supported.
  // TODO: Check if the mail already subscribed to the blog.

  // TODO: Check if the blog is already in the db.
  // TODO: Fetch blog posts and store them in db. 
  // TODO: Create subscription.
  // TODO: Return success.

  res.status(200).send('New subscription added!');
};