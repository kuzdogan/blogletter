const BlogPost = require('../models/BlogPost');
const axios = require('axios');
const { findSubscriptionWithId } = require('./subscription');

/**
 * Fetches all the posts of a blog.
 * Takes the address, adds the appropoate subroutes and query params.
 * Fetches 500 posts max. Checks if there are more. Google Data API accepts at most 500.
 * Returns a Promise that resolves to all the blog posts.
 * @param {String} blogAddress 
 * @returns {Promise} A promise resolving to the array of raw post objects. 
 */
exports.fetchBlogPosts = (blogAddress) => {
  const maxResults = 50; // Google Data API accepts at most 500.
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
exports.formatBlogPosts = (posts) => {
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
exports.saveBlogPosts = (posts) => {
  let promises = [];
  posts.forEach(post => {
    let postToSave = new BlogPost(post);
    promises.push(postToSave.save());
  });

  return Promise.all(promises);
}

/**
 * Function to find the next blog post to be sent to a subscription.
 * 
 * @param {subscriptionId} MongoDB _id of the subscription.
 * @return {Promise} that resolves to the BlogPost to be sent.
 */
exports.findNextBlogPostToSend = (subscriptionId) => {
  return findSubscriptionWithId(subscriptionId)
    .then((subscription) => {
      let nextBlogPostId = subscription.blogPostsToSend[0];
      console.log(`nextBlogPostId is: ${nextBlogPostId}`);
      return BlogPost.findById(nextBlogPostId)
    })
    .then(nextBlogPost => {
      console.log(nextBlogPost);
    })
}