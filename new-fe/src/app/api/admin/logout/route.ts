import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_TOKEN_COOKIE } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST() {
  const jar = await cookies();
  jar.set(ADMIN_TOKEN_COOKIE, "", { path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}

