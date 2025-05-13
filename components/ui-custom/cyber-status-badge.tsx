import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CyberStatusBadgeProps {
  status: 'online' | 'offline' | 'warning' | 'error' | 'success' | 'pending';
  label?: string;
  className?: string;
  withDot?: boolean;
  children?: ReactNode;
}

export function CyberStatusBadge({
  status,
  label,
  className,
  withDot = true,
  children,
}: CyberStatusBadgeProps) {
  const statusConfig = {
    online: { color: 'text-green-400', bg: 'bg-green-400' },
    offline: { color: 'text-slate-400', bg: 'bg-slate-400' },
    warning: { color: 'text-yellow-400', bg: 'bg-yellow-400' },
    error: { color: 'text-red-400', bg: 'bg-red-400' },
    success: { color: 'text-green-400', bg: 'bg-green-400' },
    pending: { color: 'text-purple-400', bg: 'bg-purple-400' },
  };

  const { color, bg } = statusConfig[status];

  return (
    <Badge
      variant='outline'
      className={cn(
        'font-mono text-xs border-slate-700 bg-slate-800/50 flex items-center gap-2',
        color,
        className
      )}
    >
      {withDot && (
        <span
          className={cn(
            'w-2 h-2 rounded-full',
            bg,
            status === 'online' && 'animate-pulse'
          )}
        ></span>
      )}
      {label || children || status.toUpperCase()}
    </Badge>
  );
}
