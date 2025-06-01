import type { ReactNode } from 'react';

import { redirect } from 'next/navigation';
import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import { getQueryClient } from '@/lib/helpers/get-query-client';
import { projectQueryOptions } from '@/hooks/projects/fetch/project-options';
import ReactQueryProvider from '@/lib/contexts/react-query-provider';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function ProjectsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await serverAuthService.getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    projectQueryOptions({
      page: 1,
      title: '',
      limit: 2,
    })
  );

  return (
    <ReactQueryProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </ReactQueryProvider>
  );
}
