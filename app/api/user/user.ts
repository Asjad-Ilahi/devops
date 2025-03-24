import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/jwt"
import { findUserById } from "@/lib/models/user"

export async function GET() {
  try {
    const user = getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user from database (without password)
    const dbUser = await findUserById(user.id)

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Return user data without password
    const { password, ...userData } = dbUser

    return NextResponse.json(userData)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}