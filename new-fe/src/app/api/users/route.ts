import { NextResponse } from "next/server";
import { getDb } from "@/lib/sqlite";
import { requireAdminOrResponse } from "@/lib/requireAdmin";

export const dynamic = "force-dynamic";

type UserRow = {
  id: number;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
};

export async function GET() {
  const db = getDb();
  const rows = db
    .prepare("SELECT id, email, name, role, createdAt FROM users ORDER BY id ASC")
    .all() as UserRow[];
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const denied = await requireAdminOrResponse();
  if (denied) return denied;

  const body = (await req.json()) as Partial<{ email: string; name?: string | null; role?: string }>;
  const email = body.email?.trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  const role = body.role ?? "user";
  if (role !== "user" && role !== "admin") {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const db = getDb();
  try {
    const info = db
      .prepare("INSERT INTO users (email, name, role) VALUES (?, ?, ?)")
      .run(email, body.name ?? null, role);
    const row = db
      .prepare("SELECT id, email, name, role, createdAt FROM users WHERE id = ?")
      .get(info.lastInsertRowid) as UserRow;
    return NextResponse.json(row, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Insert failed" }, { status: 400 });
  }
}

