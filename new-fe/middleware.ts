import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_TOKEN_COOKIE = "admin_token";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

async function isAuthed(req: NextRequest) {
  const token = req.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    return payload?.role === "admin";
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect admin UI.
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const ok = await isAuthed(req);
    if (!ok) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Protect write operations on admin-managed APIs.
  if (
    pathname.startsWith("/api/projects") ||
    pathname.startsWith("/api/skills") ||
    pathname.startsWith("/api/companies") ||
    pathname.startsWith("/api/codesnippet") ||
    pathname.startsWith("/api/upload") ||
    pathname.startsWith("/api/users")
  ) {
    const method = req.method.toUpperCase();
    const isWrite =
      method === "POST" || method === "PUT" || method === "PATCH" || method === "DELETE";
    if (isWrite) {
      const ok = await isAuthed(req);
      if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};

