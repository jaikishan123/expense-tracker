const mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = global.Promise;

// connect to mongodb
const mongoUri = config.mongo.host;
const db = mongoose.connect;
db.on('error', () => {
  throw new Error('cannot connect to mongodb');
});

mongoose.connect(mongoUri, { keepAlive: true });

module.exports = db;
