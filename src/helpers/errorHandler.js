const { ApiError } = require("../errors/ApiError");

function errorHandler(res, req, next) {
    if (err instanceof ApiError) {
        res.status(err.status)
        res.json({ message: err.message, status: err.status, errorCode: err.errorCode });
    }
    else {
        next(err)
    }
}

module.exports = { errorHandler }

