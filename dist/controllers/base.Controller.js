"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_custom_error_1 = __importDefault(require("../utils/http-custom-error"));
class BaseController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    failResponse(httpStatusCode = 500, errorMessage, errorData, next) {
        const error = new http_custom_error_1.default(httpStatusCode, errorMessage, errorData);
        return next(error);
    }
}
exports.default = BaseController;
