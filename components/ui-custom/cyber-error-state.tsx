'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { CyberButton } from './cyber-button';
import { motion } from 'framer-motion';

interface CyberErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function CyberErrorState({
  title = 'SYSTEM_ERROR',
  message = 'An error occurred while fetching data. Please try again.',
  onRetry,
  className,
}: CyberErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative border-2 border-red-900 bg-slate-900 p-6 ${className}`}
    >
      {/* Decorative elements */}
      <div className='absolute -left-1 -top-1 size-3 bg-red-600'></div>
      <div className='absolute -bottom-1 -right-1 size-3 bg-red-600'></div>

      <div className='flex flex-col items-center text-center'>
        <div className='mb-4 flex size-16 items-center justify-center border-2 border-red-600 bg-red-900/30'>
          <AlertTriangle className='text-red-400' size={32} />
        </div>

        <h3 className='mb-2 font-mono text-xl font-bold text-red-400'>
          {title}
        </h3>
        <p className='mb-6 max-w-md text-slate-300'>{message}</p>

        {onRetry && (
          <CyberButton
            variant='destructive'
            onClick={onRetry}
            leftIcon={<RefreshCw size={16} />}
          >
            RETRY_CONNECTION
          </CyberButton>
        )}
      </div>

      {/* Glitch effect */}
      <div className='pointer-events-none absolute inset-0 bg-red-900/5'></div>
      <div className='absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-red-600 to-transparent'></div>
      <div className='absolute bottom-0 right-0 h-1 w-full bg-gradient-to-l from-red-600 to-transparent'></div>
    </motion.div>
  );
}
