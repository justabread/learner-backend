import Controller from "../Controller.js";
import UserService from "../../services/auth/User.js";
import Session from "../../services/auth/Session.js";
import Model from "../../models/Model.js";

class GuestLogin extends Controller {
  checkPermissions(): boolean {
    return true;
  }

  run(): void {
    const user = UserService.createGuest();
    const session = Session.create(user.id);

    this.response.cookie("session_id", session.session_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    this.response.json(new Model());
  }
}

export default GuestLogin;