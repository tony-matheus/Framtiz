import { useState } from 'react';
import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';

type PaginatedResult<T> = {
  items: T[];
  totalPages: number;
};

interface UseBasicPaginationQueryOptions<T>
  extends Omit<
    UseQueryOptions<PaginatedResult<T>, unknown, PaginatedResult<T>, QueryKey>,
    'queryKey' | 'queryFn'
  > {
  queryKey: QueryKey;
  queryFn: (params: {
    page: number;
    limit: number;
  }) => Promise<PaginatedResult<T>>;
  initialPage?: number;
  limit?: number;
}

type UseBasicPaginationQueryResult<T> = {
  data: T[];
  currentPage: number;
  totalPages: number;
  isFetching: boolean;
  isError: boolean;
  loadNextPage: () => void;
  loadPreviousPage: () => void;
  goToPage: (page: number) => void;
};

export function useBasicPaginationQuery<T>({
  queryKey,
  queryFn,
  initialPage = 1,
  limit = 10,
  ...queryOptions
}: UseBasicPaginationQueryOptions<T>): UseBasicPaginationQueryResult<T> {
  const [page, setPage] = useState(initialPage);

  const { data, isFetching, isError } = useQuery({
    queryKey: [...queryKey, page],
    queryFn: () => queryFn({ page, limit }),
    staleTime: 1000 * 60,
    ...queryOptions,
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
    data: data?.items ?? [],
    currentPage: page,
    totalPages: data?.totalPages ?? 0,
    isFetching,
    isError,
    loadNextPage,
    loadPreviousPage,
    goToPage,
  };
}
