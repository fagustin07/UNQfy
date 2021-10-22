const { UNQfyError } = require('../errors/basics');

function error_handler(err, _, res, __) {
    if (err instanceof UNQfyError) {
        res.status(err.status)
            .json({ status: err.status, errorCode: err.errorCode });
    } else if (err.type === 'entity.parse.failed') {
        res.status(400)
        res.json({ status: 400, errorCode: 'BAD_REQUEST' });
    } else {
        res.status(500)
        res.json({ status: 500, errorCode: 'INTERNAL_SERVER_ERROR' });
    }
}

module.exports = error_handler;