import { z } from "zod"

export const ProjectInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  github_url: z
    .string()
    .url("Invalid GitHub URL format")
    .min(1, "GitHub URL is required"),
})

export type ProjectInput = z.infer<typeof ProjectInputSchema>
