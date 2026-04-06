import GoogleBase from "./GoogleBase.js";
import UserService from "../../services/auth/User.js";
import Session from "../../services/auth/Session.js";

class GoogleCallback extends GoogleBase {
  async run(): Promise<void> {
    const code = this.request.query.code as string;

    const { tokens } = await this.client.getToken(code);
    const ticket = await this.client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload()!;
    const user = UserService.upsert(payload.sub, payload.email!, payload.name!);
    const session = Session.create(user.id);

    this.response.cookie("session_id", session.session_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 2,
    });

    this.response.redirect(process.env.FRONTEND_URL ?? "http://localhost:5173");
  }
}

export default GoogleCallback;
