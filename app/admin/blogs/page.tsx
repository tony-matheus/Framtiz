'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

import { CyberButton } from '@/components/ui-custom/cyber-button';
import AdminHeader from '@/components/admin/admin-header';
import BlogEditorDialog from '@/components/admin/blog/blog-editor-dialog';
import { useBlogContext } from './contexts/blog-context';
import { Blog } from '@/lib/services/blog-service';
import { useDestroyBlog } from '@/lib/hooks/blogs/use-destroy-blog';
import { useUpdateBlog } from '@/lib/hooks/blogs/use-update-blog';
import BlogList from '@/components/admin/blog/blog-list';
import { useFetchBlogs } from '@/lib/hooks/blogs/use-fetch-blogs';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberPagination } from '@/components/ui-custom/cyber-pagination';

export default function BlogPage() {
  const {
    state: { blogs, totalPages },
    dispatch,
  } = useBlogContext();

  const [term, setTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);

  const { mutateAsync: mutateDestroy, isPending: isDeleting } =
    useDestroyBlog();

  const { mutate: updateBlog } = useUpdateBlog();

  const { data, currentPage, goToPage } = useFetchBlogs({
    title: term,
    initialPage: 1,
    initialData: { blogs, totalPages },
  });

  console.log({ term });
  const handleAddBlog = () => {
    setCurrentBlog(null);
    setIsDialogOpen(true);
  };

  const handleSaveBlog = (blog: Blog) => {
    setIsDialogOpen(false);
    if (currentBlog) {
      dispatch({ type: 'UPDATE_BLOG', blog });
      return setCurrentBlog(null);
    }
    dispatch({ type: 'ADD_BLOG', blog });
  };

  const handleEditBlog = (blog: Blog) => {
    setCurrentBlog(blog);
    setIsDialogOpen(true);
  };

  const handleDeleteBlog = async (blog: Blog) => {
    await mutateDestroy(blog.id);
    dispatch({ type: 'DELETE_BLOG', blogId: blog.id });
  };

  const handleToggleStatus = async (blog: Blog) => {
    await updateBlog({
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
          className='mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'
        >
          <AdminHeader title='BLOG' />

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
          blogs={data}
          onSearch={setTerm}
          onAdd={handleAddBlog}
          onEdit={handleEditBlog}
          onDelete={handleDeleteBlog}
          isDeleting={isDeleting}
          onPublishChange={(blog) => handleToggleStatus(blog)}
        />

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='mt-8 mb-12'
          >
            <CyberCard className='inline-block mx-auto'>
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
