"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_module_decorator_1 = __importDefault(require("./utils/app-module.decorator"));
let App = class App {
    constructor(controllers, port) {
        this.port = port;
        this.expressApp = (0, express_1.default)();
        this.testText = "dddddd";
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
            this.expressApp.use(controller.BasePath, controller.Middlewares, controller.router);
        });
    }
    listen() {
        this.expressApp.listen(this.port, () => {
            console.log(`Server Running here 👉 http://localhost:${this.port}`);
        });
    }
};
App = __decorate([
    app_module_decorator_1.default,
    __metadata("design:paramtypes", [Array, Number])
], App);
exports.default = App;
