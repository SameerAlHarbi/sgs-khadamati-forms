"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_keys_1 = require("./metadata.keys");
const Controller = (basePath, ...middlewares) => {
    return (target) => {
        Reflect.defineMetadata(metadata_keys_1.MetadataKeys.BASE_PATH, basePath, target);
        if (middlewares && middlewares.length > 0) {
            Reflect.defineMetadata(metadata_keys_1.MetadataKeys.MIDDLEWARES, middlewares, target);
        }
    };
};
exports.default = Controller;
