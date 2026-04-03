import type { Request, Response } from "express";

export interface Runnable {
  run(): void;
}

type ControllerClass = new (req: Request, res: Response) => Runnable;

export function route(Controller: ControllerClass) {
  return (req: Request, res: Response) => {
    const instance = new Controller(req, res);
    instance.run();
  };
}
