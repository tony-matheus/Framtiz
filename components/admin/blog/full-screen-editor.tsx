'use client';

import { useState, useEffect, useRef } from 'react';
import { Save, Minimize2, FileText } from 'lucide-react';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberSwitch } from '@/components/ui-custom/cyber-switch';
import { Label } from '@/components/ui/label';
import ReactMarkdown from 'react-markdown';

interface FullScreenEditorProps {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  published: boolean;
  setPublished: (published: boolean) => void;
  onSave: () => void;
  onClose: () => void;
  isSaving: boolean;
}

export default function FullScreenEditor({
  title,
  setTitle,
  content,
  setContent,
  published,
  setPublished,
  onSave,
  onClose,
  isSaving,
}: FullScreenEditorProps) {
  const [splitPosition, setSplitPosition] = useState(50); // Default to 50% split
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  // Handle mouse events for resizing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !container) return;

      const containerRect = container.getBoundingClientRect();
      const newPosition =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      // Limit the position between 20% and 80%
      const limitedPosition = Math.max(20, Math.min(80, newPosition));
      setSplitPosition(limitedPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key to exit full-screen mode
      if (e.key === 'Escape') {
        onClose();
      }

      // Ctrl+S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        onSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onSave]);

  return (
    <div className='fixed inset-0 z-50 bg-slate-950 flex flex-col'>
      {/* Header */}
      <div className='flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900'>
        <div className='flex items-center gap-4'>
          <h2 className='text-xl font-bold text-slate-200 font-mono flex items-center'>
            <FileText className='mr-2 text-purple-400' size={20} />
            <span>FULL_SCREEN_EDITOR</span>
          </h2>
          <div className='flex items-center gap-2'>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='bg-slate-800 border shadow-inner shadow-slate-700 p-2 text-slate-200 focus:shadow-purple-600 outline-none transition-colors w-64'
              placeholder='Enter blog title...'
            />
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center space-x-2'>
            <Label
              htmlFor='fs-status'
              className='text-slate-400 text-sm font-mono'
            >
              ACTIVE_STATUS
            </Label>
            <div className='flex items-center gap-2'>
              <CyberSwitch
                id='fs-status'
                checked={published}
                onCheckedChange={setPublished}
              />
              <span className='text-sm text-slate-300 font-mono'>
                {published ? 'PUBLISHED' : 'DRAFT'}
              </span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <CyberButton
              variant='secondary'
              onClick={onSave}
              isLoading={isSaving}
              loadingText='SAVING...'
              leftIcon={<Save size={16} />}
              disabled={!title.trim()}
            >
              SAVE_BLOG
            </CyberButton>
            <CyberButton
              variant='outline'
              size='icon'
              onClick={onClose}
              title='Exit Full Screen'
            >
              <Minimize2 size={18} />
            </CyberButton>
          </div>
        </div>
      </div>

      {/* Split-pane layout */}
      <div ref={containerRef} className='flex flex-1 overflow-hidden relative'>
        {/* Editor pane */}
        <div
          className='h-full overflow-auto bg-slate-900 border-r border-slate-800'
          style={{ width: `${splitPosition}%` }}
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='w-full h-full bg-slate-800 border-0 p-4 text-slate-200 focus:outline-none font-mono resize-none'
            placeholder='Write your blog post in Markdown...'
          />
        </div>

        {/* Resizable divider */}
        <div
          ref={dividerRef}
          className={`w-1 h-full bg-slate-700 cursor-col-resize hover:bg-purple-600 active:bg-purple-600 ${
            isDragging ? 'bg-purple-600' : ''
          }`}
          onMouseDown={() => setIsDragging(true)}
        >
          <div className='absolute top-1/2 left-0 transform -translate-y-1/2 w-5 h-10 bg-slate-700 hover:bg-purple-600 flex items-center justify-center rounded-sm'>
            <div className='w-0.5 h-4 bg-slate-500 mx-0.5'></div>
            <div className='w-0.5 h-4 bg-slate-500 mx-0.5'></div>
          </div>
        </div>

        {/* Preview pane */}
        <div
          className='h-full overflow-auto'
          style={{ width: `${100 - splitPosition}%` }}
        >
          <CyberCard
            withCornerAccents={false}
            className='h-full rounded-none border-0'
          >
            <CyberCardContent className='prose prose-invert max-w-none p-6'>
              {content ? (
                <ReactMarkdown>{content}</ReactMarkdown>
              ) : (
                <div className='text-slate-500 italic'>
                  No content to preview
                </div>
              )}
            </CyberCardContent>
          </CyberCard>
        </div>
      </div>

      {/* Keyboard shortcuts info */}
      <div className='absolute bottom-4 left-4 text-xs text-slate-500 bg-slate-900/80 p-2 rounded border border-slate-800'>
        <div className='font-mono'>KEYBOARD_SHORTCUTS:</div>
        <div className='flex gap-4 mt-1'>
          <span>ESC - Exit Full Screen</span>
          <span>Ctrl+S - Save</span>
        </div>
      </div>

      {/* Decorative elements */}
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-transparent'></div>
      <div className='absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-green-400 to-transparent'></div>
      <div className='absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-600 to-transparent'></div>
      <div className='absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent to-green-400'></div>
    </div>
  );
}
