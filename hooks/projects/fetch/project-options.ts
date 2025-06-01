import { Project } from '@/lib/services/project-service';
import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import axios from 'axios';

export type PaginatedResponse<T> = {
  items: T[];
  totalPages: number;
};

export async function fetchProjects({
  title,
  page,
  limit,
}: {
  title?: string;
  page: number;
  limit: number;
}): Promise<PaginatedResponse<Project>> {
  const { data, headers } = await axios.get<Project[]>('/api/admin/projects', {
    params: { title, page, limit },
  });

  return { items: data, totalPages: Number(headers['x-total-pages']) };
}

export const projectQueryOptions = ({
  title,
  page,
  limit = 10,
}: {
  title?: string;
  page: number;
  limit?: number;
}) =>
  queryOptions({
    queryKey: ['projects', title ?? '', page],
    queryFn: () => fetchProjects({ title, page, limit }),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
