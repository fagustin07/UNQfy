class LogginError extends Error {
    constructor(status, errorCode, message = errorCode) {
        super();
        this.status = status;
        this.errorCode = errorCode;
        this.message = message;
    }
}

class BadRequest extends LogginError { 
    constructor() {
        super(400, 'BAD_REQUEST');
    }
}

class LogginDesacitivated extends LogginError {
    constructor() {
        super(400, 'BAD_REQUEST', 'Loggin service is desactivated');
    }
}

class CannotChangeStateOfLoggin extends LogginError {
    constructor(state) {
        super(400, 'BAD_REQUEST', `Loggin service is already ${state}`);
    }
}

module.exports = {
    LogginError,
    BadRequest,
    LogginDesacitivated,
    CannotChangeStateOfLoggin
};