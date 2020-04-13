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

exports.sendEmail = (from, to, subject, text) => {
  const message = {
    from: from, // Sender address
    to: to,         // List of recipients
    subject: subject, // Subject line
    text: text // Plain text body
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
      let contentBody = nextBlogPost.content.body;
      let title = nextBlogPost.title;
      return this.sendEmail('blogletter@test.org', receiverEmail, title, contentBody)
    })
    .then(() => handleBlogPostSent(this.subscription))
    .catch(console.error)
}
