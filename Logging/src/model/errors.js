class LoggingError extends Error {
    constructor(status, errorCode, message = errorCode) {
        super();
        this.status = status;
        this.errorCode = errorCode;
        this.message = message;
    }
}

class BadRequest extends LoggingError { 
    constructor() {
        super(400, 'BAD_REQUEST');
    }
}

class LoggingDesactivated extends LoggingError {
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
    LoggingError,
    BadRequest,
    LoggingDesactivated,
    EmptyMessage,
    InvalidLevel
};