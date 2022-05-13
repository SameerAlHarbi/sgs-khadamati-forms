import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Handler,
  RequestHandler,
} from "express";
import BaseController from "./controllers/base.Controller";
import { IRouter } from "./utils/handlers.decorator";
import HttpCustomError from "./utils/http-custom-error";
import { MetadataKeys } from "./utils/metadata.keys";
export default class App {
  public expressApp: Application;

  constructor(controllers: BaseController[], public port: number) {
    this.expressApp = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private defaultLanguageMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    request.query["lang"] = request.query["lang"]
      ? (<string>request.query["lang"]).toUpperCase()
      : "A";
    return next();
  }

  private defaultErrorMiddleware(
    error: HttpCustomError,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    error.httpStatusCode = error.httpStatusCode || 500;
    error.message =
      error.httpStatusCode !== 404 ? error.message || "" : "Data NotFound!";
    return response
      .status(error.httpStatusCode)
      .json({ error: error.message, data: error.data || {} });
    next();
  }

  private initializeMiddlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(this.defaultLanguageMiddleware);
    this.expressApp.use(this.defaultErrorMiddleware);
  }

  initializeControllers(controllers: BaseController[]) {
    const info: Array<{ api: string; handler: string }> = [];
    controllers.forEach((controller) => {
      const controllerInstance: { [handleName: string]: Handler } =
        controller as any;

      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        controller.constructor
      );

      const middlewares: RequestHandler = Reflect.getMetadata(
        MetadataKeys.MIDDLEWARES,
        controller.constructor
      );

      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        controller.constructor
      );

      routers.forEach(({ method, path, middlewares, handlerName }: IRouter) => {
        controller.router[method](
          path,
          (req: Request, res: Response, next: NextFunction) => {
            console.log("method middleware");
            next();
          },
          middlewares ?? [],
          controllerInstance[String(handlerName)].bind(controllerInstance)
        );

        info.push({
          api: `${method.toLocaleUpperCase()} ${basePath + path}`,
          handler: `${controller.constructor.name}.${String(handlerName)}`,
        });
      });

      this.expressApp.use(
        basePath,
        middlewares ??
          function (req, res, next) {
            return next();
          },
        controller.router
      );
    });

    console.table(info);
  }

  public listen() {
    this.expressApp.listen(this.port, (): void => {
      console.log(`Server Running here 👉 http://localhost:${this.port}`);
    });
  }
}
