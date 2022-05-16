import express, { Application, NextFunction, Request, Response } from "express";
import { IApp } from "../app";

const AppModule = function (testMessage: string) {
  return function <T extends { new (...args: any[]): IApp }>(target: T) {
    return class myExtendClass extends target {
      anotherProperty = 10; //assigning class property here
      expressApp = express();
      propertyFromDecorator = "new property from decorator"; // new property
      constructor(...args: any[]) {
        super(...args);
        this.expressApp.use(
          (request: Request, response: Response, next: NextFunction) => {
            console.log(testMessage);
            next();
          }
        );
      }
      // init();
    };
  };
};

export default AppModule;
