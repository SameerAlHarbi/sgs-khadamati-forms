import { NextFunction, Router } from "express";
import HttpCustomError from "../utils/http-custom-error";
import IErrorData from "../utils/error-data.interface";

export default abstract class BaseController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  // public abstract getInstance(): BaseController;
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
