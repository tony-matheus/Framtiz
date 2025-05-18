import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchGitHubRepos,
  RepoRequestOutput,
} from '../../services/github/repos-service';
import { GithubRepo } from '@/app/api/github/repos/route';

type UseGithubReposResult = {
  data: GithubRepo[];
  currentPage: number;
  totalPages: number;
  isError: boolean;
  isLoading: boolean;
  loadNextPage: () => void;
  loadPreviousPage: () => void;
  goToPage: (page: number) => void;
};

export const useGithubRepos = (
  initialPage = 1,
  limit = 10
): UseGithubReposResult => {
  const [page, setPage] = useState<number>(initialPage);

  const { data, isError, isPending } = useQuery<RepoRequestOutput>({
    queryKey: ['github-repos', page],
    queryFn: () => fetchGitHubRepos({ page, limit }),
    staleTime: 1000 * 60,
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
    data: data?.repos ?? [],
    currentPage: page,
    totalPages: data?.totalPages ?? 0,
    isError,
    isLoading: isPending,
    loadNextPage,
    loadPreviousPage,
    goToPage,
  };
};
