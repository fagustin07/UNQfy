const { LogginError } = require('./errors');

function error_handler(err, _, res, __) {
    if (err instanceof LogginError) {
        res.status(err.status)
            .json({ status: err.status, errorCode: err.errorCode, message: err.message });
    }
}

module.exports = error_handler;