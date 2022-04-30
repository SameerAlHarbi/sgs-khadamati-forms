import { NextFunction, Router } from "express";
import HttpCustomError from "../util/http-custom-error";
import IErrorData from "../util/error-data.interface";

export default abstract class BaseController {
  public router: Router;

  constructor(public path: string) {
    this.router = Router();
    this.initializeRoutes();
  }

  protected abstract initializeRoutes(): void;

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
