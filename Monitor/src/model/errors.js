class ResourceNotFound extends Error {
    constructor() {
        super('Resource not found');
        this.status = 404;
        this.errorCode = 'RESOURCE_NOT_FOUND';
    }
}

module.exports = {
    ResourceNotFound,
}