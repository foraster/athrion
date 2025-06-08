class ApiError extends Error {
    constructor(status, message, code = null){
        super();
        this.status = status;
        this.message = message;
        this.code = code;
    }
    
  static notFound(message, code = null) {
    return new ApiError(404, message, code);
  }

  static badRequest(message, code = null) {
    return new ApiError(400, message, code);
  }

  static internal(message, code = null) {
    return new ApiError(500, message, code);
  }

  static forbidden(message, code = null) {
    return new ApiError(403, message, code);
  }
}
module.exports = ApiError