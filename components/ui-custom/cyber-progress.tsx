import { cn } from '@/lib/utils';

interface CyberProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  status?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
  barClassName?: string;
}

export function CyberProgress({
  value,
  max = 100,
  label,
  showValue = false,
  size = 'md',
  status = 'default',
  className,
  barClassName,
}: CyberProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const statusColors = {
    default: 'bg-purple-600',
    success: 'bg-green-400',
    warning: 'bg-yellow-400',
    danger: 'bg-red-400',
  };

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className='flex justify-between items-center mb-1 text-xs text-slate-400'>
          {label && <span className='font-mono'>{label}</span>}
          {showValue && <span className='font-mono'>{value}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-slate-700', sizeClasses[size])}>
        <div
          className={cn(
            'h-full transition-all duration-300',
            statusColors[status],
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
