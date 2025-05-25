import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  indicator?: 'purple' | 'green';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  children?: ReactNode;
}

export function SectionHeader({
  title,
  subtitle,
  indicator = 'green',
  className,
  titleClassName,
  subtitleClassName,
  children,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'border-l-4 pl-4',
        indicator === 'purple' ? 'border-purple-600' : 'border-green-400',
        className
      )}
    >
      <div className='mb-2 flex items-center'>
        <div
          className={cn(
            'w-2 h-2 mr-2',
            indicator === 'purple' ? 'bg-green-400' : 'bg-purple-400'
          )}
        ></div>
        <div
          className={cn(
            'text-sm font-mono',
            indicator === 'purple' ? 'text-green-400' : 'text-purple-400'
          )}
        >
          {children}
        </div>
      </div>
      <h2
        className={cn(
          'text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-green-400 bg-clip-text text-transparent',
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('text-slate-300 max-w-3xl', subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
