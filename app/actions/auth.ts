"use server";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/user";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

// Define the response type for signup and login
interface AuthResponse {
  success: boolean;
  message?: string;
}

// Signup Action
export async function signup(
  prevState: unknown, // `prevState` is typically unused in server actions but required by Next.js
  formData: FormData
): Promise<AuthResponse> {
  await connectToDatabase();

  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return { success: false, message: "Username already exists" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({ name, username, password: hashedPassword });
    await newUser.save();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server error" };
  }
}

// Login Action
export async function login(
  prevState: unknown, // `prevState` is typically unused in server actions but required by Next.js
  formData: FormData
): Promise<AuthResponse> {
  await connectToDatabase();

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return { success: false, message: "Invalid credentials" };
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "Invalid credentials" };
    }

    // Set session cookie
    cookies().set("session", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server error" };
  }
}