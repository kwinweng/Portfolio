import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

let _db: Database.Database | null = null;

function resolveDbPath(): string {
  const fromEnv = process.env.DATABASE_PATH;
  if (fromEnv) return fromEnv;
  const dir = path.join(process.cwd(), ".data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, "db.sqlite");
}

const SCHEMA = /* sql */ `
CREATE TABLE IF NOT EXISTS writings (
  type TEXT NOT NULL CHECK(type IN ('writing','log')),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  tags TEXT NOT NULL DEFAULT '[]',
  project_slug TEXT,
  visibility TEXT NOT NULL DEFAULT 'public' CHECK(visibility IN ('public','unlisted','private')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published','archived')),
  published_at TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (type, slug)
);

CREATE TABLE IF NOT EXISTS projects (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  description TEXT DEFAULT '',
  categories TEXT NOT NULL DEFAULT '[]',
  priority TEXT NOT NULL DEFAULT 'B',
  status TEXT NOT NULL DEFAULT 'building',
  visibility TEXT NOT NULL DEFAULT 'public' CHECK(visibility IN ('public','unlisted','private')),
  featured INTEGER NOT NULL DEFAULT 0,
  stack TEXT NOT NULL DEFAULT '[]',
  links TEXT NOT NULL DEFAULT '{}',
  metrics TEXT NOT NULL DEFAULT '[]',
  roadmap TEXT NOT NULL DEFAULT '[]',
  order_num INTEGER NOT NULL DEFAULT 100,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reading_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT DEFAULT '',
  type TEXT NOT NULL DEFAULT 'book' CHECK(type IN ('book','essay','paper')),
  topic TEXT NOT NULL,
  url TEXT,
  note TEXT NOT NULL DEFAULT '',
  finished_at TEXT,
  visibility TEXT NOT NULL DEFAULT 'public' CHECK(visibility IN ('public','unlisted','private')),
  order_num INTEGER NOT NULL DEFAULT 100,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lab_items (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  kind TEXT NOT NULL DEFAULT 'tool',
  status TEXT NOT NULL DEFAULT 'active',
  href TEXT,
  stack TEXT NOT NULL DEFAULT '[]',
  visibility TEXT NOT NULL DEFAULT 'public' CHECK(visibility IN ('public','unlisted','private')),
  order_num INTEGER NOT NULL DEFAULT 100,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_writings_type ON writings(type);
CREATE INDEX IF NOT EXISTS idx_writings_published ON writings(status, published_at);
`;

export function getDb(): Database.Database {
  if (_db) return _db;
  const dbPath = resolveDbPath();
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.exec(SCHEMA);
  _db = db;
  return db;
}

export type DbVisibility = "public" | "unlisted" | "private";
export type DbContentStatus = "draft" | "published" | "archived";
