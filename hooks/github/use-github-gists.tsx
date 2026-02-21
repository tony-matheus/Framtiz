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
  { enabled = true } = {},
): UseGithubGistsResult => {
  const [page, setPage] = useState<number>(initialPage)

  const { data, isError, isPending } = useQuery<GistRequestOutput>({
    queryKey: ["github-gists", page],
    queryFn: () => fetchGitHubGists({ page, limit }),
    staleTime: 60,
    retry: false,
    enabled,
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

const fetchGitHubGist = async (gistId: string): Promise<GithubGist> => {
  const response = await fetch(`/api/github/gists/${gistId}`)
  return response.json()
}

type UseGithubGistResult = {
  data: GithubGist | undefined
  isError: boolean
  isPending: boolean
}

export const useGithubGist = (
  gistId: string,
  { enabled = true } = {},
): UseGithubGistResult => {
  const { data, isError, isFetching } = useQuery<GithubGist>({
    queryKey: ["github-gist", gistId],
    queryFn: () => fetchGitHubGist(gistId),
    enabled,
  })

  return { data, isError, isPending: isFetching }
}
