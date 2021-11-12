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

class NotifyError extends Error {
    constructor() {
        super('Notifications could not be sent');
    }
}

module.exports = {
    NotifyError,
    BadRequest,
    NewsletterErrorApi
};