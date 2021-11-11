const winston = require('winston');
const { Loggly } = require('winston-loggly-bulk');
require('dotenv').config();

winston.add(new Loggly({
    token: process.env.APIKEY,
    subdomain: process.env.SUBDOMAIN,
    tags: ["Winston-NodeJS"],
    auth: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    },
    json: true,
    levels: winston.config.syslog.levels
}));


const saveInLoggly = (level, message) => {
    switch (level) {
        case 'warning':
            winston.warn(message);
            break;
        case 'debug':
            winston.debug(message);
            break;
        default:
            winston.log(level, message);
            break;
    }
};

module.exports = saveInLoggly;