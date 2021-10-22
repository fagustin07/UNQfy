const { UNQfyError } = require('../errors/basics');

function error_handler(err, _, res, __) {
    if (err instanceof UNQfyError) {
        res.status(err.status)
            .json({ message: err.message, status: err.status, errorCode: err.errorCode });
    } else if (err.type === 'entity.parse.failed') {
        res.status(404)
        res.json({ message: 'Entity parse failed', status: 404, errorCode: 'INVALID_JSON' });
    } else {
        res.status(500)
        res.json({ message: err.message, status: 500, errorCode: 'INTERNAL_SERVER_ERROR' });
    }
}

module.exports = error_handler;