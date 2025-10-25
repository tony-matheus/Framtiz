'use client';

import type React from 'react';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../ui/button';

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
            className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm'
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, type: 'spring', damping: 20 }}
            className='fixed inset-4 z-50 flex flex-col border-2 border-slate-800 bg-slate-900'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative elements */}
            <div className='absolute -left-1 -top-1 size-3 bg-purple-600'></div>
            <div className='absolute -bottom-1 -right-1 size-3 bg-green-400'></div>
            <div className='absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-purple-600 to-transparent'></div>
            <div className='absolute bottom-0 right-0 h-1 w-full bg-gradient-to-l from-green-400 to-transparent'></div>

            {/* Header */}
            <div className='z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900 p-4'>
              <h2 className='flex items-center font-mono text-xl font-bold text-slate-200'>
                <div className='mr-2 size-2 animate-pulse bg-green-400'></div>
                {title}
              </h2>
              <Button variant='outline' size='icon' onClick={onClose}>
                <X size={18} />
              </Button>
            </div>

            {/* Content - scrollable area */}
            <div className='custom-scrollbar flex-1 overflow-y-auto p-4'>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
