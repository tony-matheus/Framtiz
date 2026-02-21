import { z } from "zod"

export type User = {
  id: string
  email: string
  username?: string
  fullName?: string
  avatarUrl?: string
  isAdmin: boolean
  githubUsername?: string
  profileId: number
}

export type SignUpData = {
  email: string
  password: string
  username: string
  fullName?: string
}

export const LoginInputSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
})

export type LoginInput = z.infer<typeof LoginInputSchema>
