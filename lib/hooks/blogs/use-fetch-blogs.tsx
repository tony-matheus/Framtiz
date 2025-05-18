import { useState } from 'react';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { Blog } from '@/lib/services/blog-service';

type PaginatedBlogResponse = {
  blogs: Blog[];
  totalPages: number;
};

async function fetchBlogs({
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

  console.log({ data });

  return { blogs: data, totalPages: headers['x-total-pages'] };
}

type UseFetchBlogsResult = {
  data: Blog[];
  currentPage: number;
  totalPages: number;
  isError: boolean;
  isLoading: boolean;
  loadNextPage: () => void;
  loadPreviousPage: () => void;
  goToPage: (page: number) => void;
};

interface UseFetchBlogsProps
  extends Omit<
    UseQueryOptions<
      PaginatedBlogResponse,
      Error,
      PaginatedBlogResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn' | 'staleTime'
  > {
  title?: string;
  initialPage?: number;
  limit?: number;
}
export const useFetchBlogs = ({
  title,
  initialPage = 1,
  limit = 10,
  ...restProps
}: UseFetchBlogsProps): UseFetchBlogsResult => {
  const [page, setPage] = useState(initialPage);

  const {
    data,
    isError,
    isPending: isLoading,
  } = useQuery<PaginatedBlogResponse>({
    queryKey: ['blogs', { title, page }],
    queryFn: () => fetchBlogs({ title, page, limit }),
    staleTime: 3600,
    ...restProps,
  });

  const loadNextPage = () => {
    if (data?.totalPages && page < data.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const loadPreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const goToPage = (targetPage: number) => {
    if (
      targetPage >= 1 &&
      (!data?.totalPages || targetPage <= data.totalPages)
    ) {
      setPage(targetPage);
    }
  };

  return {
    data: data?.blogs ?? [],
    currentPage: page,
    totalPages: data?.totalPages ?? 0,
    isError,
    isLoading,
    loadNextPage,
    loadPreviousPage,
    goToPage,
  };
};
