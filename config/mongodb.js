const mongoose = require('mongoose');
const debug = require('debug')('expense-tracker:mongoose');
const util = require('util');
const config = require('./config');

mongoose.Promise = global.Promise;

// connect to mongodb
const mongoUri = config.mongo.host;
const db = mongoose.connect;
db.on('error', () => {
  throw new Error('Error occured in mongodb connection');
});

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 15), doc);
  });
}

module.exports.connect = () => {
  mongoose.connect(mongoUri, { keepAlive: true });
  return mongoose.connect;
};
