'use client';

import type React from 'react';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyberButton } from '../cyber-button';

interface CyberFullScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function CyberFullScreenModal({
  isOpen,
  onClose,
  title,
  children,
}: CyberFullScreenModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50'
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, type: 'spring', damping: 20 }}
            className='fixed inset-4 z-50 bg-slate-900 border-2 border-slate-800 flex flex-col cyber-modal'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative elements */}
            <div className='absolute -top-1 -left-1 w-3 h-3 bg-purple-600'></div>
            <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-400'></div>
            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-transparent'></div>
            <div className='absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-green-400 to-transparent'></div>

            {/* Header */}
            <div className='flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900 z-10'>
              <h2 className='text-xl font-bold text-slate-200 font-mono flex items-center'>
                <div className='w-2 h-2 bg-green-400 mr-2 animate-pulse'></div>
                {title}
              </h2>
              <CyberButton variant='outline' size='icon' onClick={onClose}>
                <X size={18} />
              </CyberButton>
            </div>

            {/* Content - scrollable area */}
            <div className='p-4 flex-1 overflow-y-auto custom-scrollbar'>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
