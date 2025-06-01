'use client';

import { useEffect } from 'react';
import { Save, Minimize2, FileText } from 'lucide-react';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberSwitch } from '@/components/ui-custom/cyber-switch';
import { Label } from '@/components/ui/label';
import ReactMarkdown from 'react-markdown';
import CyberInput from '@/components/ui-custom/cyber-input';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
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
    <div className='fixed inset-0 z-50 flex flex-col bg-slate-950'>
      {/* Header */}
      <div className='flex items-center justify-between border-b border-slate-800 bg-slate-900 p-4'>
        <div className='flex items-center gap-4'>
          <h2 className='flex items-center font-mono text-xl font-bold text-slate-200 '>
            <FileText className='mr-2 text-purple-400' size={20} />
            <span>EDITOR</span>
          </h2>
          <div className='hidden items-center gap-2 md:flex'>
            <CyberInput
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-34'
              placeholder='Enter blog title...'
            />
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center space-x-2'>
            <Label
              htmlFor='fs-status'
              className='hidden font-mono text-sm text-slate-400 md:block'
            >
              ACTIVE_STATUS
            </Label>
            <div className='flex items-center gap-2'>
              <CyberSwitch
                id='fs-status'
                checked={published}
                onCheckedChange={setPublished}
              />
              <span className='font-mono text-sm text-slate-300'>
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
              disabled={!title.trim()}
            >
              <span className='md:mr-2'>
                <Save size={16} />
              </span>
              <span className='hidden md:inline-flex'>SAVE_BLOG</span>
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

      <ResizablePanelGroup direction={isMobile ? 'vertical' : 'horizontal'}>
        <ResizablePanel defaultSize={50}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='hidden size-full resize-none border-0 bg-slate-800 p-4 font-mono text-slate-200 focus:outline-none md:inline-block'
            placeholder='Write your blog post in Markdown...'
          />

          <CyberCard
            withCornerAccents={false}
            className='block h-full overflow-auto rounded-none border-0 md:hidden'
          >
            <CyberCardContent className='prose prose-invert max-w-none p-6'>
              {content ? (
                <ReactMarkdown>{content}</ReactMarkdown>
              ) : (
                <div className='italic text-slate-500'>
                  No content to preview
                </div>
              )}
            </CyberCardContent>
          </CyberCard>
        </ResizablePanel>

        <ResizableHandle
          withHandle
          className='w-1 bg-gradient-to-b from-purple-600 to-green-400 '
        />

        <ResizablePanel defaultSize={50}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='inline-block size-full resize-none border-0 bg-slate-800 p-4 font-mono text-slate-200 focus:outline-none md:hidden'
            placeholder='Write your blog post in Markdown...'
          />
          <CyberCard
            withCornerAccents={false}
            className='hidden h-full overflow-auto rounded-none border-0  md:block'
          >
            <CyberCardContent className='prose prose-invert max-w-none p-6'>
              {content ? (
                <ReactMarkdown>{content}</ReactMarkdown>
              ) : (
                <div className='italic text-slate-500'>
                  No content to preview
                </div>
              )}
            </CyberCardContent>
          </CyberCard>
        </ResizablePanel>
      </ResizablePanelGroup>
      {/* Keyboard shortcuts info */}
      <div className='absolute bottom-4 right-4 hidden rounded border border-slate-800 bg-slate-900/80 p-2 text-xs text-slate-500 md:block'>
        <div className='font-mono'>KEYBOARD_SHORTCUTS:</div>
        <div className='mt-1 flex gap-4'>
          <span>ESC - Exit Full Screen</span>
          <span>Ctrl+S - Save</span>
        </div>
      </div>

      {/* Decorative elements */}
      <div className='absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-purple-600 to-transparent'></div>
      <div className='absolute bottom-0 right-0 h-1 w-full bg-gradient-to-l from-green-400 to-transparent'></div>
      <div className='absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-600 to-transparent'></div>
      <div className='absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent to-green-400'></div>
    </div>
  );
}
