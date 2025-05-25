'use client';

import { cn } from '@/lib/utils';
import CyberHeading from '../ui-custom/cyber-heading';
import { Skeleton } from '../ui/skeleton';

interface AdminHeaderProps {
  title?: string;
  indicator?: 'purple' | 'green';
  loading?: boolean;
}

export default function AdminHeader({
  indicator = 'green',
  title = 'ADMIN_TERMINAL',
  loading = false,
}: AdminHeaderProps) {
  return (
    <div
      className={cn(
        'border-l-4 pl-4',
        indicator === 'purple' ? 'border-purple-600' : 'border-green-400'
      )}
    >
      {loading ? (
        <Skeleton className='h-40 w-full bg-slate-800/50 sm:h-56' />
      ) : (
        <CyberHeading as='h2'>{title}</CyberHeading>
      )}
    </div>
  );
}
