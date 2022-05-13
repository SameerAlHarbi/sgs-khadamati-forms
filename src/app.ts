import express, { Application, Request, Response, NextFunction } from "express";
import BaseController from "./controllers/base.Controller";
import HttpCustomError from "./utils/http-custom-error";
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
    controllers.forEach((controller) => {
      this.expressApp.use(
        controller.BasePath,
        controller.Middlewares,
        controller.router
      );
    });
  }

  public listen() {
    this.expressApp.listen(this.port, (): void => {
      console.log(`Server Running here 👉 http://localhost:${this.port}`);
    });
  }
}
