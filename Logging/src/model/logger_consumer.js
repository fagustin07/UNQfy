require('dotenv').config();
const winston = require('winston');
const { Loggly } = require('winston-loggly-bulk');
const format = winston.format;

const messageFormat = format.printf(({ level, message, timestamp, object }) => `${timestamp} - [${level}]: ${message} - ${JSON.stringify(object)}`);
const timestampFormat = format.timestamp({ format: 'DD-MM-YYYY hh:mm:ss' });

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize(), timestampFormat, format.align(), messageFormat)
    }),
    new winston.transports.File({
      filename: 'logs/unqfy.log',
      format: format.combine(timestampFormat, format.align(), messageFormat)
    }),
    new Loggly({
      token: process.env.loggly_token,
      subdomain: process.env.loggly_subdomain,
      tags: ["UNQfy - FeNixCrew"],
      json: true
    })
  ]
});

logger.silent = false;

module.exports = logger;