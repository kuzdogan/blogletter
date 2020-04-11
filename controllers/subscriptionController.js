const BlogPost = require('../models/BlogPost');
const Blog = require('../models/Blog');
const Subscription = require('../models/Subscription');
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

/**
 * Fetches all the posts of a blog.
 * Takes the address, adds the appropoate subroutes and query params.
 * Fetches 500 posts max. Checks if there are more. Google Data API accepts at most 500.
 * Returns a Promise that resolves to all the blog posts.
 * @param {String} blogAddress 
 * @returns {Promise} A promise resolving to the array of raw post objects. 
 */
const fetchBlogPosts = (blogAddress) => {
  const maxResults = 2; // Google Data API accepts at most 500.
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

/**
 * Checks if the blog at the blogAddress is already registered.
 * 
 * @param {String} blogAddress 
 * @returns {Promise} that resolves to the Blog if exist or to false if does not exist.
 */
const checkBlogExists = (blogAddress) => {
  return Blog.findOne({ blogAddress: blogAddress })
}

/**
 * Function to create a new Blog with an address and blog posts.
 * 
 * @param {String} blogAdress - URL of the blog
 * @param {Array<Object>} blogPosts - Array of blogposts.
 * @returns {Promise} resvoling to a Blog object.
 */
const createBlogWithBlogPosts = (blogAddress, blogPosts) => {
  let blog = new Blog({
    blogAddress: blogAddress,
    blogPosts: blogPosts.map(blogPost => blogPost._id)
  });
  return blog.save();
}

/**
 * Function to create a new Subscription in the database.
 * 
 * @param {String} name 
 * @param {String} email 
 * @param {Object} blog - Blog object to be subscribed to
 */
const createNewSubscription = (name, email, blog) => {
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

const checkSubscriptionExists = (email, blogAddress) => {
  // If blog does not exists, the subscription also doesn't exist.
  return checkBlogExists(blogAddress).then(blog => {
    if (!blog)
      return false;
    return Subscription.exists({ email, blog: blog._id });
  })
}