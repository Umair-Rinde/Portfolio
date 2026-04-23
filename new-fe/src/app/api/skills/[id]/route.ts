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

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const skillId = Number(id);
  if (!Number.isFinite(skillId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const db = getDb();
  const row = db.prepare("SELECT * FROM skills WHERE id = ?").get(skillId) as SkillRow | undefined;
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(row);
}

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminOrResponse();
  if (denied) return denied;

  const { id } = await ctx.params;
  const skillId = Number(id);
  if (!Number.isFinite(skillId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

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

  const db = getDb();
  try {
    const info = db
      .prepare(
        `
        UPDATE skills
        SET name = @name,
            level = @level,
            color = @color,
            image = @image,
            experience = @experience,
            description = @description
        WHERE id = @id
      `,
      )
      .run({ id: skillId, ...body });

    if (info.changes === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const row = db.prepare("SELECT * FROM skills WHERE id = ?").get(skillId) as SkillRow;
    return NextResponse.json(row);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminOrResponse();
  if (denied) return denied;

  const { id } = await ctx.params;
  const skillId = Number(id);
  if (!Number.isFinite(skillId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const db = getDb();
  const info = db.prepare("DELETE FROM skills WHERE id = ?").run(skillId);
  if (info.changes === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

