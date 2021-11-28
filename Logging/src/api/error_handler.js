const { LoggingErrorApi, EmptyMessage, InvalidLevel } = require('../model/errors');

function error_handler(err, _, res, __) {
    if (err instanceof LoggingErrorApi) {
        res.status(err.status);
        res.json({ status: err.status, errorCode: err.errorCode, message: err.message });
    } else if(err instanceof EmptyMessage || err instanceof InvalidLevel) {
        res.status(400);
        res.json({ status: 400, errorCode: 'BAD_REQUEST', message: err.message });
    } else {
        res.status(500);
        res.json({ status: 500, errorCode: 'INTERNAL_SERVER_ERROR' });
    }
}

module.exports = error_handler;