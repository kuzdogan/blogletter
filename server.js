const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();
const port = process.env.PORT || 3000;

// CORS Policy
const whitelist = ['http://127.0.0.1:3001', 'http://localhost:3001', 'http://127.0.0.1', 'http://localhost'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) { // Allow if in whitelist or not browser e.g. Postman.
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS policy
app.all('*', cors(corsOptions), function (req, res, next) {
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/api', subscriptionRoutes);

app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  // truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

  console.log('Express Listening at http://localhost:' + port);

});

module.exports = app; // For testing
