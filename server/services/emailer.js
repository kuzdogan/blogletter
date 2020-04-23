const nodemailer = require('nodemailer');
const { findNextBlogPostToSend, handleBlogPostSent } = require('./blogPost');
const { findSubscriptionWithId } = require('./subscription');

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c2115f200a2e14",
    pass: "0bece99b8ad00e"
  }
});

exports.sendEmail = (from, to, subject, html) => {
  const message = {
    from: from, // Sender address
    to: to,         // List of recipients
    subject: subject, // Subject line
    html: html // Plain text body
  };

  return transport.sendMail(message);
}

/**
 * The main function that is scheduled and runs regularly.
 * Finds and sends the next blogPost to the user.
 * Moves the blogPost to Subscription.blogPostsSent
 * 
 * @param {String} - subscriptionId
 * 
 */
exports.sendNextEmailToSubscription = (subscriptionId) => {
  let receiverEmail;
  let receiverName;
  return findSubscriptionWithId(subscriptionId)
    .then(subscription => {
      this.subscription = subscription;
      receiverEmail = subscription.email;
      receiverName = subscription.name;
      return findNextBlogPostToSend(subscription)
    })
    .then(nextBlogPost => {
      // If no more blog posts left to send
      if (!nextBlogPost) {
        // TODO: Remove scheduler
        throw new Error('No more posts to send');
      }
      let contentBody = nextBlogPost.content.body;
      let title = nextBlogPost.title;
      return this.sendEmail('blogletter@test.org', receiverEmail, title, contentBody)
    })
    .then(() => { console.log('Handling post sent'); handleBlogPostSent(this.subscription) })
    .catch(console.error)
}
