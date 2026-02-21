"use client"

import { useState } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { projectQueryOptions } from "./project-options"
import {
  UseFetchProjectsProps,
  UseFetchProjectsResult,
} from "./use-fetch-projects"

export const useSuspenseFetchProjects = ({
  title,
  initialPage = 1,
  limit = 10,
}: UseFetchProjectsProps): UseFetchProjectsResult => {
  const [page, setPage] = useState(initialPage)

  const { data, isPending, isError } = useSuspenseQuery(
    projectQueryOptions({ title, page, limit }),
  )

  return {
    projects: data?.items ?? [],
    currentPage: page,
    totalPages: Number(data?.totalPages) ?? 0,
    isLoading: isPending,
    isError: isError,
    goToPage: (p: number) => setPage((prev) => (p !== prev ? p : prev)),
    loadNextPage: () => setPage((prev) => prev + 1),
    loadPreviousPage: () => setPage((prev) => (prev > 1 ? prev - 1 : prev)),
  }
}
