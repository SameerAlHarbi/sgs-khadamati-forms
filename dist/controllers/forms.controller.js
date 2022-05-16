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
const base_Controller_1 = __importDefault(require("./base.Controller"));
const controller_decorator_1 = __importDefault(require("../utils/controller.decorator"));
const handlers_decorator_1 = require("../utils/handlers.decorator");
let FormsController = class FormsController extends base_Controller_1.default {
    constructor() {
        super();
    }
    getAllForms(request, response, next) {
        try {
            return response.json("ok");
        }
        catch (error) {
            error.httpStatusCode = 400;
            return next(error);
        }
    }
    getAllForms2(request, response, next) {
        try {
            return response.json("ok2");
        }
        catch (error) {
            error.httpStatusCode = 400;
            return next(error);
        }
    }
};
__decorate([
    (0, handlers_decorator_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], FormsController.prototype, "getAllForms", null);
__decorate([
    (0, handlers_decorator_1.Get)("/2"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], FormsController.prototype, "getAllForms2", null);
FormsController = __decorate([
    (0, controller_decorator_1.default)("/forms"),
    __metadata("design:paramtypes", [])
], FormsController);
exports.default = FormsController;
