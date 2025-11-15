"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { projectQueryOptions } from "./project-options"
import { Project } from "@/lib/services/project-service"

export type UseFetchProjectsResult = {
  projects: Project[]
  currentPage: number
  totalPages: number
  isError: boolean
  isLoading: boolean
  loadNextPage: () => void
  loadPreviousPage: () => void
  goToPage: (page: number) => void
}

export interface UseFetchProjectsProps {
  title?: string
  initialPage?: number
  limit?: number
}

export const useFetchBlogs = ({
  title,
  initialPage = 1,
  limit = 10,
}: UseFetchProjectsProps): UseFetchProjectsResult => {
  const [page, setPage] = useState(initialPage)

  const { data, isPending, isError } = useQuery(
    projectQueryOptions({ title, page, limit }),
  )

  return {
    projects: data?.items ?? [],
    currentPage: page,
    totalPages: data?.totalPages ?? 0,
    isLoading: isPending,
    isError: isError,
    goToPage: (p: number) => setPage((prev) => (p !== prev ? p : prev)),
    loadNextPage: () => setPage((prev) => prev + 1),
    loadPreviousPage: () => setPage((prev) => (prev > 1 ? prev - 1 : prev)),
  }
}
