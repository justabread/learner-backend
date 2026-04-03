import { Request, Response } from "express";

abstract class Controller {
  request: Request;
  response: Response;

  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
  }

  abstract run(): void;
}

export default Controller;
