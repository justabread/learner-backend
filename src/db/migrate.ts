import "dotenv/config";
import Database from "./learner-database.js";
import { resolve } from "path";
import { readdirSync, readFileSync } from "fs";

const db = Database.getInstance();

db.exec(`
  CREATE TABLE IF NOT EXISTS _migrations (
    name TEXT PRIMARY KEY,
    appliedAt TEXT NOT NULL
  )
`);

const migrationsPath = resolve(
  process.env.MIGRATIONS_PATH ?? "./src/db/migrations",
);
const applied = new Set(
  db
    .prepare("SELECT name FROM _migrations")
    .all()
    .map((r: any) => r.name),
);

const files = readdirSync(migrationsPath)
  .filter((f) => f.endsWith(".sql"))
  .sort();

let count = 0;
for (const file of files) {
  if (applied.has(file)) continue;
  const sql = readFileSync(resolve(migrationsPath, file), "utf-8");
  db.exec(sql);
  db.prepare("INSERT INTO _migrations (name, appliedAt) VALUES (?, ?)").run(
    file,
    new Date().toISOString(),
  );
  console.log(`Applied: ${file}`);
  count++;
}

if (count === 0) console.log("Nothing to migrate.");
else console.log(`Done. ${count} migration(s) applied.`);
