import { CyberFormProvider } from '@/components/ui-custom/cyber-form/cyber-form';

import { BlogInput, BlogInputSchema } from '@/lib/schemas/blog-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, UseFormReturn } from 'react-hook-form';
import BlogContentEditor from './blog-content-editor';

import { Separator } from '@radix-ui/react-separator';
import { Button } from '@/components/ui/button';
import { Save, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGenerateBlogContent } from '@/hooks/blogs/mutations/use-generate-content';
import {
  CyberFormInput,
  CyberFormTextarea,
} from '@/components/ui-custom/cyber-form/fields';
import { ReactNode } from 'react';

export interface BlogFormProps {
  defaultValues?: BlogInput | undefined;
  onSubmit: (arg0: BlogInput) => void;
  onCancel: () => void;
  loading?: boolean;
  editing?: boolean;
  form?: UseFormReturn<BlogInput>;
}

const FormWrapper = ({
  form,
  children,
}: {
  children: ReactNode;
  form: UseFormReturn<BlogInput>;
}) => {
  if (form) {
    <CyberFormProvider {...form}>{children}</CyberFormProvider>;
  }

  return children;
};

export default function BlogForm({
  defaultValues,
  onSubmit,
  onCancel,
  loading = false,
  editing = false,
  form,
}: BlogFormProps) {
  const internalForm = useForm<BlogInput>({
    resolver: zodResolver(BlogInputSchema),
    defaultValues,
  });

  const blogForm = form ?? internalForm;

  const { mutateAsync: generateData, isPending: isGenerating } =
    useGenerateBlogContent();

  const handleClick = async () => {
    try {
      const content = blogForm.getValues('content');
      if (content) {
        const { data } = await generateData(
          blogForm.getValues('content')! ?? ''
        );
        blogForm.setValue('excerpt', data.excerpt);
        // setReadTime(data.read_time);
        // setExcerpt(data.excerpt);
      } else {
        // TODO: use fun toast
        handleUnnecessaryTypingMessage();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUnnecessaryTypingMessage = () => {
    const text =
      'OH meu lindo, preenche ae a caralha do campo de cima antes de gerar o blog post S2 ta';

    text.split('').forEach((char, index) => {
      setTimeout(() => {
        blogForm.setValue('excerpt', text.slice(0, index + 1));
      }, index * 40);
    });

    setTimeout(() => {
      blogForm.setValue('excerpt', '');
    }, text.length * 40 + 1500);
  };

  const handleConfirm = (exp: BlogInput) => {
    onSubmit(exp);
  };

  return (
    <FormWrapper form={blogForm}>
      <form onSubmit={blogForm.handleSubmit(handleConfirm)}>
        <div className='flex-1 overflow-y-auto p-4'>
          <div className='space-y-4'>
            <div className='flex flex-col gap-4 md:flex-row md:items-center'>
              <div className='w-full'>
                <CyberFormInput
                  control={blogForm.control}
                  name='title'
                  label='BLOG_TITLE'
                  placeholder='Enter blog title...'
                />
              </div>
            </div>

            <Controller
              control={blogForm.control}
              name='content'
              render={({ field }) => (
                <BlogContentEditor
                  content={field.value ?? ''}
                  onContentChange={field.onChange}
                />
              )}
            />

            <Separator className='h-px bg-gradient-to-r from-purple-500 to-green-400' />
            <div className='flex items-center justify-between'>
              <p className='font-mono text-xs'>
                Generate the following with AI
              </p>

              <Button
                type='button'
                onClick={handleClick}
                disabled={isGenerating}
                size='sm'
                className={cn(isGenerating ? 'ripple-loop' : '')}
              >
                <Sparkles
                  className={cn('ml-2', isGenerating ? 'animate-shine' : false)}
                />
                Generate with AI
              </Button>
            </div>
            <CyberFormTextarea
              control={blogForm.control}
              name='excerpt'
              label='EXCERPT'
              placeholder={
                isGenerating ? 'Generating' : 'Write a short description'
              }
              className='resize-none'
              disabled={isGenerating}
            />
          </div>
        </div>
        <div className='sticky bottom-0 flex flex-row justify-end gap-3 border-t border-slate-800 bg-slate-900 p-4 sm:flex-row sm:justify-end sm:space-x-2 '>
          <input type='hidden' {...blogForm.register('published')} />
          <Button
            type='button'
            variant='outline'
            onClick={(e) => {
              e.preventDefault();
              onCancel();
            }}
          >
            CANCEL
          </Button>
          {editing ? (
            <Button
              type='submit'
              variant='secondary'
              isLoading={loading}
              loadingText='SAVING...'
              leftIcon={<Save size={16} />}
            >
              SAVE_BLOG
            </Button>
          ) : (
            <div className='inline-flex items-center gap-4'>
              <Button
                type='submit'
                variant='primary'
                isLoading={loading}
                loadingText='SAVING...'
                leftIcon={<Save size={16} />}
                onClick={() => blogForm.setValue('published', false)}
              >
                SAVE_AS_DRAFT
              </Button>
              <Button
                type='submit'
                variant='secondary'
                isLoading={loading}
                loadingText='SAVING...'
                leftIcon={<Save size={16} />}
                onClick={() => blogForm.setValue('published', true)}
              >
                SAVE_AND_PUBLISHED
              </Button>
            </div>
          )}
        </div>
      </form>
    </FormWrapper>
  );
}
