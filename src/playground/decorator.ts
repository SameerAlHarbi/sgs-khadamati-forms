// const classDecorator = (target: Function) => {
//   console.log("ok");
// };

import express, { Application } from "express";

// import { Application } from "express";

// const addFuelToRocket = (target: Function) => {
//   return class extends target {
//     fuel = 100;
//   };
// };

// @addFuelToRocket
// class Rocket {
//   fuel = 0;
// }

// const rocketInstance = new Rocket();
// console.log(rocketInstance.fuel); // 100

// const decorate = function () {
//   return function <T extends { new (...args: any[]): {} }>(target: T) {
//     return class myExtendClass extends target {
//       anotherProperty = 10; //assigning class property here
//       propertyFromDecorator = "new property from decorator"; // new property
//     };
//   };
// };

// @decorate()
// class Something {
//   myProp: string;
//   anotherProperty: number;
//   constructor() {
//     this.myProp = "my property";
//     this.anotherProperty = 0;
//   }
// }

// const someThing = new Something();
// console.log(someThing);

// const decorate = function () {
//   return function <SomeThing extends { new (...args: any[]): {} }>(
//     target: SomeThing
//   ) {
//     return class myExtendClass extends target {
//       anotherProperty = 10; //assigning class property here
//       propertyFromDecorator = "new property from decorator"; // new property
//     };
//   };
// };

// @decorate()
// class Something {
//   myProp: string;
//   anotherProperty: number;
//   constructor() {
//     this.myProp = "my property";
//     this.anotherProperty = 0;
//   }
// }

// const someThing = new Something();
// console.log(someThing);

// type Constructor<Class, Args extends any[] = any[]> = new (
//   ...args: Args
// ) => Class;

// export function myDecorator(arg: string) {
//   return <T extends { new (...args: any[]): {} }>(
//     cls: Constructor<T>
//   ): Constructor<T> => {
//     // more code
//     (app as Application).use;
//     return cls;
//   };
// }

const decorator = function (testText: string) {
  return function <T extends { new (...args: any[]): { myProp: string } }>(
    target: T
  ) {
    return class myExtendClass extends target {
      anotherProperty = 10; //assigning class property here
      // propertyFromDecorator = "new property from decorator";
      // nameTest = "ll";

      constructor(...args: any[]) {
        super(...args);
        this.myProp = "test2";
      }
    };
  };
};

abstract class Base {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
  }
}

@decorator("test")
class appMod {
  constructor() {}
  myProp = "test";
}

const appModul = new appMod();

console.log(appModul);
