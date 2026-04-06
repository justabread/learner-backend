DROP TABLE IF EXISTS dictionary;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  google_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  is_guest INTEGER NOT NULL DEFAULT 0,
  inserted TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS dictionary (
  user_id INTEGER NOT NULL,
  english TEXT NOT NULL,
  swedish TEXT NOT NULL,
  inserted TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY(user_id, english),
  FOREIGN KEY(user_id) REFERENCES users(id)
);
