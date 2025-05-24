import type { ReactNode } from 'react';

import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import { redirect } from 'next/navigation';
import { getQueryClient } from '@/lib/helpers/get-query-client';

import ReactQueryProvider from '@/lib/contexts/react-query-provider';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { blogQueryOptions } from '@/lib/hooks/blogs/fetch/blog-options';

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await serverAuthService.getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    blogQueryOptions({
      page: 1,
      title: '',
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
