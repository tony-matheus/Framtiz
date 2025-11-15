import { Experience } from "@/lib/schemas/experience-schemas"
import { keepPreviousData, queryOptions } from "@tanstack/react-query"
import axios from "axios"

export type PaginatedBlogResponse = {
  experiences: Experience[]
  totalPages: number
}

export async function fetchExperiences({
  title,
  page,
  limit,
}: {
  title?: string
  page: number
  limit: number
}): Promise<PaginatedBlogResponse> {
  const { data, headers } = await axios.get<Experience[]>(
    "/api/admin/experiences",
    {
      params: { title, page, limit },
    },
  )

  return { experiences: data, totalPages: Number(headers["x-total-pages"]) }
}

export const experienceQueryOptions = ({
  title = "",
  page = 1,
  limit = 50,
}: {
  title?: string
  page: number
  limit?: number
}) =>
  queryOptions({
    queryKey: ["experiences", page, limit, title],
    queryFn: () => fetchExperiences({ title, page, limit }),
    placeholderData: keepPreviousData,
    retry: 3,
    // staleTime: 60_000,
    // enabled: false,
  })
