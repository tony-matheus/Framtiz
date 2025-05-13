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
        className='flex items-center justify-between p-3 border border-slate-800 hover:border-purple-600 hover:bg-slate-800/50 transition-colors group cursor-pointer'
      >
        <div className='flex items-center'>
          <span className='text-purple-400 mr-3 group-hover:text-green-400 transition-colors'>
            {icon}
          </span>
          <span className='text-slate-300 font-mono text-sm'>{label}</span>
        </div>
        <div className='flex items-center'>
          <span
            className={`w-1 h-1 mr-1 ${COLOR_MAP[status].split(' ')[1]}`}
          ></span>
          <span
            className={`text-xs font-mono ${COLOR_MAP[status].split(' ')[0]}`}
          >
            {status}
          </span>
        </div>
      </NavLinkWrapper>
    </motion.div>
  );
}
