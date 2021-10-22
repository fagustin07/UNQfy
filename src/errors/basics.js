
class UNQfyError extends Error {    
    constructor(msg, statusCode, errorCode) {
        super(msg);
        this.status = statusCode;
        this.errorCode = errorCode
    }
}

class BadRequest extends UNQfyError {
    constructor() {
        super('Bad request', 400, "BAD_REQUEST");
    }
}

class ResourceAlreadyExists extends UNQfyError {
    constructor(resourceEntity){
        super(`${resourceEntity} already exists`, 409, "RESOURCE_ALREADY_EXISTS");
    }
}

class ResourceNotFound extends UNQfyError {
    constructor(resourceEntity) {
        super(`${resourceEntity} not found`, 404, "RESOURCE_NOT_FOUND");
    }
}


class RelatedResourceNotFound extends UNQfyError {
    constructor(resourceEntity) {
        super(`Related ${resourceEntity} not found`, 404, "RELATED_RESOURCE_NOT_FOUND");
    }
}

module.exports = {
    UNQfyError,
    BadRequest,
    ResourceAlreadyExists,
    ResourceNotFound,
    RelatedResourceNotFound,
}