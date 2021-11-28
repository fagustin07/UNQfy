const { RelatedEntityNotFound, EntityNotFound, EntityAlreadyExists } = require('../errors/model_errors');
const { ResourceNotFound, ResourceAlreadyExists, RelatedResourceNotFound } = require('../errors/api_errors.js');

function model_error_handler(err, req, res, next) {
    switch(true) {
        case (err instanceof EntityAlreadyExists):
            next(new ResourceAlreadyExists(), req, res, next);
            break;
        case (err instanceof EntityNotFound):
            next(new ResourceNotFound(), req, res, next);
            break;
        case (err instanceof RelatedEntityNotFound):
            next(new RelatedResourceNotFound(), req, res, next);
            break;        
        default:
            next(err, req, res, next);
            break;
    }
}

module.exports = model_error_handler;