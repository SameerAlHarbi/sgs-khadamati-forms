import { Request, Response, NextFunction } from "express";
import HttpCustomError from "../util/http-custom-error";
import BaseController from "./base.Controller";

export default class FormsController extends BaseController {
  constructor(path = "/forms") {
    super(path);
  }

  protected initializeRoutes() {
    this.router.get("/", this.getAllForms);
  }

  getAllForms(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json("ok");
    } catch (error) {
      (error as HttpCustomError).httpStatusCode = 400;
      return next(error);
    }
  }
}
