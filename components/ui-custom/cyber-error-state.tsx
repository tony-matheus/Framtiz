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
      className={`bg-slate-900 border-2 border-red-900 p-6 relative ${className}`}
    >
      {/* Decorative elements */}
      <div className='absolute -top-1 -left-1 w-3 h-3 bg-red-600'></div>
      <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-red-600'></div>

      <div className='flex flex-col items-center text-center'>
        <div className='w-16 h-16 bg-red-900/30 border-2 border-red-600 flex items-center justify-center mb-4'>
          <AlertTriangle className='text-red-400' size={32} />
        </div>

        <h3 className='text-xl font-bold text-red-400 font-mono mb-2'>
          {title}
        </h3>
        <p className='text-slate-300 mb-6 max-w-md'>{message}</p>

        {onRetry && (
          <CyberButton
            variant='danger'
            onClick={onRetry}
            leftIcon={<RefreshCw size={16} />}
          >
            RETRY_CONNECTION
          </CyberButton>
        )}
      </div>

      {/* Glitch effect */}
      <div className='absolute inset-0 bg-red-900/5 pointer-events-none'></div>
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent'></div>
      <div className='absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-red-600 to-transparent'></div>
    </motion.div>
  );
}
