'use client';

import { cn } from '@/lib/utils';
import CyberHeading from '../ui-custom/cyber-heading';

interface AdminHeaderProps {
  title?: string;
  indicator?: 'purple' | 'green';
}

export default function AdminHeader({
  indicator = 'green',
  title = 'ADMIN_TERMINAL',
}: AdminHeaderProps) {
  return (
    <div
      className={cn(
        'border-l-4 pl-4',
        indicator === 'purple' ? 'border-purple-600' : 'border-green-400'
      )}
    >
      <CyberHeading as='h2'>{title}</CyberHeading>
    </div>
  );
}
