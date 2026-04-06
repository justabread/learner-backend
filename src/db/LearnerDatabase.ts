import SQLiteDatabase from "better-sqlite3";
import { resolve } from "path";

class LearnerDatabase {
  private static instance: SQLiteDatabase.Database;

  public static getInstance(): SQLiteDatabase.Database {
    if (!this.instance) {
      const dbPath = resolve(process.env.DB_PATH ?? "./dictionary.db");
      this.instance = new SQLiteDatabase(dbPath);
    }

    return this.instance;
  }
}

export default LearnerDatabase;
