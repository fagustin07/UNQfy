const winston = require('winston');

const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: winston.format.json(),
    defaultMeta: { service: 'loggin-service' },
    transports: [
        new winston.transports.File({ filename: 'logs/logs.log' }),
    ],
});

const localLog = (level, message) => {
    logger.log({ level, message });
};

module.exports = localLog;