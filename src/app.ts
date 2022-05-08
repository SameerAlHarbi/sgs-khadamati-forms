import express, {
  Application,
  Request,
  Response,
  NextFunction,
  Handler,
} from "express";
import BaseController from "./controllers/base.Controller";
import FormsController from "./controllers/forms.controller";
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
    console.log(controllers);
    controllers.forEach((controller) => {
      console.log(controller);
      // const controllerInstance: { [handleName: string]: Handler } = new FormsController();

      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        controller.constructor
      );

      // const routers: IRouter[] = Reflect.getMetadata(
      //   MetadataKeys.ROUTERS,
      //   controller
      // );

      // const router = express.Router();
      // routers.forEach(({ method, path, handlerName }) => {
      //   router[method](path);
      // });

      // console.log(basePath, routers);
    });
  }

  public listen() {
    this.expressApp.listen(this.port, (): void => {
      console.log(`Server Running here 👉 http://localhost:${this.port}`);
    });
  }
}
