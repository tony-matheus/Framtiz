'use client';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { blogQueryOptions } from './blog-options';
import { UseFetchBlogsProps, UseFetchBlogsResult } from './use-fetch-blogs';

export const useSuspenseFetchBlogs = ({
  title,
  initialPage = 1,
  limit = 10,
}: UseFetchBlogsProps): UseFetchBlogsResult => {
  const [page, setPage] = useState(initialPage);

  const { data, isPending, isError } = useSuspenseQuery(
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
