import FloatingNav from '@/components/home/floating-nav/floating-nav';
import Footer from '@/components/home/footer';
import { blogQueryOptions } from '@/hooks/blogs/fetch/blog-options';
import ReactQueryProvider from '@/lib/contexts/react-query-provider';
import { getQueryClient } from '@/lib/helpers/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
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
        <div className='min-h-screen bg-slate-950 text-slate-50'>
          <div className='container relative z-10 mx-auto px-4 py-8'>
            {children}
          </div>
          <Footer />
          <FloatingNav />
        </div>
      </HydrationBoundary>
    </ReactQueryProvider>
  );
}
