'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

import { CyberButton } from '@/components/ui-custom/cyber-button';
import BlogEditorDialog from '@/components/admin/blog/blog-editor-dialog';
import { Blog } from '@/lib/services/blog-service';
import { useDestroyBlog } from '@/hooks/blogs/mutations/use-destroy-blog';
import { useUpdateBlog } from '@/hooks/blogs/mutations/use-update-blog';
import BlogList from '@/components/admin/blog/blog-list';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberPagination } from '@/components/ui-custom/cyber-pagination';
import { useSuspenseFetchBlogs } from '@/hooks/blogs/fetch/use-suspense-fetch-blogs';
import { useQueryClient } from '@tanstack/react-query';
import CyberSearchInput from '@/components/ui-custom/inputs/cyber-search-input';

export default function BlogPage() {
  const queryClient = useQueryClient();

  const [term, setTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { mutateAsync: mutateDestroy } = useDestroyBlog();

  const { mutate: updateBlog } = useUpdateBlog();

  const { blogs, totalPages, currentPage, goToPage } = useSuspenseFetchBlogs({
    initialPage: 1,
    title: term,
  });

  const refetchPage = (page: number, term = '') => {
    queryClient.refetchQueries({
      queryKey: ['blogs', term, page],
      exact: true,
    });
  };

  const handleAddBlog = () => {
    setCurrentBlog(null);
    setIsDialogOpen(true);
  };

  const handleSaveBlog = () => {
    setIsDialogOpen(false);
    if (currentBlog) {
      refetchPage(currentPage, term);
      return setCurrentBlog(null);
    }
    goToPage(1);
    refetchPage(1, '');
  };

  const handleEditBlog = (blog: Blog) => {
    setCurrentBlog(blog);
    setIsDialogOpen(true);
  };

  const handleDeleteBlog = async (blog: Blog) => {
    setDeletingId(blog.id);
    await mutateDestroy(blog.id);
    setDeletingId(null);
    refetchPage(currentPage, term);
  };

  const handleToggleStatus = (blog: Blog) => {
    updateBlog({
      ...blog,
      published: !blog.published,
    });
  };

  return (
    <>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-4 flex  items-start justify-between gap-4 py-4  md:items-center'
        >
          <CyberSearchInput onSearch={setTerm} />

          <CyberButton
            variant='primary'
            leftIcon={<Plus size={16} />}
            onClick={handleAddBlog}
            className='md:self-end'
          >
            ADD_BLOG
          </CyberButton>
        </motion.div>

        <BlogList
          blogs={blogs}
          onAdd={handleAddBlog}
          onEdit={handleEditBlog}
          onDelete={handleDeleteBlog}
          deletingId={deletingId}
          onPublishChange={(blog) => handleToggleStatus(blog)}
        />

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='mb-12 mt-8'
          >
            <CyberCard className='mx-auto inline-block'>
              <CyberCardContent className='p-2 sm:p-4'>
                <CyberPagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={goToPage}
                />
              </CyberCardContent>
            </CyberCard>
          </motion.div>
        )}
      </div>

      <BlogEditorDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveBlog}
        blog={currentBlog}
      />
    </>
  );
}
