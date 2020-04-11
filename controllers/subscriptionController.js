const BlogPost = require('../models/BlogPost');
const emailValidator = require("email-validator");
const axios = require('axios');

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
  let blogAddress = req.body.blogAddress;
  console.log(email);
  console.log(blogAddress);
  if (!emailValidator.validate(email)) {
    console.error('Invalid email ' + email);
    res.status(400).json({ message: 'Invalid email ' });
  }
  // TODO: Check if valid blog. i.e. blogger or other supported.
  // TODO: Check if the mail already subscribed to the blog.
  // TODO: Check if the blog is already in the db.
  // TODO: Fetch blog posts and store them in db.
  fetchBlogPosts(blogAddress)
    .then(formatBlogPosts)
    .then(saveBlogPosts)
    .then(console.log)
  // TODO: Create subscription.
  // TODO: Return success.

  res.status(200).send('New subscription added!');
};

/**
 * Fetches all the posts of a blog.
 * Takes the address, adds the appropoate subroutes and query params.
 * Fetches 500 posts max. Checks if there are more. Google Data API accepts at most 500.
 * Returns a Promise that resolves to all the blog posts.
 * @param {String} blogAddress 
 * @returns {Promise} A promise resolving to the array of raw post objects. 
 */
const fetchBlogPosts = (blogAddress) => {
  const maxResults = 1; // Google Data API accepts at most 500.
  const subRoute = '/feeds/posts/default/';
  const query = '?alt=json&max-results=' + maxResults;
  const URL = blogAddress + subRoute + query;
  console.log(`The URL is ${URL}`);
  return axios.get(URL)
    .then(result => {
      return new Promise(resolve => resolve(result.data.feed.entry));
    })
}

/**
 * Function to format blog posts into Mongoose BlogPost Schema format.
 * @param {Array<Object>} unformatted array of posts.
 * @returns {Array<Object>} formatted array of posts.
 */
const formatBlogPosts = (posts) => {
  let formattedPosts = posts.map(post => {
    return {
      title: post.title['$t'],
      author: post.author[0].name['$t'],
      datePublished: new Date(post.published['$t']),
      dateUpdated: new Date(post.updated['$t']),
      url: post.link.find(obj => {
        return obj.rel === 'alternate' && obj.type === 'text/html'
      }).href, // link is an array of link in different formats. Find the html link and return the href.
      // content: {
      //   type: post.content.type,
      //   body: post.content['$t']
      // }
    }
  });
  return formattedPosts;
}

/**
 * Takes an array of posts. Saves all of them asynchronously. Resolves once all of them are saved.
 * 
 * @param {Array<Object>} formatted posts to be saved.
 * @returns {Promise} that resolves when all posts are saved.
 */
const saveBlogPosts = (posts) => {
  let promises = [];
  posts.forEach(post => {
    let postToSave = new BlogPost(post);
    promises.push(postToSave.save());
  });

  return Promise.all(promises);
}