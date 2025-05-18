import { motion } from 'framer-motion';

import CyberSearchInput from '@/components/ui-custom/inputs/cyber-search-input';
import { Blog } from '@/lib/services/blog-service';
import BlogItem, { BlogItemProps } from '@/components/admin/blog/blog-item';
import { FileText } from 'lucide-react';
import EmptyState from '../empty-state';

interface BlogListProps extends Omit<BlogItemProps, 'blog'> {
  blogs?: Blog[];
  onAdd: () => void;
  onSearch: (arg0: string) => void;
}
export default function BlogList({
  blogs = [],
  onSearch,
  onAdd,
  ...restProps
}: BlogListProps) {
  return (
    <div>
      <CyberSearchInput className='mb-8' onSearch={onSearch} />
      {blogs.length === 0 ? (
        <EmptyState
          title='NO_BLOGS_FOUND'
          description="You haven't created any blog posts yet. Create your first blog post to share your thoughts and projects."
          icon={<FileText size={48} />}
          actionLabel='CREATE_BLOG'
          onAction={onAdd}
        />
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6'>
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BlogItem blog={blog} {...restProps} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
