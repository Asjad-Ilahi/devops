import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";

export interface JwtPayload {
  id: string;
  username: string;
  name: string;
  iat?: number;
  exp?: number;
}

export function signJwtToken(payload: Omit<JwtPayload, "iat" | "exp">): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwtToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
}

export async function getJwtTokenFromCookies(): Promise<string | undefined> {
  const cookieStore = cookies();
  return (await cookieStore.get("token"))?.value;
}

export async function getCurrentUser(): Promise<JwtPayload | null> {
  const token = await getJwtTokenFromCookies();
  if (!token) return null;
  return verifyJwtToken(token);
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = cookies();
  await cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = cookies();
  await cookieStore.delete("token");
}
