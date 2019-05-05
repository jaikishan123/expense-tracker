const { createLogger, format, transports } = require('winston');
const config = require('./config.js');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss:SSS'
    }),
    format.errors({ stack: true }),
    format.splat(),
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
//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (config.env !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  );
}
module.export = logger;
