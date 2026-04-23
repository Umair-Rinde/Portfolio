import { SignJWT, jwtVerify } from "jose";

export const ADMIN_TOKEN_COOKIE = "admin_token";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET");
  return new TextEncoder().encode(secret);
}

export type AdminJwtPayload = {
  role: "admin";
  uid: number;
  email: string;
};

export async function signAdminToken(payload: AdminJwtPayload) {
  const secret = getSecret();
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAdminToken(token: string) {
  const secret = getSecret();
  const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
  return payload;
}

