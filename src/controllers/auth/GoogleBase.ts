import { OAuth2Client } from "google-auth-library";
import Controller from "../Controller.js";

abstract class GoogleBase extends Controller {
  protected client: OAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );

  checkPermissions(): boolean {
    return true;
  }
}

export default GoogleBase;
