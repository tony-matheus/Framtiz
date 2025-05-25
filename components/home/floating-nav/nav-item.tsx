import Link from 'next/link';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface NavItemsProps {
  href: string;
  icon: ReactNode;
  label: string;
  status: 'ACTIVE' | 'WARNING' | 'INACTIVE';
  className?: string;
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
}: NavItemsProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ x: 5 }}
      whileTap={
        status !== 'INACTIVE' ? { scale: 0.98 } : { x: [0, -5, 5, -5, 5, 0] }
      }
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <NavLinkWrapper
        href={href}
        status={status}
        className='group flex cursor-pointer items-center justify-between border border-slate-800 p-3 transition-colors hover:border-purple-600 hover:bg-slate-800/50'
      >
        <div className='flex items-center'>
          <span className='mr-3 text-purple-400 transition-colors group-hover:text-green-400'>
            {icon}
          </span>
          <span className='font-mono text-sm text-slate-300'>{label}</span>
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
