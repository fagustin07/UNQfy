const localLog = require('./local_loggin');
const saveInLoggly = require('./loggy_service');

let _isActive = false;

const activate = () => {
    _isActive = true;
};

const desactivate = () => {
    _isActive = false;
};

const log = (message, level) => {
    if(_isActive) {
        console.log(message);
        localLog(level, message);
        saveInLoggly(level, message);
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

