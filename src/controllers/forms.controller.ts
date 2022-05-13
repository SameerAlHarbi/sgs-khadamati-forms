import { Request, Response, NextFunction } from "express";
import HttpCustomError from "../utils/http-custom-error";
import BaseController from "./base.Controller";
import Controller from "../utils/controller.decorator";
import { Get, Post } from "../utils/handlers.decorator";
@Controller("/forms")
export default class FormsController extends BaseController {
  constructor() {
    super();
  }

  @Get("/")
  getAllForms(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json("ok");
    } catch (error) {
      (error as HttpCustomError).httpStatusCode = 400;
      return next(error);
    }
  }

  @Get("/2")
  getAllForms2(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json("ok2");
    } catch (error) {
      (error as HttpCustomError).httpStatusCode = 400;
      return next(error);
    }
  }
}
