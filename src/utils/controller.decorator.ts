import { RequestHandler } from "express";
import { MetadataKeys } from "./metadata.keys";

const Controller = (
  basePath: string,
  ...middlewares: RequestHandler[]
): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
    if (middlewares && middlewares.length > 0) {
      Reflect.defineMetadata(MetadataKeys.MIDDLEWARES, middlewares, target);
    }
  };
};

export default Controller;
