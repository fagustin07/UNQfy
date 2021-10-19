class ApiError extends Error {
    constructor(name, statusCode, errorCode, message = null) {
        super(message);
        this.name = name;
        this.status = statusCode;
        this.errorCode = errorCode;
    }
}

module.exports = {
    ApiError
}