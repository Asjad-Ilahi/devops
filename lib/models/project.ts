import { ObjectId } from "mongodb"
import clientPromise from "../mongodb"

export interface Project {
  _id?: ObjectId
  name: string
  description: string
  status: "Just Started" | "In Progress" | "On Track" | "At Risk" | "Completed"
  progress: number
  dueDate: Date
  tags: string[]
  members: number
  userId: string
  createdAt: Date
  updatedAt: Date
}

export async function createProject(projectData: Omit<Project, "_id" | "createdAt" | "updatedAt">) {
  const client = await clientPromise
  const db = client.db()

  const now = new Date()

  const result = await db.collection("projects").insertOne({
    ...projectData,
    createdAt: now,
    updatedAt: now,
  })

  return result
}

export async function getProjectsByUserId(userId: string) {
  const client = await clientPromise
  const db = client.db()

  return db.collection("projects").find({ userId }).sort({ createdAt: -1 }).toArray()
}

export async function getProjectById(id: string, userId: string) {
  const client = await clientPromise
  const db = client.db()

  return db.collection("projects").findOne({ _id: new ObjectId(id), userId })
}

export async function updateProject(id: string, userId: string, updateData: Partial<Project>) {
  const client = await clientPromise
  const db = client.db()

  const now = new Date()

  const result = await db.collection("projects").updateOne(
    { _id: new ObjectId(id), userId },
    {
      $set: {
        ...updateData,
        updatedAt: now,
      },
    },
  )

  return result
}

export async function deleteProject(id: string, userId: string) {
  const client = await clientPromise
  const db = client.db()

  const result = await db.collection("projects").deleteOne({
    _id: new ObjectId(id),
    userId,
  })

  return result
}

