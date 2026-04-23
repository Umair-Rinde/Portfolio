import { NextResponse } from "next/server";
import { getDb } from "@/lib/sqlite";
import { requireAdminOrResponse } from "@/lib/requireAdmin";

export const dynamic = "force-dynamic";

type SkillRow = {
  id: number;
  name: string;
  level: number;
  color: string;
  image: string;
  experience: string;
  description: string;
};

export async function GET() {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM skills ORDER BY id ASC").all() as SkillRow[];
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const denied = await requireAdminOrResponse();
  if (denied) return denied;

  const db = getDb();
  const body = (await req.json()) as Partial<{
    name: string;
    level: number;
    color: string;
    image: string;
    experience: string;
    description: string;
  }>;

  if (
    !body.name ||
    typeof body.level !== "number" ||
    !body.color ||
    !body.image ||
    !body.experience ||
    !body.description
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const info = db
      .prepare(
        `
        INSERT INTO skills (name, level, color, image, experience, description)
        VALUES (@name, @level, @color, @image, @experience, @description)
      `,
      )
      .run(body);

    const row = db.prepare("SELECT * FROM skills WHERE id = ?").get(info.lastInsertRowid) as SkillRow;
    return NextResponse.json(row, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Insert failed" }, { status: 400 });
  }
}

