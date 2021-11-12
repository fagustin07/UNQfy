const { NewsletterErrorApi, EmailAlreadyRegistered } = require('../model/errors');

function api_error_handler(err, _, res, __) {
    switch (true) {
        case (err instanceof NewsletterErrorApi):
            res.status(err.status);
            res.json({ status: err.status, errorCode: err.errorCode });
            break;
        case (err instanceof EmailAlreadyRegistered):
            res.status(400);
            res.json({ status: 400, errorCode: 'BAD_REQUEST', message: err.message });
            break;
        case (err.type === 'entity.parse.failed'):
            res.status(400);
            res.json({ status: 400, errorCode: 'BAD_REQUEST' });
            break;
        default: {
            res.status(500);
            res.json({ status: 500, errorCode: 'INTERNAL_SERVER_ERROR' });
            break;
        }
    }
}

module.exports = api_error_handler;