import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import {
  fetchGitHubGists,
  GistRequestOutput,
} from "@/lib/services/github/gists-service"
import { GithubGist } from "@/app/api/github/gists/route"

type UseGithubGistsResult = {
  data: GithubGist[]
  currentPage: number
  totalPages: number
  isError: boolean
  isLoading: boolean
  loadNextPage: () => void
  loadPreviousPage: () => void
  goToPage: (page: number) => void
}

export const useGithubGists = (
  initialPage = 1,
  limit = 10,
): UseGithubGistsResult => {
  const [page, setPage] = useState<number>(initialPage)

  const { data, isError, isPending } = useQuery<GistRequestOutput>({
    queryKey: ["github-gists", page],
    queryFn: () => fetchGitHubGists({ page, limit }),
    staleTime: 60,
  })

  const loadNextPage = () => {
    if (data?.totalPages && page < data.totalPages) {
      setPage((prev) => prev + 1)
    }
  }

  const loadPreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  const goToPage = (targetPage: number) => {
    if (
      targetPage >= 1 &&
      (!data?.totalPages || targetPage <= data.totalPages)
    ) {
      setPage(targetPage)
    }
  }

  return {
    data: data?.gists ?? [],
    currentPage: page,
    totalPages: data?.totalPages ?? 0,
    isError,
    isLoading: isPending,
    loadNextPage,
    loadPreviousPage,
    goToPage,
  }
}
