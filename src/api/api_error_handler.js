const { UNQfyAPIError } = require("../errors/abstract_errors");

function api_error_handler(err, _, res, __) {
    switch(true) {
        case (err instanceof UNQfyAPIError):
            res.status(err.status);
            res.json({ status: err.status, errorCode: err.errorCode });
            break;
        case (err.type === 'entity.parse.failed'):
            res.status(400)
            res.json({ status: 400, errorCode: 'BAD_REQUEST' });
            break;
        default:
            console.log(err.message);
            res.status(500)
            res.json({ status: 500, errorCode: 'INTERNAL_SERVER_ERROR' });    
            break;
    }
}

module.exports = api_error_handler;
