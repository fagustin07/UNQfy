const { UNQfyError } = require('../errors/basics');

function error_handler(err, _, res, next) {
    if (err instanceof UNQfyError) {
        res.status(err.status)
            .json({ message: err.message, status: err.status, errorCode: err.errorCode });
    } else if (err instanceof Error) {
        res.status(500)
            .json({ message: err.message, status: 500, errorCode: "INTERNAL_SERVER_ERROR" });
    } else {
        next(err);
    }
}

module.exports = error_handler;