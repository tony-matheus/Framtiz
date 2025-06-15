import { BlogInput } from '../../schemas/blog-schemas';

import { createServerSupabaseClient } from '../../supabase/server';
import { Blog, getAllBlogs, GetAllBlogsOptions } from './helpers';

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
      throw new Error(`Error fetching blog: ${error.message || error.details}`);
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
