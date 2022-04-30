import IErrorData from "./error-data.interface";

//Custom Error Class
export default class HttpCustomError extends Error {
  constructor(
    public httpStatusCode: number,
    message?: string,
    public data?: IErrorData
  ) {
    super(message);
  }
}
