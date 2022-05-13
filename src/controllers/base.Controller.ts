import { Router, Request, Response, NextFunction, Handler } from "express";
import HttpCustomError from "../utils/http-custom-error";
import { MetadataKeys } from "../utils/metadata.keys";
import { IRouter } from "../utils/handlers.decorator";
import IErrorData from "../utils/error-data.interface";

export default abstract class BaseController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRouter();
  }

  private initializeRouter() {
    const info: Array<{ api: string; handler: string }> = [];

    const routers: IRouter[] = Reflect.getMetadata(
      MetadataKeys.ROUTERS,
      this.constructor
    );

    routers.forEach(({ method, path, middlewares, handlerName }: IRouter) => {
      this.router[method](
        path,
        (req: Request, res: Response, next: NextFunction) => {
          console.log("method middleware");
          next();
        },
        middlewares ?? [],
        (this as any as { [handleName: string]: Handler })[
          String(handlerName)
        ].bind(this)
      );

      info.push({
        api: `${method.toLocaleUpperCase()} ${path}`,
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
