const axios = require('axios');

const BASE_URL = process.env.LOGGING_API_HOST;

const sendLog = (action, data) => {
    return axios.post(BASE_URL + '/api/log', {
        message: action,
        level: 'info',
        object: data
    });
}

module.exports = {
    sendLog,
}
