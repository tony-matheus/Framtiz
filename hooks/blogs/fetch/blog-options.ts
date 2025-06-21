import { clientBlogService } from '@/lib/services/blog-service/client';
import { Blog } from '@/lib/services/blog-service/helpers';
import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import axios from 'axios';

export type PaginatedBlogResponse = {
  blogs: Blog[];
  totalPages: number;
};

export type FetchBlogsProps = {
  title?: string;
  page: number;
  limit?: number;
  published?: boolean | null;
};

export type SimpleResponseBlogProps = {
  simpleResponse?: boolean;
} & FetchBlogsProps;

export async function fetchBlogs({
  title,
  page,
  limit,
  published = null,
  simpleResponse = false,
}: SimpleResponseBlogProps): Promise<PaginatedBlogResponse> {
  const { data, headers } = await axios.get<Blog[]>('/api/admin/blogs', {
    params: { title, page, limit, published, simple_response: simpleResponse },
  });

  return { blogs: data, totalPages: Number(headers['x-total-pages']) };
}

export async function fetchPublicBlogs({
  title,
  page,
  limit,
  published = null,
  simpleResponse = false,
}: SimpleResponseBlogProps) {
  const { blogs, totalPages } = await clientBlogService.getAll({
    title,
    page,
    limit,
    published,
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
  published = null,
}: FetchBlogsProps) =>
  queryOptions({
    queryKey: ['blogs', title ?? '', page],
    queryFn: () => fetchBlogs({ title, page, limit, published }),
    placeholderData: keepPreviousData,
  });

export const publicBlogQueryOptions = ({
  title,
  page,
  limit = 10,
  published = null,
}: FetchBlogsProps) =>
  queryOptions({
    queryKey: ['blogs_supabase', title ?? '', page],
    queryFn: () => fetchPublicBlogs({ title, page, limit, published }),
    placeholderData: keepPreviousData,
  });
