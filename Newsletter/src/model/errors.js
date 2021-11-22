class NewsletterErrorApi extends Error {
    constructor(status, errorCode, message = errorCode) {
        super();
        this.status = status;
        this.errorCode = errorCode;
        this.message = message;
    }
}

class BadRequest extends NewsletterErrorApi {
    constructor() {
        super(400, 'BAD_REQUEST');
    }
}

class ResourceAlreadyExists extends NewsletterErrorApi {
    constructor() {
        super(409, 'RESOURCE_ALREADY_EXISTS');
    }
}

class EmailAlreadyRegistered extends Error {
    constructor() {
        super('Email already registered');
    }
}

class NotifyError extends Error {
    constructor() {
        super('An error occurred when sending notifications')
    }
}

module.exports = {
    BadRequest,
    NewsletterErrorApi,
    EmailAlreadyRegistered,
    ResourceAlreadyExists,
    NotifyError
};