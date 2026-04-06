import Controller from "../Controller.js";
import Model from "../../models/Model.js";

class Logout extends Controller {
  checkPermissions(): boolean {
    this.loginRequired();
    return true;
  }

  run(): void {
    this.getSession().delete();

    this.response.clearCookie("session_id");
    this.response.json(new Model());
  }
}

export default Logout;
