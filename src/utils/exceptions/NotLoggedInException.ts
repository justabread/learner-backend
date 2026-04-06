import Exception from "./Exception";

class NotLoggedInException extends Exception {
  constructor() {
    super("Unauthorized", "NotLoggedInException", 401);
  }
}

export default NotLoggedInException;
