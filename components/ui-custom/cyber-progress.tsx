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

const STATUS_COLOR = {
  default: {
    bg: 'bg-purple-600',
    text: 'text-purple-600',
  },
  success: {
    bg: 'bg-green-400',
    text: 'text-green-400',
  },
  warning: {
    bg: 'bg-yellow-400',
    text: 'text-yellow-400',
  },
  danger: {
    bg: 'bg-red-500',
    text: 'text-red-500',
  },
};

const SIZE_CLASSES = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

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

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className='mb-1 flex items-center justify-between text-xs text-slate-400'>
          {label && <span className='font-mono'>{label}</span>}
          {showValue && (
            <span className={cn('font-mono', STATUS_COLOR[status].text)}>
              {value}%
            </span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-slate-700 mt-2', SIZE_CLASSES[size])}>
        <div
          className={cn(
            'h-full transition-all duration-300',
            STATUS_COLOR[status].bg,
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
