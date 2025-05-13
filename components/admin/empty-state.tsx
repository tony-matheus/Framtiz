'use client';

import type React from 'react';

import { motion } from 'framer-motion';
import { FolderOpen, Plus } from 'lucide-react';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberButton } from '@/components/ui-custom/cyber-button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = 'NO_DATA_FOUND',
  description = 'There are no items to display at this time.',
  icon = <FolderOpen size={48} />,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CyberCard>
        <CyberCardContent className='p-8 flex flex-col items-center justify-center text-center'>
          <div className='w-16 h-16 bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 text-slate-400'>
            {icon}
          </div>
          <h3 className='text-lg font-mono text-slate-200 mb-2'>{title}</h3>
          <p className='text-slate-400 max-w-md mb-6'>{description}</p>

          {actionLabel && onAction && (
            <CyberButton
              variant='primary'
              onClick={onAction}
              leftIcon={<Plus size={16} />}
            >
              {actionLabel}
            </CyberButton>
          )}
        </CyberCardContent>
      </CyberCard>
    </motion.div>
  );
}
