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
        <CyberCardContent className='flex flex-col items-center justify-center p-8 text-center'>
          <div className='mb-4 flex size-16 items-center justify-center border border-slate-700 bg-slate-800 text-slate-400'>
            {icon}
          </div>
          <h3 className='mb-2 font-mono text-lg text-slate-200'>{title}</h3>
          <p className='mb-6 max-w-md text-slate-400'>{description}</p>

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
