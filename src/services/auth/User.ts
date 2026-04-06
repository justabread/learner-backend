import LearnerDatabase from "../../db/LearnerDatabase.js";
import User from "../../models/User.js";

class UserService {
  public static upsert(google_id: string, email: string, name: string): User {
    const db = LearnerDatabase.getInstance();

    db.prepare(
      "INSERT OR IGNORE INTO users (google_id, email, name) VALUES (?, ?, ?)",
    ).run(google_id, email, name);

    const user_id = (
      db.prepare("SELECT id FROM users WHERE google_id = ?").get(google_id) as {
        id: number;
      }
    ).id;

    return new User(user_id, google_id, email, name);
  }

  public static createGuest(): User {
    const db = LearnerDatabase.getInstance();
    const uuid = crypto.randomUUID();

    const result = db
      .prepare(
        "INSERT INTO users (google_id, email, name, is_guest) VALUES (?, ?, ?, 1)",
      )
      .run(uuid, uuid, "Guest");

    return new User(
      result.lastInsertRowid as number,
      uuid,
      uuid,
      "Guest",
      true,
    );
  }
}

export default UserService;