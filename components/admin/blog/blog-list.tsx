import { motion } from "framer-motion"

import { Blog } from "@/lib/services/blog-service/helpers"
import BlogCard, { BlogCardProps } from "@/components/admin/blog/blog-card"
import { FileText } from "lucide-react"
import EmptyState from "../empty-state"
import BlogListSkeletonizer from "./blog-list-skeletonizer"

export interface BlogListProps
  extends Omit<BlogCardProps, "blog" | "isDeleting" | "isDisabled"> {
  blogs?: Blog[]
  onAdd: () => void
  deletingId?: number | null
  loading: boolean
}
export default function BlogList({
  blogs = [],
  onAdd,
  deletingId,
  loading,
  ...restProps
}: BlogListProps) {
  return (
    <div>
      {blogs.length === 0 && !loading ? (
        <EmptyState
          title="NO_BLOGS_FOUND"
          description="You haven't created any blog posts yet. Create your first blog post to share your thoughts and projects."
          icon={<FileText size={48} />}
          actionLabel="CREATE_BLOG"
          onAction={onAdd}
        />
      ) : (
        <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {loading ? (
            <BlogListSkeletonizer />
          ) : (
            blogs.map((blog) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <BlogCard
                  blog={blog}
                  isDeleting={deletingId == blog.id}
                  isDisabled={deletingId != null}
                  {...restProps}
                />
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
