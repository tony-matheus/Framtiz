"use client"

import { useState } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { experienceQueryOptions } from "./experience-options"
import {
  UseFetchExperiencesProps,
  UseFetchExperiencesResult,
} from "./use-fetch-experiences"

export const useSuspenseFetchExperiences = ({
  title = "",
  initialPage = 1,
  limit = 50,
}: UseFetchExperiencesProps): UseFetchExperiencesResult => {
  const [page, setPage] = useState(initialPage)

  const { data, isPending, isError } = useSuspenseQuery(
    experienceQueryOptions({ page, title, limit }),
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
