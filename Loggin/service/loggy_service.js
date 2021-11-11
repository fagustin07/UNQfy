const winston = require('winston');
const { Loggly } = require('winston-loggly-bulk');

const TOKEN = '';
const SUBDOMAIN = 'nicom051099';

winston.add(new Loggly({
    token: TOKEN,
    subdomain: SUBDOMAIN,
    tags: ["UNQFY-LOGS"],
    json: true
}));


const saveInLoggly = (level, message) => {
    winston.log(level, message);
};

module.exports = saveInLoggly;