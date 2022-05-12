import { NextFunction, Request, Response } from "express";

export default function LogMessage(message: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(message);
    return next();
  };
}
