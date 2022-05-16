"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export default function AppModule(
//   ...middleware: RequestHandler[]
// ): ClassDecorator {
//   return (target : any) => {
//     return class extends target {
//       fuel = 100
//     }
//   };
// }
// const AppModule = (target: IAppMod) => {
//   return class extends target {
//     testText = "okkkkkk";
//   };
// };
// export default AppModule;
function AppModule(constructor) {
    return class extends constructor {
        constructor() {
            super(...arguments);
            this.testText = "new property";
        }
    };
}
exports.default = AppModule;
