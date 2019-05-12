// logger should be imported before importing any other file
const logger = require('./config/logger.js');
const mongoose = require('./config/mongodb.js');
const config = require('./config/config');
const app = require('./config/express');

// open mongoose connection
mongoose.connect();
// listen to requests
app.listen(config.port, () => {
  logger.info(`server started on port ${config.port} (${config.env})`);
});

module.exports = app;
