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

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const companyId = Number(id);
  if (!Number.isFinite(companyId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const db = getDb();
  const row = db.prepare("SELECT * FROM companies WHERE id = ?").get(companyId) as CompanyRow | undefined;
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(toCompany(row));
}

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminOrResponse();
  if (denied) return denied;

  const { id } = await ctx.params;
  const companyId = Number(id);
  if (!Number.isFinite(companyId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

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

  const db = getDb();
  const info = db
    .prepare(
      `
      UPDATE companies
      SET name = @name,
          logo = @logo,
          role = @role,
          duration = @duration,
          website = @website,
          projects = @projects,
          technologies = @technologies
      WHERE id = @id
    `,
    )
    .run({
      id: companyId,
      name: body.name,
      logo: body.logo ?? null,
      role: body.role ?? null,
      duration: body.duration ?? null,
      website: body.website ?? null,
      projects: JSON.stringify(body.projects),
      technologies: JSON.stringify(body.technologies),
    });

  if (info.changes === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const row = db.prepare("SELECT * FROM companies WHERE id = ?").get(companyId) as CompanyRow;
  return NextResponse.json(toCompany(row));
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminOrResponse();
  if (denied) return denied;

  const { id } = await ctx.params;
  const companyId = Number(id);
  if (!Number.isFinite(companyId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const db = getDb();
  const info = db.prepare("DELETE FROM companies WHERE id = ?").run(companyId);
  if (info.changes === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

