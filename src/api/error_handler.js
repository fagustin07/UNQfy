const { ResourceAlreadyExists, BadRequest, ResourceNotFound, RelatedResourceNotFound } = require('../errors/basics');

function error_handler(err, req, res, next){
    console.log(err);
    switch (err){
        case err instanceof ResourceAlreadyExists:
            res.status(409);
            res.json({status: 409,  errorCode: "RESOURCE_ALREADY_EXISTS"});
            break;
        case err instanceof BadRequest:
            res.status(400);
            res.json({status: 400,  errorCode: "BAD_REQUEST"});
        case err instanceof ResourceNotFound:
            res.status(404);
            res.json({status: 404,  errorCode: "RESOURCE_NOT_FOUND"});
        case err instanceof RelatedResourceNotFound:
            res.status(404);
            res.json({status: 404,  errorCode: "RELATED_RESOURCE_NOT_FOUND"});
        case err.type === 'entity.parse.failed':
            res.status(400);
            res.json({status: 400,  errorCode: 'INVALID_JSON'});
        case err instanceof Error:
            res.status(500);
            res.json({status: 500,  errorCode: 'INTERNAL_SERVER_ERROR'});
        default:
            next(err);
    }
}
 
module.exports = error_handler;