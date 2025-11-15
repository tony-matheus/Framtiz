"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { experienceQueryOptions } from "./experience-options"
import { Experience } from "@/lib/schemas/experience-schemas"

export type UseFetchExperiencesResult = {
  experiences: Experience[]
  currentPage: number
  totalPages: number
  isError: boolean
  isLoading: boolean
  loadNextPage: () => void
  loadPreviousPage: () => void
  goToPage: (page: number) => void
}

export interface UseFetchExperiencesProps {
  title?: string
  initialPage?: number
  limit?: number
}

export const useFetchExperiences = ({
  title,
  initialPage = 1,
  limit = 50,
}: UseFetchExperiencesProps): UseFetchExperiencesResult => {
  const [page, setPage] = useState(initialPage)

  const { data, isPending, isError } = useQuery(
    experienceQueryOptions({ title, page, limit }),
  )

  return {
    experiences: data?.experiences ?? [],
    currentPage: page,
    totalPages: data?.totalPages ?? 0,
    isLoading: isPending,
    isError: isError,
    goToPage: (p: number) => setPage((prev) => (p !== prev ? p : prev)),
    loadNextPage: () => setPage((prev) => prev + 1),
    loadPreviousPage: () => setPage((prev) => (prev > 1 ? prev - 1 : prev)),
  }
}
