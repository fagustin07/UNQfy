const { UNQfyAPIError } = require("./abstract_errors");

class BadRequest extends UNQfyAPIError { 
    constructor() {
        super(400, 'BAD_REQUEST');
    }
}

class ResourceAlreadyExists extends UNQfyAPIError { 
    constructor() {
        super(409, 'RESOURCE_ALREADY_EXISTS');
    }
}

class ResourceNotFound extends UNQfyAPIError { 
    constructor() {
        super(404, 'RESOURCE_NOT_FOUND');
    }
}

class RelatedResourceNotFound extends UNQfyAPIError { 
    constructor() {
        super(404, 'RELATED_RESOURCE_NOT_FOUND');
    }
}

module.exports = {
    BadRequest,
    ResourceAlreadyExists,
    ResourceNotFound,
    RelatedResourceNotFound,
}