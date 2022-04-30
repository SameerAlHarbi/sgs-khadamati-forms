"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const forms_controller_1 = __importDefault(require("./controllers/forms.controller"));
const PORT = +((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 9000);
const app = new app_1.default([new forms_controller_1.default()], PORT);
app.listen();
