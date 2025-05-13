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
      <div className='absolute -top-1 -left-1 w-3 h-3 bg-purple-600/50'></div>
      <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-400/50'></div>

      {/* Pulse animation overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/10 to-transparent animate-pulse'></div>

      {children}
    </div>
  );
}

export function CyberCardSkeleton() {
  return (
    <CyberSkeleton className='h-full'>
      {/* Image skeleton */}
      <Skeleton className='h-40 sm:h-56 w-full bg-slate-800/50' />

      {/* Content skeleton */}
      <div className='p-3 sm:p-6'>
        {/* Title */}
        <div className='flex justify-between items-start mb-3'>
          <Skeleton className='h-6 w-32 bg-slate-800/70' />
          <div className='flex gap-2'>
            <Skeleton className='h-7 w-7 bg-slate-800/70' />
            <Skeleton className='h-7 w-7 bg-slate-800/70' />
          </div>
        </div>

        {/* Status */}
        <div className='mb-3'>
          <Skeleton className='h-4 w-16 mb-1 bg-slate-800/70' />
          <div className='flex items-center'>
            <Skeleton className='h-5 w-24 bg-slate-800/70' />
          </div>
        </div>

        {/* Description */}
        <Skeleton className='h-4 w-full mb-2 bg-slate-800/70' />
        <Skeleton className='h-4 w-5/6 mb-2 bg-slate-800/70' />
        <Skeleton className='h-4 w-4/6 mb-3 bg-slate-800/70' />

        {/* Tags */}
        <div className='flex flex-wrap gap-2 mb-4'>
          <Skeleton className='h-6 w-16 bg-slate-800/70' />
          <Skeleton className='h-6 w-20 bg-slate-800/70' />
        </div>

        {/* Footer */}
        <div className='flex justify-between items-center pt-2 border-t border-slate-800'>
          <Skeleton className='h-4 w-24 bg-slate-800/70' />
          <Skeleton className='h-4 w-16 bg-slate-800/70' />
        </div>
      </div>
    </CyberSkeleton>
  );
}
