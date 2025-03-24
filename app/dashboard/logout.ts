"use server"

import { redirect } from "next/navigation"
import { clearAuthCookie } from "@/lib/jwt"

export async function logout() {
  clearAuthCookie()
  redirect("/")
}

