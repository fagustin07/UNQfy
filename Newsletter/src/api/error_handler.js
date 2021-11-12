const { NewsletterErrorApi } = require('../model/errors');

function error_handler(err, _, res, __) {
    if (err instanceof NewsletterErrorApi) {
        res.status(err.status);
        res.json({ status: err.status, errorCode: err.errorCode, message: err.message });
    }
}

module.exports = error_handler;