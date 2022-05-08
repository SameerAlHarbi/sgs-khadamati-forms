"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const metadata_keys_1 = require("./utils/metadata.keys");
class App {
    constructor(controllers, port) {
        this.port = port;
        this.expressApp = (0, express_1.default)();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    defaultLanguageMiddleware(request, response, next) {
        request.query["lang"] = request.query["lang"]
            ? request.query["lang"].toUpperCase()
            : "A";
        return next();
    }
    defaultErrorMiddleware(error, request, response, next) {
        error.httpStatusCode = error.httpStatusCode || 500;
        error.message =
            error.httpStatusCode !== 404 ? error.message || "" : "Data NotFound!";
        return response
            .status(error.httpStatusCode)
            .json({ error: error.message, data: error.data || {} });
        next();
    }
    initializeMiddlewares() {
        this.expressApp.use(express_1.default.json());
        this.expressApp.use(this.defaultLanguageMiddleware);
        this.expressApp.use(this.defaultErrorMiddleware);
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            console.log(Reflect.getMetadata(metadata_keys_1.MetadataKeys.BASE_PATH, controller));
        });
    }
    listen() {
        this.expressApp.listen(this.port, () => {
            console.log(`Server Running here 👉 http://localhost:${this.port}`);
        });
    }
}
exports.default = App;
