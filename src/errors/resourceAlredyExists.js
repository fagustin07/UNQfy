const ApiError = require('./ApiError').ApiError

class ResourceAlredyExists extends ApiError {
	constructor(message) {
		super('ResourceAlredyExistsError', 409, "RESOURCE_ALREADY_EXISTS", message)
	}
}

module.exports = ResourceAlredyExists