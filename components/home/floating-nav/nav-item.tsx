import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface NavItemsProps {
  href: string;
  icon: ReactNode;
  label: string;
  status: 'ACTIVE' | 'WARNING' | 'INACTIVE';
  className?: string;
  selected?: boolean;
}

const COLOR_MAP = {
  ACTIVE: 'text-green-400 bg-green-400',
  WARNING: 'text-yellow-400 bg-yellow-400',
  INACTIVE: 'text-red-400 bg-red-400',
};

interface NavLinkWrapperProps {
  href: string;
  status: 'ACTIVE' | 'WARNING' | 'INACTIVE';
  children: ReactNode;
  className?: string;
}

function NavLinkWrapper({
  href,
  status,
  children,
  className = '',
}: NavLinkWrapperProps) {
  if (status === 'INACTIVE') {
    return <div className={`cursor-default ${className}`}>{children}</div>;
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function NavItem({
  href,
  icon,
  label,
  status = 'ACTIVE',
  className = '',
  selected = false,
}: NavItemsProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ x: 5 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <NavLinkWrapper
        href={href}
        status={status}
        className={cn(
          'group flex cursor-pointer items-center justify-between border  p-3 transition-colors border-slate-800',
          selected
            ? 'bg-purple-800 text-slate-300 hover:text-green-400 font-bold hover:border-green-400 '
            : 'text-slate-300 hover:bg-slate-800/50 hover:text-green-400  hover:border-purple-600 '
        )}
      >
        <div className='flex items-center'>
          <span className='mr-3 transition-colors'>{icon}</span>
          <span className='font-mono text-sm'>{label}</span>
        </div>
        <div className='flex items-center'>
          <span
            className={`mr-1 size-1 ${COLOR_MAP[status].split(' ')[1]}`}
          ></span>
          <span
            className={`font-mono text-xs ${COLOR_MAP[status].split(' ')[0]}`}
          >
            {status}
          </span>
        </div>
      </NavLinkWrapper>
    </motion.div>
  );
}
