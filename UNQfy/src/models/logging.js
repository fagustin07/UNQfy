const axios = require('axios');
const Observer = require('./observer');

class Logging extends Observer {
    constructor() {
        super(process.env.LOGGING_API_HOST);
    }

    update(action, data) {
        axios.post(this._baseURL + '/api/log', {
            message: action,
            level: 'info',
            object: data
        })
        .then(_ => {
            console.log(`[LOGGING] ${action}: ${JSON.stringify(data)}.`)
        })
        .catch(err => {
            console.log(`Could not connect with Logging Service: ${err.message}`);
        })
    }
}

module.exports = Logging;
