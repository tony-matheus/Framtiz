'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DropZoneProps {
  onFileDrop: (files: FileList) => void;
  disabled?: boolean;
}

export default function DropZone({
  onFileDrop,
  disabled = false,
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;

    // Only set dragging to false if we're leaving the drop zone
    // and not entering a child element
    if (
      dropZoneRef.current &&
      !dropZoneRef.current.contains(e.relatedTarget as Node)
    ) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileDrop(e.dataTransfer.files);
    }
  };

  // Global drag event handlers to show/hide the drop zone
  useEffect(() => {
    const handleGlobalDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (disabled) return;

      // Check if the dragged items contain files
      if (e.dataTransfer?.types.includes('Files')) {
        setIsVisible(true);
      }
    };

    const handleGlobalDragLeave = (e: DragEvent) => {
      if (disabled) return;

      // Only hide if we're leaving the window
      if (
        e.clientX <= 0 ||
        e.clientY <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        setIsVisible(false);
        setIsDragging(false);
      }
    };

    const handleGlobalDrop = () => {
      if (disabled) return;
      setIsVisible(false);
      setIsDragging(false);
    };

    window.addEventListener('dragover', handleGlobalDragOver);
    window.addEventListener('dragleave', handleGlobalDragLeave);
    window.addEventListener('drop', handleGlobalDrop);

    return () => {
      window.removeEventListener('dragover', handleGlobalDragOver);
      window.removeEventListener('dragleave', handleGlobalDragLeave);
      window.removeEventListener('drop', handleGlobalDrop);
    };
  }, [disabled]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4'
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <motion.div
          ref={dropZoneRef}
          initial={{ scale: 0.9 }}
          animate={{
            scale: isDragging ? 1.05 : 1,
            borderColor: isDragging ? '#8b5cf6' : '#334155',
          }}
          className={`w-full max-w-2xl h-64 border-2 border-dashed rounded-none flex flex-col items-center justify-center gap-4 ${
            isDragging ? 'bg-slate-800/50' : 'bg-slate-900/50'
          }`}
        >
          <div className='relative'>
            <Upload
              size={48}
              className={`${isDragging ? 'text-purple-400' : 'text-slate-400'}`}
            />
            {isDragging && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className='absolute -top-1 -right-1 bg-green-400 text-slate-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold'
              >
                +
              </motion.div>
            )}
          </div>
          <div className='text-center'>
            <h3 className='text-lg font-mono text-slate-200 mb-1'>
              {isDragging ? 'DROP_TO_UPLOAD' : 'DRAG_FILES_HERE'}
            </h3>
            <p className='text-sm text-slate-400 max-w-md'>
              Drop images or videos to upload and insert them into your content
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className='absolute top-4 right-4 text-slate-400 hover:text-slate-200'
          >
            <X size={24} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
