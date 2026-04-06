import GoogleBase from "./GoogleBase.js";

class GoogleRedirect extends GoogleBase {
  run(): void {
    const url = this.client.generateAuthUrl({
      access_type: "offline",
      scope: ["openid", "email", "profile"],
    });

    this.response.redirect(url);
  }
}

export default GoogleRedirect;
