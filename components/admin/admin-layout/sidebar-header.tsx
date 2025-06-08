'use client';

import CyberHeading from '@/components/ui-custom/cyber-heading';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from './constants';

interface SidebarHeaderProps {
  indicator?: 'purple' | 'green';
  loading?: boolean;
}

export default function SidebarHeader({
  indicator = 'green',
  loading = false,
}: SidebarHeaderProps) {
  const pathname = usePathname();

  const pageTitle = NAV_ITEMS.find(
    (item) => pathname === item.href || pathname.startsWith(item.href)
  )?.label;

  return (
    <header
      className={cn(
        'h-(--header-height) group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) flex shrink-0 items-center gap-2 border-b border-purple-500 transition-[width,height] ease-linear mb-4',
        // REMOVE THIS
        'pb-4'
      )}
    >
      <div className='flex w-full items-center gap-1 lg:gap-2 '>
        <SidebarTrigger className='-ml-1' />
        <div
          className={cn(
            'border-l-4 pl-4',
            indicator === 'purple' ? 'border-purple-600' : 'border-green-400'
          )}
        >
          {loading ? (
            <Skeleton className='h-20 w-full bg-slate-800/50 sm:h-56' />
          ) : (
            <CyberHeading as='h4'>{pageTitle}</CyberHeading>
          )}
        </div>
      </div>
    </header>
  );
}
