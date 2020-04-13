const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoConnect = require('./utils/mongo');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const config = require('./config');
const { sendNextEmailToSubscription } = require('./services/emailer');
// Express
const app = express();
const port = process.env.PORT || 3000;

// MongoDB
const dbConfig = config.databaseConfig;
const dbURL = 'mongodb://' + config.dbURL;
console.log(dbURL)
console.log(dbConfig)
mongoConnect(dbURL, dbConfig);


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
  console.log('Express Listening at http://localhost:' + port);
});

// sendNextEmailToSubscription('5e94c988087117033399f9d8')
module.exports = app;