'use client';

import type React from 'react';

import { useEffect, useRef, useState } from 'react';
import { X, FileText, Maximize2 } from 'lucide-react';
import { CyberButton } from '@/components/ui-custom/cyber-button';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useCreateBlog } from '@/hooks/blogs/mutations/use-create-blog';
import { Blog } from '@/lib/services/blog-service/helpers';
import { useUpdateBlog } from '@/hooks/blogs/mutations/use-update-blog';
import { CyberErrorState } from '@/components/ui-custom/cyber-error-state';
import BlogForm from './blog-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlogInput, BlogInputSchema } from '@/lib/schemas/blog-schemas';
import { CyberFormProvider } from '@/components/ui-custom/cyber-form/cyber-form';
import FullScreenEditor from './full-screen-editor';
import { mergeRight } from 'ramda';
import { useDebouncedCallback } from 'use-debounce';

const STORAGE_KEY = 'BLOG_FORM_STORAGE_KEY';
// sessionStorage.getItem('BLOG_FORM_STORAGE_KEY')

interface BlogEditorDialogProps {
  isOpen: boolean;
  onOpenChange: (arg0: boolean) => void;
  onSave: (arg0: Blog) => void;
  onCancel: () => void;
  blog?: Blog | null;
}

export default function BlogEditorDialog({
  isOpen,
  onOpenChange,
  onSave,
  blog,
  onCancel,
}: BlogEditorDialogProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => setIsMaximized(!isMaximized);

  const debouncedSave = useDebouncedCallback((values: BlogInput) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  }, 500);

  const { subscribe, ...blogForm } = useForm<BlogInput>({
    resolver: zodResolver(BlogInputSchema),
    defaultValues: {
      title: '',
      published: false,
      content: null,
      excerpt: null,
      image_url: null,
      ...blog,
    },
  });
  const unsubscribeRef = useRef<ReturnType<typeof subscribe> | null>(null);

  const lastSubscribedId = useRef<number | 'create'>(null);

  useEffect(() => {
    if (unsubscribeRef.current) return;

    const idToTrack = blog?.id ?? 'create';

    if (lastSubscribedId.current !== idToTrack) {
      lastSubscribedId.current = idToTrack;
      unsubscribeRef.current = subscribe({
        formState: { values: true },
        callback: ({ values }) => debouncedSave(values),
      });
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
        lastSubscribedId.current = null;
      }
    };
  }, [blog?.id, subscribe, debouncedSave]);

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

  const handleCreateBlog = async (blogInput: BlogInput) => {
    const savedBlog = await createBlog(blogInput);

    onSave?.(savedBlog);
  };

  const handleUpdateBlog = async (blogInput: BlogInput) => {
    if (!blog) return;

    const savedBlog = await updateBlog({
      id: blog?.id,
      ...blogInput,
    });

    onSave?.(savedBlog);
  };

  const onSubmit = (blogInput: BlogInput) => {
    sessionStorage.removeItem(STORAGE_KEY);

    if (blog) {
      return handleUpdateBlog(blogInput);
    }

    handleCreateBlog(blogInput);
  };

  const handleCancel = () => {
    blogForm.reset({
      title: ' ',
      published: false,
      content: null,
      excerpt: null,
      image_url: null,
    });
    sessionStorage.removeItem(STORAGE_KEY);

    onOpenChange(false);
    onCancel();
  };

  useEffect(() => {
    if (!isOpen) return;

    const storedData =
      typeof window !== 'undefined'
        ? sessionStorage.getItem(STORAGE_KEY)
        : null;

    const data = storedData ? JSON.parse(storedData) : {};

    const defaults = {
      published: false,
      content: null,
      excerpt: null,
      image_url: null,
    };

    if (blog) {
      const merged =
        data?.id === blog.id
          ? mergeRight(defaults, mergeRight(blog, data))
          : mergeRight(defaults, blog);

      blogForm.reset(merged);
    } else if (!data?.id) {
      blogForm.reset(mergeRight(defaults, data));
    } else {
      blogForm.reset(defaults);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, blog]);

  return (
    <CyberFormProvider {...blogForm} subscribe={subscribe}>
      {isMaximized ? (
        <FullScreenEditor
          form={{ ...blogForm, subscribe }}
          onSubmit={onSubmit}
          onMinimize={() => setIsMaximized(false)}
          onCancel={() => {
            setIsMaximized(false);
            onOpenChange(false);
            onCancel();
          }}
          loading={isUpdating || isCreating}
          editing={!!blog}
        />
      ) : (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent
            showDismiss={false}
            className='mx-auto max-h-[95dvh] max-w-[100vw] overflow-y-auto overflow-x-hidden border-2 border-slate-800 bg-slate-900 p-0 text-slate-200 sm:min-w-[80vw] sm:max-w-[95vw]'
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
                  <CyberButton variant='outline' size='icon' onClick={onCancel}>
                    <X size={18} />
                  </CyberButton>
                </div>
              </div>
            </DialogHeader>
            {(isErrorCreating || isErrorUpdating) && <CyberErrorState />}
            <BlogForm
              form={{ ...blogForm, subscribe }}
              onSubmit={onSubmit}
              onCancel={handleCancel}
              loading={isUpdating || isCreating}
              editing={!!blog}
            />
          </DialogContent>
        </Dialog>
      )}
    </CyberFormProvider>
  );
}
