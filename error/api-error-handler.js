const ApiError = require('./apiError');

function apiErrorHandler (err, req, res, next){
    if (err instanceof ApiError) {
        res.status(err.httpCode).json({ message: err.errorMessage });
    }
    return res.status(500).json({ message: err.message })
}

module.exports = apiErrorHandler;