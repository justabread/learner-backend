import { Request, Response } from "express";
import Session from "../services/auth/Session.js";
import NotLoggedInException from "../utils/exceptions/NotLoggedInException.js";
import NoSessionException from "./exceptions/NoSessionException.js";

abstract class Controller {
  request: Request;
  response: Response;
  private session: Session | null = null;

  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
  }

  protected isLogin(): boolean {
    const session_id = this.request.cookies?.session_id;

    if (!session_id) {
      return false;
    }

    const session = Session.lookup(session_id);

    if (!session) {
      return false;
    }

    this.session = session;
    return true;
  }

  protected loginRequired(): void {
    if (!this.isLogin()) {
      throw new NotLoggedInException();
    }
  }

  public getSession(): Session {
    if (this.session !== null) {
      return this.session;
    }

    throw new NoSessionException();
  }

  abstract checkPermissions(): boolean;
  abstract run(): void;
}

export default Controller;
