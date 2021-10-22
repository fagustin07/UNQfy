const { UNQfyError } = require('../errors/basics');

function error_handler(err, _, res, next) {
    console.log(err);
    if (err instanceof UNQfyError) {
        res.status(err.status)
            .json({ message: err.message, status: err.status, errorCode: err.errorCode });
    } else {
        next(err);
    }
}

module.exports = error_handler;