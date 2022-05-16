"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_custom_error_1 = __importDefault(require("../utils/http-custom-error"));
const metadata_keys_1 = require("../utils/metadata.keys");
require("reflect-metadata");
class BaseController {
    constructor() {
        this._basePath = "";
        this._middlewares = [];
        this.router = (0, express_1.Router)();
        this.initializeRouter();
    }
    get BasePath() {
        return this._basePath;
    }
    get Middlewares() {
        var _a;
        return (_a = this._middlewares) !== null && _a !== void 0 ? _a : [];
    }
    initializeRouter() {
        const info = [];
        this._basePath = Reflect.getMetadata(metadata_keys_1.MetadataKeys.BASE_PATH, this.constructor);
        this._middlewares = Reflect.getMetadata(metadata_keys_1.MetadataKeys.MIDDLEWARES, this.constructor);
        const routers = Reflect.getMetadata(metadata_keys_1.MetadataKeys.ROUTERS, this.constructor);
        routers.forEach(({ method, path, middlewares, handlerName }) => {
            this.router[method](path, middlewares !== null && middlewares !== void 0 ? middlewares : [], this[String(handlerName)].bind(this));
            info.push({
                api: `${method.toLocaleUpperCase()} ${this.BasePath + path}`,
                handler: `${this.constructor.name}.${String(handlerName)}`,
            });
        });
        console.table(info);
    }
    failResponse(httpStatusCode = 500, errorMessage, errorData, next) {
        const error = new http_custom_error_1.default(httpStatusCode, errorMessage, errorData);
        return next(error);
    }
}
exports.default = BaseController;
