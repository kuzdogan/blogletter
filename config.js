exports.databaseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.MONGODB_NAME,
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASSWORD
};

// Default to localhost.
exports.dbURL = process.env.MONGODB_URL || 'localhost:27017';
