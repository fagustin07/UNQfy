const localLog = require('./local_loggin');
const saveInLoggly = require('./loggly_consumer');

let _isActive = false;

const activate = () => {
    _isActive = true;
};

const desactivate = () => {
    _isActive = false;
};

const log = (message, level) => {
    if(_isActive) {
        console.log(`---- [${level.toUpperCase()}] ${message} ----`);
        localLog(level.toLowerCase(), message);
        saveInLoggly(level.toLowerCase(), message);
    }
};

const isActive = () => _isActive;

module.exports = {
    logginService: {
        activate,
        desactivate,
        log,
        isActive
    }
};

