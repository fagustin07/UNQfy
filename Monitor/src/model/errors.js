class ResourceNotFound extends Error {
    constructor() {
        super();
        this.status = 404;
        this.errorCode = 'RESOURCE_NOT_FOUND';
    }
}

module.exports = {
    ResourceNotFound,
}