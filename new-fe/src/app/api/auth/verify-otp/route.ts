import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHash } from "crypto";
import { getDb } from "@/lib/sqlite";
import { ADMIN_TOKEN_COOKIE, signAdminToken } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function hashOtp(email: string, code: string) {
  const salt = process.env.OTP_SALT || "dev-salt";
  return createHash("sha256").update(`${salt}:${email}:${code}`).digest("hex");
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<{ email: string; code: string }>;
  const email = body.email?.trim().toLowerCase();
  const code = body.code?.trim();
  if (!email || !code) {
    return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
  }

  const db = getDb();
  const user = db.prepare("SELECT id, email, role FROM users WHERE email = ?").get(email) as
    | { id: number; email: string; role: string }
    | undefined;
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  const row = db
    .prepare(
      `
      SELECT id, codeHash, expiresAt, usedAt, attempts
      FROM otp_codes
      WHERE email = ?
      ORDER BY id DESC
      LIMIT 1
    `,
    )
    .get(email) as
    | { id: number; codeHash: string; expiresAt: number; usedAt: number | null; attempts: number }
    | undefined;

  if (!row) return NextResponse.json({ error: "No OTP requested" }, { status: 400 });
  if (row.usedAt) return NextResponse.json({ error: "OTP already used" }, { status: 400 });
  if (row.expiresAt < Date.now()) return NextResponse.json({ error: "OTP expired" }, { status: 400 });
  if (row.attempts >= 5) return NextResponse.json({ error: "Too many attempts" }, { status: 429 });

  const expected = row.codeHash;
  const got = hashOtp(email, code);

  if (got !== expected) {
    db.prepare("UPDATE otp_codes SET attempts = attempts + 1 WHERE id = ?").run(row.id);
    return NextResponse.json({ error: "Invalid code" }, { status: 401 });
  }

  db.prepare("UPDATE otp_codes SET usedAt = ? WHERE id = ?").run(Date.now(), row.id);

  const token = await signAdminToken({ role: "admin", uid: user.id, email: user.email });
  const jar = await cookies();
  jar.set(ADMIN_TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true });
}

