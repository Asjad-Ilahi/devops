import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"
const JWT_EXPIRES_IN = "7d"

export interface JwtPayload {
  id: string
  username: string
  name: string
  iat?: number
  exp?: number
}

export function signJwtToken(payload: Omit<JwtPayload, "iat" | "exp">): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyJwtToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch (error) {
    return null
  }
}

export function getJwtTokenFromCookies(): string | undefined {
  return cookies().get("token")?.value
}

export function getCurrentUser(): JwtPayload | null {
  const token = getJwtTokenFromCookies()
  if (!token) return null
  return verifyJwtToken(token)
}

export function setAuthCookie(token: string): void {
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })
}

export function clearAuthCookie(): void {
  cookies().delete("token")
}