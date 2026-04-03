import Database from 'better-sqlite3'
import { resolve } from 'path'

export interface DictionaryEntry {
  english: string
  swedish: string
  addedAt: string
}

class Dictionary {
  private db: Database.Database

  constructor() {
    const dbPath = resolve(process.env.DB_PATH ?? './dictionary.db')
    this.db = new Database(dbPath)
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS dictionary (
        english TEXT PRIMARY KEY,
        swedish TEXT NOT NULL,
        addedAt TEXT NOT NULL
      )
    `)
  }

  getAll(): DictionaryEntry[] {
    return this.db.prepare('SELECT * FROM dictionary ORDER BY addedAt DESC').all() as DictionaryEntry[]
  }

  add(entries: { english: string; swedish: string }[]): DictionaryEntry[] {
    const insert = this.db.prepare(
      'INSERT OR IGNORE INTO dictionary (english, swedish, addedAt) VALUES (?, ?, ?)'
    )
    const added: DictionaryEntry[] = []

    for (const entry of entries) {
      if (!entry.english || !entry.swedish) continue
      const addedAt = new Date().toISOString()
      const result = insert.run(entry.english, entry.swedish, addedAt)
      if (result.changes > 0) {
        added.push({ english: entry.english, swedish: entry.swedish, addedAt })
      }
    }

    return added
  }

  delete(english: string): number {
    const result = this.db.prepare('DELETE FROM dictionary WHERE LOWER(english) = LOWER(?)').run(english)
    return result.changes
  }
}

export default Dictionary