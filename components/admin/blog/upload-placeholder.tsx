'use client';

import { motion } from 'framer-motion';
import { Loader2, AlertCircle, FileType } from 'lucide-react';
import { formatFileSize } from '@/lib/services/storage/upload-service';

interface UploadPlaceholderProps {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'error' | 'success';
  progress?: number;
  error?: string;
}

export default function UploadPlaceholder({
  id,
  name,
  size,
  status,
  progress = 0,
  error,
}: UploadPlaceholderProps) {
  return (
    <div
      id={`upload-${id}`}
      className='my-4 rounded-none border border-dashed bg-slate-800/50 p-3 text-sm'
      style={{
        borderColor:
          status === 'uploading'
            ? '#8b5cf6'
            : status === 'error'
            ? '#ef4444'
            : '#10b981',
      }}
    >
      <div className='flex items-center gap-3'>
        {status === 'uploading' ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          >
            <Loader2 size={18} className='text-purple-400' />
          </motion.div>
        ) : status === 'error' ? (
          <AlertCircle size={18} className='text-red-400' />
        ) : (
          <FileType size={18} className='text-green-400' />
        )}

        <div className='flex-1 overflow-hidden'>
          <div className='truncate font-mono text-xs'>{name}</div>
          <div className='text-xs text-slate-400'>{formatFileSize(size)}</div>
        </div>

        {status === 'uploading' && (
          <div className='font-mono text-xs text-purple-400'>{progress}%</div>
        )}
      </div>

      {status === 'uploading' && (
        <div className='mt-2 h-1 w-full bg-slate-700'>
          <div
            className='h-full bg-purple-600 transition-all duration-300'
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {status === 'error' && error && (
        <div className='mt-2 text-xs text-red-400'>{error}</div>
      )}
    </div>
  );
}
