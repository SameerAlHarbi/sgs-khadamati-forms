"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Put = exports.Post = exports.Get = exports.Methods = void 0;
const metadata_keys_1 = require("./metadata.keys");
var Methods;
(function (Methods) {
    Methods["GET"] = "get";
    Methods["POST"] = "post";
    Methods["PUT"] = "put";
})(Methods = exports.Methods || (exports.Methods = {}));
const methodDecoratorFactory = (method) => {
    return (path, ...middlewares) => {
        return (target, propertyKey) => {
            const controllerClass = target.constructor;
            const routers = Reflect.hasMetadata(metadata_keys_1.MetadataKeys.ROUTERS, controllerClass)
                ? Reflect.getMetadata(metadata_keys_1.MetadataKeys.ROUTERS, controllerClass)
                : [];
            routers.push({
                method,
                path,
                middlewares,
                handlerName: propertyKey,
            });
            Reflect.defineMetadata(metadata_keys_1.MetadataKeys.ROUTERS, routers, controllerClass);
        };
    };
};
exports.Get = methodDecoratorFactory(Methods.GET);
exports.Post = methodDecoratorFactory(Methods.POST);
exports.Put = methodDecoratorFactory(Methods.PUT);
