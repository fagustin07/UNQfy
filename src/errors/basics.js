
class UNQfyError extends Error {    
    constructor(msg) {
        super(msg);
    }
}

class BadRequest extends UNQfyError {
    constructor() {
        super('Bad request!');
    }
}

class ResourceAlreadyExists extends UNQfyError {
    constructor(resourceEntity){
        super(`${resourceEntity} already exists`);
    }
}

class ResourceNotFound extends UNQfyError {
    constructor(resourceEntity) {
        super(`${resourceEntity} not found`);
    }
}


class RelatedResourceNotFound extends UNQfyError {
    constructor(resourceEntity) {
        super(`Related ${resourceEntity} not found`);
    }
}

module.exports = {
    BadRequest,
    ResourceAlreadyExists,
    ResourceNotFound,
    RelatedResourceNotFound,
}