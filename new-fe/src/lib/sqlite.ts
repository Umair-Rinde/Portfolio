import Database from "better-sqlite3";
import path from "path";
import { existsSync, mkdirSync } from "fs";

import { PROJECTS } from "@/app/constants/projects";
import { SKILLS } from "@/app/constants/skills";
import { COMPANIES } from "@/app/constants/companies";
import { CODESNIPPET } from "@/app/constants/codesnippet";

type GlobalWithDb = typeof globalThis & { __portfolioDb?: Database.Database };

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "portfolio.sqlite");

function ensureSchema(db: Database.Database) {
  db.exec(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      techStack TEXT NOT NULL,
      image TEXT NOT NULL,
      demoUrl TEXT,
      codeUrl TEXT,
      stars INTEGER NOT NULL DEFAULT 0,
      forks INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      level INTEGER NOT NULL,
      color TEXT NOT NULL,
      image TEXT NOT NULL,
      experience TEXT NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      logo TEXT,
      role TEXT,
      duration TEXT,
      website TEXT,
      projects TEXT NOT NULL,
      technologies TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS codesnippet (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      role TEXT NOT NULL DEFAULT 'user',
      createdAt TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );

    CREATE TABLE IF NOT EXISTS otp_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      codeHash TEXT NOT NULL,
      expiresAt INTEGER NOT NULL,
      createdAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      usedAt INTEGER,
      attempts INTEGER NOT NULL DEFAULT 0
    );
    CREATE INDEX IF NOT EXISTS idx_otp_email_created ON otp_codes(email, createdAt);
  `);
}

function seedIfEmpty(db: Database.Database) {
  const projectsCount = db.prepare("SELECT COUNT(*) as c FROM projects").get() as { c: number };
  if (projectsCount.c === 0) {
    const stmt = db.prepare(`
      INSERT INTO projects (id, title, description, techStack, image, demoUrl, codeUrl, stars, forks, status)
      VALUES (@id, @title, @description, @techStack, @image, @demoUrl, @codeUrl, @stars, @forks, @status)
    `);
    const tx = db.transaction(() => {
      for (const p of PROJECTS) {
        stmt.run({
          id: p.id,
          title: p.title,
          description: p.description,
          techStack: JSON.stringify(p.techStack ?? []),
          image: p.image,
          demoUrl: p.demoUrl ?? null,
          codeUrl: p.codeUrl ?? null,
          stars: p.stars ?? 0,
          forks: p.forks ?? 0,
          status: p.status,
        });
      }
    });
    tx();
  }

  const skillsCount = db.prepare("SELECT COUNT(*) as c FROM skills").get() as { c: number };
  if (skillsCount.c === 0) {
    const stmt = db.prepare(`
      INSERT INTO skills (name, level, color, image, experience, description)
      VALUES (@name, @level, @color, @image, @experience, @description)
    `);
    const tx = db.transaction(() => {
      for (const s of SKILLS) stmt.run(s);
    });
    tx();
  }

  const companiesCount = db.prepare("SELECT COUNT(*) as c FROM companies").get() as { c: number };
  if (companiesCount.c === 0) {
    const stmt = db.prepare(`
      INSERT INTO companies (name, logo, role, duration, website, projects, technologies)
      VALUES (@name, @logo, @role, @duration, @website, @projects, @technologies)
    `);
    const tx = db.transaction(() => {
      for (const c of COMPANIES) {
        stmt.run({
          ...c,
          projects: JSON.stringify(c.projects ?? []),
          technologies: JSON.stringify(c.technologies ?? []),
        });
      }
    });
    tx();
  }

  const snippet = db.prepare("SELECT value FROM codesnippet WHERE id = 1").get() as { value?: string } | undefined;
  if (!snippet?.value) {
    db.prepare("INSERT OR REPLACE INTO codesnippet (id, value) VALUES (1, ?)").run(CODESNIPPET);
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(adminEmail) as { id?: number } | undefined;
    if (!existing?.id) {
      db.prepare("INSERT INTO users (email, name, role) VALUES (?, ?, 'admin')").run(
        adminEmail,
        "Admin",
      );
    }
  }
}

export function getDb() {
  const g = globalThis as GlobalWithDb;
  if (g.__portfolioDb) return g.__portfolioDb;

  if (!existsSync(DB_DIR)) mkdirSync(DB_DIR, { recursive: true });
  const db = new Database(DB_PATH);
  ensureSchema(db);
  seedIfEmpty(db);

  g.__portfolioDb = db;
  return db;
}

export function jsonParseArray<T>(value: string): T[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

