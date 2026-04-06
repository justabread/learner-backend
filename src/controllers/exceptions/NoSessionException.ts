import Exception from "../../utils/exceptions/Exception";

class NoSessionException extends Exception {
  constructor() {
    super("No Session Present", "NoSessionException", 401);
  }
}

export default NoSessionException;
