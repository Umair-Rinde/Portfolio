import { NextResponse } from "next/server";
import { getDb, jsonParseArray } from "@/lib/sqlite";
import { requireAdminOrResponse } from "@/lib/requireAdmin";

export const dynamic = "force-dynamic";

type ProjectRow = {
  id: number;
  title: string;
  description: string;
  techStack: string;
  image: string;
  demoUrl: string | null;
  codeUrl: string | null;
  stars: number;
  forks: number;
  status: string;
};

function toProject(row: ProjectRow) {
  return {
    ...row,
    techStack: jsonParseArray<string>(row.techStack),
  };
}

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const projectId = Number(id);
  if (!Number.isFinite(projectId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const db = getDb();
  const row = db.prepare("SELECT * FROM projects WHERE id = ?").get(projectId) as ProjectRow | undefined;
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(toProject(row));
}

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminOrResponse();
  if (denied) return denied;

  const { id } = await ctx.params;
  const projectId = Number(id);
  if (!Number.isFinite(projectId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = (await req.json()) as Partial<{
    title: string;
    description: string;
    techStack: string[];
    image: string;
    demoUrl?: string | null;
    codeUrl?: string | null;
    stars?: number;
    forks?: number;
    status: string;
  }>;

  if (
    !body.title ||
    !body.description ||
    !body.image ||
    !body.status ||
    !Array.isArray(body.techStack)
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const db = getDb();
  const info = db
    .prepare(
      `
      UPDATE projects
      SET title = @title,
          description = @description,
          techStack = @techStack,
          image = @image,
          demoUrl = @demoUrl,
          codeUrl = @codeUrl,
          stars = @stars,
          forks = @forks,
          status = @status
      WHERE id = @id
    `,
    )
    .run({
      id: projectId,
      title: body.title,
      description: body.description,
      techStack: JSON.stringify(body.techStack),
      image: body.image,
      demoUrl: body.demoUrl ?? null,
      codeUrl: body.codeUrl ?? null,
      stars: body.stars ?? 0,
      forks: body.forks ?? 0,
      status: body.status,
    });

  if (info.changes === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const row = db.prepare("SELECT * FROM projects WHERE id = ?").get(projectId) as ProjectRow;
  return NextResponse.json(toProject(row));
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminOrResponse();
  if (denied) return denied;

  const { id } = await ctx.params;
  const projectId = Number(id);
  if (!Number.isFinite(projectId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const db = getDb();
  const info = db.prepare("DELETE FROM projects WHERE id = ?").run(projectId);
  if (info.changes === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

