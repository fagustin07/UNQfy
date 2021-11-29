const axios = require('axios');

const sendNotify = (report) => {
    return axios.post(
        process.env.DISCORD_WEBHOOK,
        { content: report }
    );
}

module.exports = {
    sendNotify
};