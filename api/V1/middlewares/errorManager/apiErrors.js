// Error definitions
class ApiError {
    constructor(code, message){
        this.code = code;
        this.message = message;
    }

    static movedPermanently(msg){
        return new ApiError(301, msg)
    }

    static badRequest(msg){
        return new ApiError(400, msg)
    }

    static unauthorized(msg){
        return new ApiError(401, msg)
    }

    static forbidden(msg){
        return new ApiError(403, msg)
    }

    static resourceNotFound(msg){
        return new ApiError(404, msg)
    }

    static Unallowed(msg){
        return new ApiError(405, msg)
    }

    static timeout(msg){
        return new ApiError(408, msg)
    }

    static internalServerError(msg){
        return new ApiError(500, msg)
    }

    static unAvailable(msg){
        return new ApiError(503, msg)
    }

}

module.exports = ApiError;