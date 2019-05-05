const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss:SSS'
    }),
    format.json()
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ],
  exceptionHandlers: [
    // - Write to all unCaughtExceptions to `unCaughtExceptions.log`
    new transports.File({ filename: 'unCaughtExceptions.log' })
  ],
  // If false, handled exceptions will not cause process.exit
  exitOnError: true
});

module.export = logger;
