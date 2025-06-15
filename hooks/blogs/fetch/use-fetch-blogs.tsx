'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { blogQueryOptions } from './blog-options';
import { Blog } from '@/lib/services/blog-service/helpers';
export type UseFetchBlogsResult = {
  blogs: Blog[];
  currentPage: number;
  totalPages: number;
  isError: boolean;
  isLoading: boolean;
  loadNextPage: () => void;
  loadPreviousPage: () => void;
  goToPage: (page: number) => void;
};

export interface UseFetchBlogsProps {
  title?: string;
  initialPage?: number;
  limit?: number;
}

export const useFetchBlogs = ({
  title,
  initialPage = 1,
  limit = 10,
}: UseFetchBlogsProps): UseFetchBlogsResult => {
  const [page, setPage] = useState(initialPage);

  const { data, isPending, isError } = useQuery(
    blogQueryOptions({ title, page, limit })
  );

  return {
    blogs: data?.blogs ?? [],
    currentPage: page,
    totalPages: data?.totalPages ?? 0,
    isLoading: isPending,
    isError: isError,
    goToPage: (p: number) => setPage((prev) => (p !== prev ? p : prev)),
    loadNextPage: () => setPage((prev) => prev + 1),
    loadPreviousPage: () => setPage((prev) => (prev > 1 ? prev - 1 : prev)),
  };
};
