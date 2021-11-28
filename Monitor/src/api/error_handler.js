const { ResourceNotFound } = require("../model/errors");

function error_handler(err, _, res, __) {
    if (err instanceof ResourceNotFound) {
        res.status(err.status);
        res.json({ status: err.status, errorCode: err.errorCode });
    } else if (err.type === 'entity.parse.failed') {
        res.status(400);
        res.json({ status: 400, errorCode: 'BAD_REQUEST' });
    } else {
        console.log(err.message);
        res.status(500)
        res.json({ status: 500, errorCode: 'INTERNAL_SERVER_ERROR' });    
    }
}

module.exports = error_handler;