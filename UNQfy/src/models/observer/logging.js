const Observer = require('./observer');
const loggingClient = require('../../helpers/clients/loggingClient');

class Logging extends Observer {
    update(action, data) {
        loggingClient.sendLog(action, data)
        .catch(err => {
            console.log(`Could not connect with Logging Service: ${err.message}`);
        })
    }
}

module.exports = Logging;
