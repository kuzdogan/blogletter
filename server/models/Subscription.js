const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionScema = new mongoose.Schema({
  name: String,
  email: String,
  blog: { type: Schema.Types.ObjectId, ref: 'Blog' },
  blogPostsToSend: [{ type: Schema.Types.ObjectId, ref: 'BlogPost' }],
  blogPostsSent: [{ type: Schema.Types.ObjectId, ref: 'BlogPost' }]
});

module.exports = mongoose.model('Subscription', SubscriptionScema);
