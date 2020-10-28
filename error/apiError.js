class ApiError {
    constructor (httpCode, errorMessage) {
     this.httpCode = httpCode;
     this.errorMessage = errorMessage
    }

     static badRequest(msg) {
      return new ApiError(400, msg);
      }

      static  notFound(msg) {
        return new ApiError(404, msg);
      }

      static notAcceptable(msg) {
        return new ApiError(404, msg);
      }

    internalServerError(msg){
      return new ApiError(500, msg)
    }

}

module.exports = ApiError;