"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Custom Error Class
class HttpCustomError extends Error {
    constructor(httpStatusCode, message, data) {
        super(message);
        this.httpStatusCode = httpStatusCode;
        this.data = data;
    }
}
exports.default = HttpCustomError;
