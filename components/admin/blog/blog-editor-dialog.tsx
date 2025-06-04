'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { Save, X, FileText, Maximize2, Sparkles } from 'lucide-react';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { CyberSwitch } from '@/components/ui-custom/cyber-switch';
import { Label } from '@/components/ui/label';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import FullScreenEditor from './full-screen-editor';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useCreateBlog } from '@/hooks/blogs/mutations/use-create-blog';
import { Blog } from '@/lib/services/blog-service';
import { useUpdateBlog } from '@/hooks/blogs/mutations/use-update-blog';
import BlogContentEditor from './blog-content-editor';
import CyberInput from '@/components/ui-custom/cyber-input';
import { CyberErrorState } from '@/components/ui-custom/cyber-error-state';
import { cn } from '@/lib/utils';
import { useGenerateBlogContent } from '@/hooks/blogs/mutations/use-generate-content';
import { Separator } from '@/components/ui/separator';

interface BlogEditorDialogProps {
  isOpen: boolean;
  onOpenChange: (arg0: boolean) => void;
  onSave: (arg0: Blog) => void;
  blog?: Blog | null;
}

export default function BlogEditorDialog({
  isOpen,
  onOpenChange,
  onSave,
  blog,
}: BlogEditorDialogProps) {
  const [title, setTitle] = useState(blog?.title || '');
  const [content, setContent] = useState(blog?.content || '');
  const [excerpt, setExcerpt] = useState(blog?.excerpt || '');
  const [readTime, setReadTime] = useState<number | null>(null);
  const [published, setPublished] = useState(blog?.published ?? false);
  const [isMaximized, setIsMaximized] = useState(false);

  const {
    mutateAsync: createBlog,
    isPending: isCreating,
    isError: isErrorCreating,
  } = useCreateBlog();

  const {
    mutateAsync: updateBlog,
    isPending: isUpdating,
    isError: isErrorUpdating,
  } = useUpdateBlog();

  const { mutateAsync: generateData, isPending: isGenerating } =
    useGenerateBlogContent();

  const handleClick = async () => {
    try {
      const { data } = await generateData(content);

      console.log();
      setReadTime(data.read_time);
      setExcerpt(data.excerpt);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateBlog = async () => {
    const savedBlog = await createBlog({
      title,
      content,
      published: published,
    });

    onSave?.(savedBlog);
  };

  const handleUpdateBlog = async () => {
    if (!blog) return;

    const savedBlog = await updateBlog({
      id: blog?.id,
      title,
      content,
      published: published,
    });

    onSave?.(savedBlog);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  useEffect(() => {
    setTitle(blog?.title || '');
    setContent(blog?.content || '');
    setPublished(blog?.published ?? false);
  }, [blog]);

  if (isErrorCreating || isErrorUpdating) {
    return <CyberErrorState />;
  }

  if (isMaximized) {
    return (
      <FullScreenEditor
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        published={published}
        setPublished={setPublished}
        onSave={blog ? handleUpdateBlog : handleCreateBlog}
        onClose={() => setIsMaximized(false)}
        isSaving={isCreating || isUpdating}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        showDismiss={false}
        className='mx-auto max-h-[90dvh] max-w-[100vw] overflow-y-auto border-2 border-slate-800 bg-slate-900 p-0 text-slate-200 sm:min-w-[80vw] sm:max-w-[90vw]'
      >
        {/* Header */}
        <DialogHeader>
          <div className='z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900 p-4'>
            <DialogTitle className='flex items-center font-mono text-xl font-bold text-slate-200'>
              <FileText className='mr-2 text-purple-400' size={20} />
              <span>{blog ? 'EDIT_BLOG' : 'CREATE_BLOG'}</span>
            </DialogTitle>
            <div className='flex items-center gap-2'>
              <CyberButton
                variant='outline'
                size='icon'
                onClick={toggleMaximize}
                title='Maximize Editor'
              >
                <Maximize2 size={18} />
              </CyberButton>
              <CyberButton
                variant='outline'
                size='icon'
                onClick={() => onOpenChange(false)}
              >
                <X size={18} />
              </CyberButton>
            </div>
          </div>
        </DialogHeader>

        {/* Content - scrollable area */}
        <div className='flex-1 overflow-y-auto p-4'>
          <div className='space-y-4'>
            <div className='flex flex-col gap-2 md:flex-row md:items-center'>
              <CyberInput
                id='title'
                type='text'
                label='BLOG_TITLE'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter blog title...'
              />
              <div className='w-[164] shrink-0'>
                <Label htmlFor='status' className='mb-2 block'>
                  ACTIVE_STATUS
                </Label>
                <div className='flex items-center gap-2'>
                  <CyberSwitch
                    id='status'
                    size='compact'
                    checked={published}
                    onCheckedChange={setPublished}
                  />
                  <span className='font-mono text-sm text-slate-300'>
                    {published ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </div>
              </div>
            </div>
            <BlogContentEditor content={content} onContentChange={setContent} />
            <Separator className='h-[1] bg-gradient-to-r from-purple-500 to-green-400' />
            <div className='flex items-center justify-between'>
              <p className='font-mono text-xs'>
                Generate the following with AI
              </p>

              <CyberButton
                onClick={handleClick}
                disabled={isGenerating}
                size='sm'
                className={cn(isGenerating ? 'ripple-loop' : '')}
              >
                <Sparkles
                  className={cn('ml-2', isGenerating ? 'animate-shine' : false)}
                />
                Generate with AI
              </CyberButton>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-12 md:gap-2'>
              <div className='col-span-8'>
                <Label htmlFor='excerpt' className='mb-2 block'>
                  EXCERPT
                </Label>
                <textarea
                  id='excerpt'
                  value={isGenerating ? '' : excerpt}
                  name='content'
                  disabled={isGenerating}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className='h-[100px] w-full resize-none border border-slate-700 bg-slate-800 p-4 font-mono text-slate-200 outline-none transition-colors focus:border-purple-600'
                  placeholder={
                    isGenerating ? 'Generating' : 'Write a short description'
                  }
                />
              </div>
              <div className='col-span-4 mt-2 md:mt-0'>
                <CyberInput
                  id='title'
                  type='string'
                  label='READ_TIME'
                  value={`${readTime} min`}
                  // onChange={(e) => setTitle(e.target.value)}
                  placeholder='Read Time'
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className='flex flex-row justify-end gap-3 border-t border-slate-800 bg-slate-900 p-4 '>
          <CyberButton variant='outline' onClick={() => onOpenChange(false)}>
            CANCEL
          </CyberButton>
          <CyberButton
            variant='secondary'
            onClick={blog ? handleUpdateBlog : handleCreateBlog}
            isLoading={isCreating || isUpdating}
            loadingText='SAVING...'
            leftIcon={<Save size={16} />}
            disabled={!title.trim()}
          >
            SAVE_BLOG
          </CyberButton>

          {/* Add inline keyframe animations */}
          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes scaleIn {
              from {
                transform: translate(-50%, -50%) scale(0.95);
                opacity: 0;
              }
              to {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
              }
            }
          `}</style>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
