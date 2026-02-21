import { SupabaseClient } from "@supabase/supabase-js"

export type Blog = {
  id: number
  title: string
  content?: string | null
  published?: boolean
  created_at?: string | null
  excerpt?: string | null
  read_time?: number
  updated_at?: string | null
  image_url?: string | null
  type?: "blog" | "gist" | undefined
}

export interface GetAllBlogsOptions {
  title?: string
  page?: number
  limit?: number
  published?: boolean | null
  type?: "blog" | "gist" | undefined | null
}

export const getAllBlogs = async (
  supabaseClient: SupabaseClient,
  { title, published, page = 1, limit = 10, type }: GetAllBlogsOptions,
): Promise<{ blogs: Blog[]; totalPages: number }> => {
  let query = supabaseClient
    .from("blogs")
    .select("*", { count: "exact" })
    .eq("is_about", false)

  if (type) {
    query = query.eq("type", type)
  }

  if (title) {
    query = query.ilike("title", `%${title}%`)
  }

  if (published !== null && published !== undefined) {
    query = query.eq("published", published)
  }

  const from = (page - 1) * limit
  const to = from + limit - 1

  query = query.range(from, to)

  const { data, count, error } = await query.order("created_at", {
    ascending: false,
  })

  if (error) {
    throw new Error(`Error fetching blogs: ${error.message || error.details}`)
  }

  const totalPages = Math.ceil((count || 1) / limit)

  return {
    blogs: data as Blog[],
    totalPages,
  }
}
