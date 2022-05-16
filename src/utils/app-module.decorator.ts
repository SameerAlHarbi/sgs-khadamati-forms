import express, { Application } from "express";

const AppModule = function () {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    return class myExtendClass extends target {
      anotherProperty = 10; //assigning class property here
      propertyFromDecorator = "new property from decorator"; // new property
      // init();
    };
  };
};

export default AppModule;
