import { clientBlogService } from '@/lib/services/blog-service/client';
import { Blog } from '@/lib/services/blog-service/helpers';
import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import axios from 'axios';

export type PaginatedBlogResponse = {
  blogs: Blog[];
  totalPages: number;
};

export async function fetchBlogs({
  title,
  page,
  limit,
  simpleResponse = false,
}: {
  title?: string;
  page: number;
  limit: number;
  simpleResponse?: boolean;
}): Promise<PaginatedBlogResponse> {
  const { data, headers } = await axios.get<Blog[]>('/api/admin/blogs', {
    params: { title, page, limit, simple_response: simpleResponse },
  });

  return { blogs: data, totalPages: Number(headers['x-total-pages']) };
}

export async function fetchPublicBlogs({
  title,
  page,
  limit,
  simpleResponse = false,
}: {
  title?: string;
  page: number;
  limit: number;
  simpleResponse?: boolean;
}) {
  const { blogs, totalPages } = await clientBlogService.getAll({
    title,
    page,
    limit,
  });

  return {
    blogs: simpleResponse
      ? blogs.map(({ id, title, excerpt, read_time }) => ({
          id,
          title,
          excerpt,
          read_time,
        }))
      : blogs,
    totalPages,
  };
}

export const blogQueryOptions = ({
  title,
  page,
  limit = 10,
}: {
  title?: string;
  page: number;
  limit?: number;
}) =>
  queryOptions({
    queryKey: ['blogs', title ?? '', page],
    queryFn: () => fetchBlogs({ title, page, limit }),
    placeholderData: keepPreviousData,
    // staleTime: 60_000,
  });

export const publicBlogQueryOptions = ({
  title,
  page,
  limit = 10,
}: {
  title?: string;
  page: number;
  limit?: number;
}) =>
  queryOptions({
    queryKey: ['blogs_supabase', title ?? '', page],
    queryFn: () => fetchPublicBlogs({ title, page, limit }),
    placeholderData: keepPreviousData,
    // staleTime: 60_000,
  });
