"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function LogMessage(message) {
    return (req, res, next) => {
        console.log(message);
        return next();
    };
}
exports.default = LogMessage;
