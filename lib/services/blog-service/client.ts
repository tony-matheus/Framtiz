import { getSupabaseClient } from '../../supabase/client';
import { Blog, getAllBlogs, GetAllBlogsOptions } from './helpers';

export const clientBlogService = {
  async getAll(
    options: GetAllBlogsOptions = {}
  ): Promise<{ blogs: Blog[]; totalPages: number }> {
    const supabase = getSupabaseClient();

    return await getAllBlogs(supabase, options);
  },
};
