import Model from "./Model.js";

class User extends Model {
  id: number;
  google_id: string;
  email: string;
  name: string;
  is_guest: boolean;

  constructor(id: number, google_id: string, email: string, name: string, is_guest: boolean = false) {
    super();
    this.id = id;
    this.google_id = google_id;
    this.email = email;
    this.name = name;
    this.is_guest = is_guest;
  }
}

export default User;