import { NextResponse } from "next/server";
import { getDb } from "@/lib/sqlite";
import { requireAdminOrResponse } from "@/lib/requireAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = getDb();
  const row = db.prepare("SELECT value FROM codesnippet WHERE id = 1").get() as { value: string } | undefined;
  return NextResponse.json({ value: row?.value ?? "" });
}

export async function PUT(req: Request) {
  const denied = await requireAdminOrResponse();
  if (denied) return denied;

  const body = (await req.json()) as Partial<{ value: string }>;
  if (typeof body.value !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const db = getDb();
  db.prepare("INSERT OR REPLACE INTO codesnippet (id, value) VALUES (1, ?)").run(body.value);
  return NextResponse.json({ value: body.value });
}

