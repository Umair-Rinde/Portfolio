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

export async function GET() {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM projects ORDER BY id ASC").all() as ProjectRow[];
  return NextResponse.json(rows.map(toProject));
}

export async function POST(req: Request) {
  const denied = await requireAdminOrResponse();
  if (denied) return denied;

  const db = getDb();
  const body = (await req.json()) as Partial<{
    id: number;
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
    typeof body.id !== "number" ||
    !body.title ||
    !body.description ||
    !body.image ||
    !body.status ||
    !Array.isArray(body.techStack)
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const stmt = db.prepare(`
    INSERT INTO projects (id, title, description, techStack, image, demoUrl, codeUrl, stars, forks, status)
    VALUES (@id, @title, @description, @techStack, @image, @demoUrl, @codeUrl, @stars, @forks, @status)
  `);

  try {
    stmt.run({
      id: body.id,
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
  } catch {
    return NextResponse.json({ error: "Insert failed" }, { status: 400 });
  }

  const row = db.prepare("SELECT * FROM projects WHERE id = ?").get(body.id) as ProjectRow | undefined;
  return NextResponse.json(row ? toProject(row) : null, { status: 201 });
}

