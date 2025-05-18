'use client';

import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { Blog } from '@/lib/services/blog-service';
import { CyberSwitch } from '@/components/ui-custom/cyber-switch';
import { useState } from 'react';

export interface BlogItemProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
  onPublishChange: (blog: Blog, published: boolean) => void;
  isDeleting: boolean;
}

export default function BlogItem({
  blog,
  onPublishChange,
  onEdit,
  onDelete,
  isDeleting,
}: BlogItemProps) {
  const [published, setPublished] = useState(blog.published ?? false);

  const handlePublishChange = (blog: Blog, published: boolean) => {
    onPublishChange(blog, published);
    setPublished(published);
  };

  return (
    <CyberCard className='h-full'>
      <CyberCardContent>
        <h3 className='text-lg font-mono text-slate-200'>{blog.title}</h3>
        <div className='flex items-center gap-2 my-2'>
          <CyberSwitch
            id='status'
            checked={published}
            onCheckedChange={(value) => handlePublishChange(blog, value)}
            disabled={isDeleting}
          />
          <span className='text-sm text-slate-300 font-mono'>
            {published ? 'PUBLISHED' : 'DRAFT'}
          </span>
        </div>

        <div className='flex justify-between items-center text-xs text-slate-500 mt-auto pt-2 border-t border-slate-800'>
          <CyberButton
            variant='outline'
            size='sm'
            onClick={() => onEdit(blog)}
            disabled={isDeleting}
          >
            EDIT
          </CyberButton>
          <CyberButton
            className='ml-auto'
            variant='danger'
            size='sm'
            onClick={() => onDelete(blog)}
            isLoading={isDeleting}
          >
            DELETE
          </CyberButton>
        </div>
      </CyberCardContent>
    </CyberCard>
  );
}
