"use client"

import { motion } from "framer-motion"
import FeatureBlog from "@/components/blog/feature-blog"
import { Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { CyberPagination } from "@/components/ui-custom/cyber-pagination"

import BlogCard from "@/components/blog/blog-card"
import { useSuspenseFetchBlogsPublic } from "@/hooks/blogs/fetch/use-suspense-fetch-blogs-public"
import BlogNavigation from "@/components/blog/blog-navigation"
import GistList from "@/components/blog/gist-list"

export default function Blog() {
  const { blogs, totalPages, currentPage, goToPage } =
    useSuspenseFetchBlogsPublic({
      initialPage: 1,
      type: "blog",
    })

  const { blogs: gists } = useSuspenseFetchBlogsPublic({
    initialPage: 1,
    type: "gist",
  })

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950/80 to-green-900/20" />

      <BlogNavigation link="/" text="BACK_TO_HOME" />
      <div className="container relative z-10 mx-auto px-4 py-6">
        {blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <FeatureBlog blog={blogs[0]} />
          </motion.div>
        )}

        {gists.length > 0 ? <GistList gists={gists} /> : null}

        {blogs.length > 0 ? (
          <>
            <h2 className="mb-4 text-2xl font-bold text-slate-100">Blogs</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex justify-center"
              >
                <Card>
                  <CardContent className="p-4">
                    <CyberPagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onPageChange={goToPage}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </>
        ) : (
          /* No results */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="py-16 text-center"
          >
            <Card>
              <CardContent className="p-12">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center border border-slate-700 bg-slate-800">
                  <Search size={32} className="text-slate-400" />
                </div>
                <h3 className="mb-2 font-mono text-xl text-slate-200">
                  NO_RESULTS_FOUND
                </h3>
                <p className="mb-6 text-slate-400">
                  No articles match your search criteria. Try adjusting your
                  filters or search terms.
                </p>
                {/* <Button
                variant='outline'
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
              >
                CLEAR_FILTERS
              </Button> */}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
