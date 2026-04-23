import { NextResponse } from "next/server";
import { createHash, randomInt } from "crypto";
import { getDb } from "@/lib/sqlite";
import { sendOtpEmail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function hashOtp(email: string, code: string) {
  const salt = process.env.OTP_SALT || "dev-salt";
  return createHash("sha256").update(`${salt}:${email}:${code}`).digest("hex");
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<{ email: string }>;
  const email = body.email?.trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  const db = getDb();
  const user = db.prepare("SELECT id, role FROM users WHERE email = ?").get(email) as
    | { id: number; role: string }
    | undefined;
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const codeHash = hashOtp(email, code);
  const minutesValid = 5;
  const expiresAt = Date.now() + minutesValid * 60 * 1000;

  db.prepare("INSERT INTO otp_codes (email, codeHash, expiresAt) VALUES (?, ?, ?)").run(
    email,
    codeHash,
    expiresAt,
  );

  try {
    await sendOtpEmail({ to: email, code, minutesValid });
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    // In dev, allow returning OTP when SMTP isn't configured.
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({
        ok: true,
        devOtp: code,
        warning: e instanceof Error ? e.message : "Mailer failed",
      });
    }
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}

