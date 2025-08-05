import { Skeleton } from '@/components/ui/skeleton';
import BlogListSkeletonizer from '@/components/admin/blog/blog-list-skeletonizer';

export default async function Loading() {
  return (
    <div>
      <div className='mb-4 flex items-start justify-between gap-4 py-4 md:items-center'>
        <Skeleton className='h-9 flex-1' />
        <Skeleton className='h-9 w-36' />
      </div>

      <div className='mx-auto grid max-w-[90rem] grid-cols-1 gap-6 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        <BlogListSkeletonizer />
      </div>
    </div>
  );
}
