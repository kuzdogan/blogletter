exports.databaseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.MONGODB_NAME,
  // user: process.env.MONGODB_USER,
  // pass: process.env.MONGODB_PASSWORD,
  connectTimeoutMS: 3000
};

// Default to localhost. Use mongo name in Docker instead of localhost.
exports.dbURL = process.env.MONGODB_URL || 'mongo:27017/';
