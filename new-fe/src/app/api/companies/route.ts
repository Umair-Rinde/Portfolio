import { NextResponse } from "next/server";
import { getDb, jsonParseArray } from "@/lib/sqlite";
import { requireAdminOrResponse } from "@/lib/requireAdmin";

export const dynamic = "force-dynamic";

type CompanyRow = {
  id: number;
  name: string;
  logo: string | null;
  role: string | null;
  duration: string | null;
  website: string | null;
  projects: string;
  technologies: string;
};

function toCompany(row: CompanyRow) {
  return {
    ...row,
    projects: jsonParseArray<string>(row.projects),
    technologies: jsonParseArray<string>(row.technologies),
  };
}

export async function GET() {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM companies ORDER BY id ASC").all() as CompanyRow[];
  return NextResponse.json(rows.map(toCompany));
}

export async function POST(req: Request) {
  const denied = await requireAdminOrResponse();
  if (denied) return denied;

  const db = getDb();
  const body = (await req.json()) as Partial<{
    name: string;
    logo?: string | null;
    role?: string | null;
    duration?: string | null;
    website?: string | null;
    projects: string[];
    technologies: string[];
  }>;

  if (!body.name || !Array.isArray(body.projects) || !Array.isArray(body.technologies)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const info = db
    .prepare(
      `
      INSERT INTO companies (name, logo, role, duration, website, projects, technologies)
      VALUES (@name, @logo, @role, @duration, @website, @projects, @technologies)
    `,
    )
    .run({
      name: body.name,
      logo: body.logo ?? null,
      role: body.role ?? null,
      duration: body.duration ?? null,
      website: body.website ?? null,
      projects: JSON.stringify(body.projects),
      technologies: JSON.stringify(body.technologies),
    });

  const row = db.prepare("SELECT * FROM companies WHERE id = ?").get(info.lastInsertRowid) as CompanyRow;
  return NextResponse.json(toCompany(row), { status: 201 });
}

