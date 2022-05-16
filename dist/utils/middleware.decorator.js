"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
function Middleware(handler) {
    return function (target, propertyKey, descriptor) {
        console.log(handler);
        // const original = descriptor.value;
        // descriptor.value = function (...args: any[]) {
        //   const request = args[0] as Request;
        //   const response = args[1] as Response;
        //   const headers = request.headers;
        //   if (headers.authorization === `Bearer`) {
        //     return original.apply(this, args);
        //   }
        //   response.status(403).json({ error: "Not Authorized" });
        // };
        // const response = (req: Request, res: Response) => {
        //   const original = descriptor.value(req, res);
        //   res.status(200).json(original + "0kk");
        // };
        // const original = descriptor.value;
        // descriptor.value = function (...args: any[]) {
        //   const request = args[0] as Request;
        //   const response = args[1] as Response;
        //   const nextFunc = args[1] as NextFunction;
        //   handler(request, response, nextFunc);
        //   return original.apply(this, args);
        // };
        // descriptor.value = handler;
        // console.log(descriptor);
        // console.log(descriptor.value);
        // console.log(...args: any[])
        // console.log("test");
    };
}
exports.Middleware = Middleware;
