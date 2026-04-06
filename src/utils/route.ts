import type { Request, Response } from "express";
import NotLoggedInException from "./exceptions/NotLoggedInException";
import Exception from "./exceptions/Exception";

export interface Runnable {
  checkPermissions(): boolean;
  run(): void;
}

type ControllerClass = new (req: Request, res: Response) => Runnable;

export function route(Controller: ControllerClass) {
  return (req: Request, res: Response) => {
    const instance = new Controller(req, res);

    try {
      if (instance.checkPermissions()) {
        instance.run();
      }
    } catch (e) {
      if (e instanceof Exception) {
        res.status(e.status).json({ error: e.message });
      } else {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
