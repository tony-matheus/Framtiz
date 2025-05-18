import { BlogInput } from '../schemas/blog-schemas';
import { createServerSupabaseClient } from '../supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';

export type Blog = {
  id: number;
  title: string;
  content?: string;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
};

interface GetAllBlogsOptions {
  title?: string;
  page?: number;
  limit?: number;
}

const getAllBlogs = async (
  supabaseClient: SupabaseClient,
  { title, page = 1, limit = 10 }: GetAllBlogsOptions
): Promise<{ blogs: Blog[]; totalPages: number }> => {
  let query = supabaseClient.from('blogs').select('*', { count: 'exact' });

  if (title) {
    query = query.ilike('title', `%${title}%`);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  console.log({ from, to });
  query = query.range(from, to);

  const { data, count, error } = await query.order('created_at', {
    ascending: false,
  });

  if (error) {
    throw new Error(`Error fetching blogs: ${error.message || error.details}`);
  }

  const totalPages = Math.ceil((count || 1) / limit);
  console.log({ limit, count, totalPages });

  return { blogs: data as Blog[], totalPages };
};

export const serverBlogService = {
  async getAllBlogs(
    options: GetAllBlogsOptions = {}
  ): Promise<{ blogs: Blog[]; totalPages: number }> {
    const supabase = await createServerSupabaseClient();

    return await getAllBlogs(supabase, options);
  },

  async getBlog(id: number): Promise<Blog> {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from('blogs')
      .select()
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Error creating blog: ${error.message || error.details}`);
    }

    return data as Blog;
  },

  async createBlog(blog: BlogInput): Promise<Blog> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('blogs')
      .insert({
        ...blog,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      throw new Error(`${error.message || error.details}`);
    }

    return data as Blog;
  },

  async updateBlog(id: number, blog: Partial<BlogInput>): Promise<Blog> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('blogs')
      .update({ ...blog, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(
        `Error updating blog with id ${id}: ${error.message || error.details}`
      );
    }

    return data as Blog;
  },

  async deleteBlog(id: number): Promise<boolean> {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from('blogs').delete().eq('id', id);

    if (error) {
      throw new Error(
        `Error deleting blog with id ${id}: ${error.message || error.details}`
      );
    }

    return true;
  },
};

export const clientBlogService = {
  async getAllBlos(
    options: GetAllBlogsOptions
  ): Promise<{ blogs: Blog[]; totalPages: number }> {
    const supabase = await createServerSupabaseClient();

    return getAllBlogs(supabase, options);
  },
};
