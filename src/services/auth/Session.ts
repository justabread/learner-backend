import LearnerDatabase from "../../db/LearnerDatabase";

class Session {
  session_id: string;
  user_id: number;

  constructor(session_id: string, user_id: number) {
    this.session_id = session_id;
    this.user_id = user_id;
  }

  public static create(user_id: number): Session {
    const session_id = crypto.randomUUID();
    LearnerDatabase.getInstance()
      .prepare(`INSERT INTO sessions (id, user_id) VALUES (?, ?)`)
      .run(session_id, user_id);

    return new Session(session_id, user_id);
  }

  public static lookup(session_id: string): Session | null {
    const session_data = LearnerDatabase.getInstance()
      .prepare(`SELECT user_id FROM sessions WHERE id=?`)
      .get(session_id) as { user_id: number } | undefined;

    if (session_data !== undefined) {
      return new Session(session_id, session_data.user_id);
    }

    return null;
  }

  public delete(): void {
    LearnerDatabase.getInstance()
      .prepare("DELETE FROM sessions WHERE id=?")
      .run(this.session_id);
  }
}

export default Session;
