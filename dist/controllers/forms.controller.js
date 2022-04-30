"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_Controller_1 = __importDefault(require("./base.Controller"));
class FormsController extends base_Controller_1.default {
    constructor(path = "/forms") {
        super(path);
    }
    initializeRoutes() {
        this.router.get("/", this.getAllForms);
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
}
exports.default = FormsController;
