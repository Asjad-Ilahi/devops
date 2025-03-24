"use server"

import { z } from "zod"
import { createProject, getProjectsByUserId } from "@/lib/models/project"
import { getCurrentUser } from "@/lib/jwt"

// Define validation schema
const projectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.enum(["Just Started", "In Progress", "On Track", "At Risk", "Completed"]),
  progress: z.number().min(0).max(100),
  dueDate: z.string().transform((str) => new Date(str)),
  tags: z.array(z.string()).default([]),
})

export async function addProject(prevState: any, formData: FormData) {
  try {
    // Get user from JWT token
    const user = getCurrentUser()
    if (!user) {
      return {
        success: false,
        message: "You must be logged in to create a project",
      }
    }

    // Validate form data
    const validatedFields = projectSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      status: formData.get("status"),
      progress: Number(formData.get("progress")),
      dueDate: formData.get("dueDate"),
      tags: formData.getAll("tags").map((tag) => tag.toString()),
    })

    if (!validatedFields.success) {
      return {
        success: false,
        message: validatedFields.error.errors[0].message,
      }
    }

    const projectData = validatedFields.data

    // Create new project
    await createProject({
      ...projectData,
      members: 1, // Default to 1 member (the creator)
      userId: user.id,
    })

    return {
      success: true,
      message: "Project created successfully!",
    }
  } catch (error) {
    console.error("Project creation error:", error)
    return {
      success: false,
      message: "An error occurred while creating the project. Please try again.",
    }
  }
}

export async function getUserProjects() {
  try {
    // Get user from JWT token
    const user = getCurrentUser()
    if (!user) {
      return []
    }

    // Get projects for user
    const projects = await getProjectsByUserId(user.id)

    return projects
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

