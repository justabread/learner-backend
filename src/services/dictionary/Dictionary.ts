import type { Database } from "better-sqlite3";
import LearnerDatabase from "../../db/LearnerDatabase.js";
import DictionaryEntry from "../../models/DictionaryEntry.js";

class Dictionary {
  private db: Database;

  constructor() {
    this.db = LearnerDatabase.getInstance();
  }

  getAll(user_id: number): DictionaryEntry[] {
    return this.db
      .prepare(
        "SELECT english, swedish, inserted FROM dictionary WHERE user_id = ? ORDER BY inserted DESC",
      )
      .all(user_id) as DictionaryEntry[];
  }

  add(
    user_id: number,
    entries: { english: string; swedish: string }[],
  ): DictionaryEntry[] {
    const insert = this.db.prepare(
      "INSERT OR IGNORE INTO dictionary (user_id, english, swedish) VALUES (?, ?, ?)",
    );
    const added: DictionaryEntry[] = [];

    for (const entry of entries) {
      if (!entry.english || !entry.swedish) continue;
      const result = insert.run(user_id, entry.english, entry.swedish);
      if (result.changes > 0) {
        added.push(
          new DictionaryEntry(
            entry.english,
            entry.swedish,
            new Date().toISOString(),
          ),
        );
      }
    }

    return added;
  }

  delete(user_id: number, english: string): number {
    const result = this.db
      .prepare(
        "DELETE FROM dictionary WHERE user_id = ? AND LOWER(english) = LOWER(?)",
      )
      .run(user_id, english);
    return result.changes;
  }
}

export default Dictionary;
