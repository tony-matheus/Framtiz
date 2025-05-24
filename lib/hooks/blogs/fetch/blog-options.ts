import { Blog } from '@/lib/services/blog-service';
import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';

export type PaginatedBlogResponse = {
  blogs: Blog[];
  totalPages: number;
};

export async function fetchBlogs({
  title,
  page,
  limit,
}: {
  title?: string;
  page: number;
  limit: number;
}): Promise<PaginatedBlogResponse> {
  const { data, headers } = await axios.get<Blog[]>('/api/admin/blogs', {
    params: { title, page, limit },
  });

  return { blogs: data, totalPages: headers['x-total-pages'] };
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
  queryOptions<PaginatedBlogResponse, Error, PaginatedBlogResponse>({
    queryKey: ['blogs', title ?? '', page],
    queryFn: () => fetchBlogs({ title, page, limit }),
    placeholderData: (prev) => prev,
    staleTime: 60_000,
  });
