import { HttpError } from "./HttpError";

export class Unauthorized extends HttpError{
  constructor(message: string){
    super(message, 401)
  };
}
