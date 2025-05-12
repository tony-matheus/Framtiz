import Link from 'next/link';
import { ReactNode } from 'react';

interface NavItemsProps {
  href: string;
  icon: ReactNode;
  label: string;
  status: string;
  errorType?: 'success' | 'warning' | 'error';
}

const COLOR_MAP = {
  success: 'green-400',
  warning: 'yellow-400',
  error: 'red-400',
};

export default function NavItem({
  href,
  icon,
  label,
  status,
  errorType = 'success',
}: NavItemsProps) {
  return (
    <Link
      href={href}
      className='flex items-center justify-between p-3 border border-slate-800 hover:border-purple-600 hover:bg-slate-800/50 transition-colors group'
    >
      <div className='flex items-center'>
        <span className='text-purple-400 mr-3 group-hover:text-green-400 transition-colors'>
          {icon}
        </span>
        <span className='text-slate-300 font-mono text-sm'>{label}</span>
      </div>
      <div className='flex items-center'>
        <span className={`w-1 h-1 bg-${COLOR_MAP[errorType]} mr-1`}></span>
        <span className={`text-xs text-${COLOR_MAP[errorType]} font-mono`}>
          {errorType !== 'success' ? 'Error' : status}
        </span>
      </div>
    </Link>
  );
}
