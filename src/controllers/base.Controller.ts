import {
  Router,
  Request,
  Response,
  NextFunction,
  Handler,
  RequestHandler,
} from "express";
import HttpCustomError from "../utils/http-custom-error";
import { MetadataKeys } from "../utils/metadata.keys";
import { IRouter } from "../utils/handlers.decorator";
import IErrorData from "../utils/error-data.interface";
import "reflect-metadata";

export default abstract class BaseController {
  private _basePath = "";
  private _middlewares: RequestHandler[] = [];

  public router: Router;

  public get BasePath() {
    return this._basePath;
  }

  public get Middlewares() {
    return this._middlewares ?? [];
  }

  constructor() {
    this.router = Router();
    this.initializeRouter();
  }

  private initializeRouter() {
    const info: Array<{ api: string; handler: string }> = [];

    this._basePath = Reflect.getMetadata(
      MetadataKeys.BASE_PATH,
      this.constructor
    );

    this._middlewares = Reflect.getMetadata(
      MetadataKeys.MIDDLEWARES,
      this.constructor
    );

    const routers: IRouter[] = Reflect.getMetadata(
      MetadataKeys.ROUTERS,
      this.constructor
    );

    routers.forEach(({ method, path, middlewares, handlerName }: IRouter) => {
      this.router[method](
        path,
        middlewares ?? [],
        (this as any as { [handleName: string]: Handler })[
          String(handlerName)
        ].bind(this)
      );

      info.push({
        api: `${method.toLocaleUpperCase()} ${this.BasePath + path}`,
        handler: `${this.constructor.name}.${String(handlerName)}`,
      });
    });

    console.table(info);
  }

  protected failResponse(
    httpStatusCode = 500,
    errorMessage: string,
    errorData: IErrorData,
    next: NextFunction
  ) {
    const error = new HttpCustomError(httpStatusCode, errorMessage, errorData);
    return next(error);
  }
}
