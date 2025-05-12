import { Zap } from 'lucide-react';
import clsx from 'clsx';

interface PowerStatusProps {
  percentage: number;
  status: 'low' | 'medium' | 'high';
}

const COLOR_CLASSES = {
  high: {
    text: 'text-green-400',
    bg: 'bg-green-400',
  },
  medium: {
    text: 'text-yellow-400',
    bg: 'bg-yellow-400',
  },
  low: {
    text: 'text-red-400',
    bg: 'bg-red-400',
  },
} as const;

export default function PowerStatus({ percentage, status }: PowerStatusProps) {
  const { text, bg } = COLOR_CLASSES[status];

  return (
    <div className='border-t border-slate-800 p-3 flex items-center justify-between'>
      <div className='flex items-center'>
        <Zap size={14} className={clsx(text, 'mr-2')} />
        <div className='text-xs text-slate-300 font-mono'>POWER</div>
      </div>
      <div className='w-24 h-2 bg-slate-800'>
        <div
          className={clsx('h-full transition-all', bg)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className={clsx('text-xs font-mono', text)}>{percentage}%</div>
    </div>
  );
}
