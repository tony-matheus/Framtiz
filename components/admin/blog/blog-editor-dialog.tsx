'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { Save, X, FileText, Maximize2 } from 'lucide-react';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { CyberSwitch } from '@/components/ui-custom/cyber-switch';
import { Label } from '@/components/ui/label';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import FullScreenEditor from './full-screen-editor';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useCreateBlog } from '@/lib/hooks/blogs/use-create-blog';
import { Blog } from '@/lib/services/blog-service';
import { useUpdateBlog } from '@/lib/hooks/blogs/use-update-blog';
import BlogContentEditor from './blog-content-editor';
import CyberInput from '@/components/ui-custom/cyber-input';
import { CyberErrorState } from '@/components/ui-custom/cyber-error-state';

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
        className='bg-slate-900 border-2 border-slate-800 text-slate-200 p-0 max-w-md mx-auto min-w-full sm:min-w-[80vw]'
      >
        {/* Header */}
        <DialogHeader>
          <div className='flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900 z-10'>
            <DialogTitle className='text-xl font-bold text-slate-200 font-mono flex items-center'>
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
        <div className='p-4 flex-1 overflow-y-auto'>
          <div className='space-y-6'>
            <CyberInput
              id='title'
              type='text'
              label='BLOG_TITLE'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter blog title...'
            />
            <div className='flex items-center space-x-4'>
              <Label
                htmlFor='status'
                className='text-slate-400 text-sm font-mono'
              >
                ACTIVE_STATUS
              </Label>
              <div className='flex items-center gap-2'>
                <CyberSwitch
                  id='status'
                  checked={published}
                  onCheckedChange={setPublished}
                />
                <span className='text-sm text-slate-300 font-mono'>
                  {published ? 'PUBLISHED' : 'DRAFT'}
                </span>
              </div>
            </div>
            <BlogContentEditor content={content} onContentChange={setContent} />
          </div>
        </div>

        {/* Footer */}
        <div className='flex justify-end gap-3 p-4 border-t border-slate-800 bg-slate-900'>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
