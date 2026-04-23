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

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const userId = Number(id);
  if (!Number.isFinite(userId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const db = getDb();
  const row = db
    .prepare("SELECT id, email, name, role, createdAt FROM users WHERE id = ?")
    .get(userId) as UserRow | undefined;
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(row);
}

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminOrResponse();
  if (denied) return denied;

  const { id } = await ctx.params;
  const userId = Number(id);
  if (!Number.isFinite(userId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

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
      .prepare("UPDATE users SET email = ?, name = ?, role = ? WHERE id = ?")
      .run(email, body.name ?? null, role, userId);
    if (info.changes === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const row = db
      .prepare("SELECT id, email, name, role, createdAt FROM users WHERE id = ?")
      .get(userId) as UserRow;
    return NextResponse.json(row);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminOrResponse();
  if (denied) return denied;

  const { id } = await ctx.params;
  const userId = Number(id);
  if (!Number.isFinite(userId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const db = getDb();
  const info = db.prepare("DELETE FROM users WHERE id = ?").run(userId);
  if (info.changes === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

