import type React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface CyberSkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export function CyberSkeleton({ className, children }: CyberSkeletonProps) {
  return (
    <div
      className={cn(
        'relative bg-slate-900 border-2 border-slate-800 overflow-hidden',
        className
      )}
    >
      {/* Decorative elements */}
      <div className='absolute -left-1 -top-1 size-3 bg-purple-600/50'></div>
      <div className='absolute -bottom-1 -right-1 size-3 bg-green-400/50'></div>

      {/* Pulse animation overlay */}
      <div className='absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-slate-800/10 to-transparent'></div>

      {children}
    </div>
  );
}

export function CyberCardSkeleton() {
  return (
    <CyberSkeleton className='h-full'>
      {/* Image skeleton */}
      <Skeleton className='h-40 w-full bg-slate-800/50 sm:h-56' />

      {/* Content skeleton */}
      <div className='p-3 sm:p-6'>
        {/* Title */}
        <div className='mb-3 flex items-start justify-between'>
          <Skeleton className='h-6 w-32 bg-slate-800/70' />
          <div className='flex gap-2'>
            <Skeleton className='size-7 bg-slate-800/70' />
            <Skeleton className='size-7 bg-slate-800/70' />
          </div>
        </div>

        {/* Status */}
        <div className='mb-3'>
          <Skeleton className='mb-1 h-4 w-16 bg-slate-800/70' />
          <div className='flex items-center'>
            <Skeleton className='h-5 w-24 bg-slate-800/70' />
          </div>
        </div>

        {/* Description */}
        <Skeleton className='mb-2 h-4 w-full bg-slate-800/70' />
        <Skeleton className='mb-2 h-4 w-5/6 bg-slate-800/70' />
        <Skeleton className='mb-3 h-4 w-4/6 bg-slate-800/70' />

        {/* Tags */}
        <div className='mb-4 flex flex-wrap gap-2'>
          <Skeleton className='h-6 w-16 bg-slate-800/70' />
          <Skeleton className='h-6 w-20 bg-slate-800/70' />
        </div>

        {/* Footer */}
        <div className='flex items-center justify-between border-t border-slate-800 pt-2'>
          <Skeleton className='h-4 w-24 bg-slate-800/70' />
          <Skeleton className='h-4 w-16 bg-slate-800/70' />
        </div>
      </div>
    </CyberSkeleton>
  );
}
