class LoggingErrorApi extends Error {
    constructor(status, errorCode, message) {
        super();
        this.status = status;
        this.errorCode = errorCode;
        this.message = message;
    }
}

class BadRequest extends LoggingErrorApi { 
    constructor() {
        super(400, 'BAD_REQUEST');
    }
}

class ResourceNotFound extends LoggingErrorApi {
    constructor() {
        super(404, 'RESOURCE_NOT_FOUND');
    }
}

class LoggingDesactivated extends LoggingErrorApi {
    constructor() {
        super(400, 'BAD_REQUEST', 'Logging service is off');
    }
}

class EmptyMessage extends Error {
    constructor() {
        super('Message cannot be empty');
    }
}

class InvalidLevel extends Error {
    constructor() {
        super('Invalid Level');
    }
}

module.exports = {
    LoggingErrorApi,
    BadRequest,
    LoggingDesactivated,
    EmptyMessage,
    InvalidLevel,
    ResourceNotFound
};