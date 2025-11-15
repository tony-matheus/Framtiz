import { createServerSupabaseClient } from "../supabase/server"
import { getSupabaseClient } from "../supabase/client"
import { SupabaseClient } from "@supabase/supabase-js"

export type Project = {
  id: number
  title: string
  slug: string
  description?: string
  tech_stack: string[]
  github_url: string
  live_url?: string
  image_url?: string
  status?: string
  featured?: boolean
  created_at?: string
  updated_at?: string
}

interface GetAllProjectsOptions {
  title?: string
  page?: number
  limit?: number
}

const getAllProjects = async (
  supabaseClient: SupabaseClient,
  { title, page = 1, limit = 10 }: GetAllProjectsOptions,
): Promise<{ projects: Project[]; totalPages: number }> => {
  let query = supabaseClient.from("projects").select("*", { count: "exact" })

  if (title) {
    query = query.ilike("title", `%${title}%`)
  }

  const from = (page - 1) * limit
  const to = from + limit - 1

  query = query.range(from, to)

  const { data, count, error } = await query.order("created_at", {
    ascending: false,
  })

  if (error) {
    throw new Error(
      `Error fetching projects: ${error.message || error.details}`,
    )
  }

  const totalPages = Math.ceil((count || 1) / limit)

  return { projects: data as Project[], totalPages }
}

export type ProjectInput = Omit<Project, "id" | "created_at" | "updated_at">

// Server-side functions
export const serverProjectService = {
  async getAllProjects(
    options: GetAllProjectsOptions = {},
  ): Promise<{ projects: Project[]; totalPages: number }> {
    const supabase = await createServerSupabaseClient()

    return await getAllProjects(supabase, options)
  },

  async getFeaturedProjects(): Promise<Project[]> {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching featured projects:", error)
      return []
    }

    return data as Project[]
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single()

    if (error) {
      console.error(`Error fetching project with slug ${slug}:`, error)
      return null
    }

    return data as Project
  },
}

// Client-side functions
export const clientProjectService = {
  async createProject(project: ProjectInput): Promise<Project | null> {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("projects")
      .insert({
        ...project,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating project:", error)
      return null
    }

    return data as Project
  },

  async updateProject(
    id: number,
    project: Partial<ProjectInput>,
  ): Promise<Project | null> {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from("projects")
      .update({
        ...project,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error(`Error updating project with id ${id}:`, error)
      return null
    }

    return data as Project
  },

  async deleteProject(id: number): Promise<boolean> {
    const supabase = getSupabaseClient()
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
      console.error(`Error deleting project with id ${id}:`, error)
      return false
    }

    return true
  },

  async getAllProjects(
    options: GetAllProjectsOptions = {},
  ): Promise<{ projects: Project[]; totalPages: number }> {
    const supabase = getSupabaseClient()

    return await getAllProjects(supabase, options)
  },
}
