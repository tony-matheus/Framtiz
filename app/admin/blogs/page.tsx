"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GithubIcon, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Blog } from "@/lib/services/blog-service/helpers"
import { useDestroyBlog } from "@/hooks/blogs/mutations/use-destroy-blog"
import { useUpdateBlog } from "@/hooks/blogs/mutations/use-update-blog"
import BlogList from "@/components/admin/blog/blog-list"
import { Card, CardContent } from "@/components/ui/card"
import { CyberPagination } from "@/components/ui-custom/cyber-pagination"
import { useQueryClient } from "@tanstack/react-query"
import CyberSearchInput from "@/components/ui-custom/inputs/cyber-search-input"
import { useFetchBlogs } from "@/hooks/blogs/fetch/use-fetch-blogs"
import { toast } from "sonner"
import ContentSelectionDialog from "@/components/admin/blog/dialogs/content-selection-dialog"
import Tooltip from "@/components/ui/tooltip"
import ImportGistDialog from "@/components/admin/blog/dialogs/import-gist-dialog"

export default function BlogPage() {
  const queryClient = useQueryClient()

  const [term, setTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isImportGistDialogOpen, setIsImportGistDialogOpen] = useState(false)
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const { mutateAsync: mutateDestroy } = useDestroyBlog({
    onSuccess: () => {
      toast.success("SYSTEM_ACTION: COMPLETED", {
        description: "Experience successfully destroyed!",
      })
    },
    onError: () => {
      toast.error("SYSTEM_ACTION: FAILED", {
        description: "Experience couldn't be destroyed!",
      })
    },
  })

  const { mutateAsync: updateBlog } = useUpdateBlog({})

  const { blogs, totalPages, currentPage, goToPage, isLoading } = useFetchBlogs(
    {
      initialPage: 1,
      title: term,
    },
  )

  const refetchPage = (page: number, term = "") => {
    queryClient.refetchQueries({
      queryKey: ["blogs", term, page],
      exact: true,
    })
  }

  const handleAddBlog = () => {
    setCurrentBlog(null)
    setIsDialogOpen(true)
  }

  const handleUploadImage = async (blog: Blog, imageUrl: string) => {
    await updateBlog({
      ...blog,
      image_url: imageUrl,
    })

    refetchPage(currentPage, term)
  }

  const handleSaveBlog = () => {
    setIsDialogOpen(false)
    if (currentBlog) {
      refetchPage(currentPage, term)
      return setCurrentBlog(null)
    }
    goToPage(1)
    refetchPage(1, "")
  }

  const handleEditBlog = (blog: Blog) => {
    setCurrentBlog(blog)
    setIsDialogOpen(true)
  }

  const handleDeleteBlog = async (blog: Blog) => {
    setDeletingId(blog.id)
    await mutateDestroy(blog.id)
    toast.success("SYSTEM_ACTION: COMPLETED", {
      description: "Blog successfully deleted!",
    })
    setDeletingId(null)
    refetchPage(currentPage, term)
  }

  const handleToggleStatus = (blog: Blog) => {
    updateBlog({
      ...blog,
      published: !blog.published,
    })
  }

  return (
    <>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex  items-start justify-between gap-4 py-4  md:items-center"
        >
          <CyberSearchInput onSearch={setTerm} placeholder="Type to search…" />

          <Tooltip content="Import your gist from Github">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsImportGistDialogOpen(true)}
            >
              <GithubIcon />
            </Button>
          </Tooltip>
          <Button
            variant="default"
            leftIcon={<Plus size={16} />}
            onClick={handleAddBlog}
            className="md:self-end"
          >
            CREATE
          </Button>
        </motion.div>
        <BlogList
          loading={isLoading}
          blogs={blogs}
          onAdd={handleAddBlog}
          onEdit={handleEditBlog}
          onDelete={handleDeleteBlog}
          onFileUpload={handleUploadImage}
          deletingId={deletingId}
          onPublishChange={(blog) => handleToggleStatus(blog)}
        />

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 mt-8"
          >
            <Card className="mx-auto inline-block">
              <CardContent className="p-2 sm:p-4">
                <CyberPagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={goToPage}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <ContentSelectionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCancel={() => {
          setIsDialogOpen(false)
          setCurrentBlog(null)
        }}
        onSave={handleSaveBlog}
        blog={currentBlog}
      />
      <ImportGistDialog
        open={isImportGistDialogOpen}
        onOpenChange={setIsImportGistDialogOpen}
      />
    </>
  )
}
