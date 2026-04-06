import type { Database } from "better-sqlite3";
import LearnerDatabase from "../../db/learner-database";

export interface DictionaryEntry {
  english: string;
  swedish: string;
  addedAt: string;
}

class Dictionary {
  private db: Database;

  constructor() {
    this.db = LearnerDatabase.getInstance();
  }

  getAll(): DictionaryEntry[] {
    return this.db
      .prepare("SELECT * FROM dictionary ORDER BY addedAt DESC")
      .all() as DictionaryEntry[];
  }

  add(entries: { english: string; swedish: string }[]): DictionaryEntry[] {
    const insert = this.db.prepare(
      "INSERT OR IGNORE INTO dictionary (english, swedish, addedAt) VALUES (?, ?, ?)",
    );
    const added: DictionaryEntry[] = [];

    for (const entry of entries) {
      if (!entry.english || !entry.swedish) continue;
      const addedAt = new Date().toISOString();
      const result = insert.run(entry.english, entry.swedish, addedAt);
      if (result.changes > 0) {
        added.push({ english: entry.english, swedish: entry.swedish, addedAt });
      }
    }

    return added;
  }

  delete(english: string): number {
    const result = this.db
      .prepare("DELETE FROM dictionary WHERE LOWER(english) = LOWER(?)")
      .run(english);
    return result.changes;
  }
}

export default Dictionary;
