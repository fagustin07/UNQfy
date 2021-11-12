const { EmailAlreadyRegistered, BadRequest } = require("../model/errors");

function model_error_handler(err, req, res, next) {
    if (err instanceof EmailAlreadyRegistered) {
        next(new BadRequest(), req, res, next);
    } else next(err, req, res, next);
}


module.exports = model_error_handler;