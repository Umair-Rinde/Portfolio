import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  return NextResponse.json(
    { error: "Use /api/auth/request-otp and /api/auth/verify-otp" },
    { status: 410 },
  );
}

