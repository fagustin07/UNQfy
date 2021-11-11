class UNQfyError extends Error {    
    constructor(msg) {
        super(msg);
    }
}

class UNQfyAPIError extends Error {
    constructor(status, errorCode) {
        super();
        this.status = status;
        this.errorCode = errorCode;
    }
}

module.exports = {
    UNQfyError,
    UNQfyAPIError,
};