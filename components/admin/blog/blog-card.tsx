'use client';

import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { Blog } from '@/lib/services/blog-service';
import { CyberSwitch } from '@/components/ui-custom/cyber-switch';
import { useState } from 'react';
import Heading from '@/components/ui/typography/heading';
import { Edit, Trash2 } from 'lucide-react';

export interface BlogCardProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
  onPublishChange: (blog: Blog, published: boolean) => void;
  isDeleting: boolean;
  isDisabled: boolean;
}

export default function BlogCard({
  blog,
  onPublishChange,
  onEdit,
  onDelete,
  isDeleting,
  isDisabled,
}: BlogCardProps) {
  const [published, setPublished] = useState(blog.published ?? false);

  const handlePublishChange = (blog: Blog, published: boolean) => {
    onPublishChange(blog, published);
    setPublished(published);
  };

  return (
    <CyberCard
      className='group h-full transition-[colors,shadow,transform]
 duration-300 ease-in-out hover:translate-y-[-5px] hover:border-purple-600 hover:shadow-accent'
    >
      <CyberCardContent className='flex h-full flex-col justify-between'>
        <div className='mb-3 flex items-start justify-between gap-2'>
          <Heading
            as='h4'
            className='h-[84] overflow-hidden font-mono text-lg text-slate-200'
          >
            {blog.title}
          </Heading>
          <div className='flex gap-2'>
            <CyberButton
              variant='outline'
              size='icon'
              className='size-7'
              onClick={() => onEdit(blog)}
              disabled={isDisabled}
            >
              <Edit size={14} />
            </CyberButton>
            <CyberButton
              variant='destructive'
              size='icon'
              className='size-7 text-red-500'
              onClick={() => onDelete(blog)}
              isLoading={isDeleting}
              disabled={isDisabled}
            >
              <Trash2 size={14} />
            </CyberButton>
          </div>
        </div>
        <div className='flex shrink-0 items-center gap-2'>
          <CyberSwitch
            id='status'
            checked={published}
            onCheckedChange={(value) => handlePublishChange(blog, value)}
            disabled={isDeleting}
          />
          <span className='font-mono text-sm text-slate-300'>
            {published ? 'PUBLISHED' : 'DRAFT'}
          </span>
        </div>
      </CyberCardContent>
    </CyberCard>
  );
}
