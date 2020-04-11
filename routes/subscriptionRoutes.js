const { Router } = require('express');
const subscriptionController = require('../controllers/subscriptionController');

const routes = Router({ mergeParams: true }); // Merge to access parent params i.e. :addr

routes.post('/subscriptions', subscriptionController.addNewSubscription);

module.exports = routes;