"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { X, FileText, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/primitives/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useCreateBlog } from "@/hooks/blogs/mutations/use-create-blog"
import { Blog } from "@/lib/services/blog-service/helpers"
import { useUpdateBlog } from "@/hooks/blogs/mutations/use-update-blog"
import { CyberErrorState } from "@/components/ui-custom/cyber-error-state"
import BlogForm from "../blog-form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BlogInput, BlogInputSchema } from "@/lib/schemas/blog-schemas"
import { CyberFormProvider } from "@/components/ui-custom/cyber-form/cyber-form"
import FullScreenEditor from "../full-screen-editor"
import { mergeRight } from "ramda"
import { useDebouncedCallback } from "use-debounce"
import { toast } from "sonner"

const STORAGE_KEY = "BLOG_FORM_STORAGE_KEY"

export interface BlogEditorDialogProps {
  isOpen: boolean
  onOpenChange: (arg0: boolean) => void
  onSave: ({
    shouldClose,
    blog,
  }: {
    shouldClose?: boolean
    blog?: Blog | null
  }) => void
  onCancel: () => void
  blog?: Blog | null
  type?: "blog" | "gist"
}

export default function BlogEditorDialog({
  isOpen,
  onOpenChange,
  onSave,
  blog,
  onCancel,
  type = "blog",
}: BlogEditorDialogProps) {
  const [isMaximized, setIsMaximized] = useState(false)

  const toggleMaximize = () => setIsMaximized(!isMaximized)

  const debouncedSave = useDebouncedCallback((values: BlogInput) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values))
  }, 500)

  const { subscribe, ...blogForm } = useForm<BlogInput>({
    resolver: zodResolver(BlogInputSchema),
    defaultValues: {
      title: "",
      published: false,
      content: null,
      excerpt: null,
      image_url: null,
      ...blog,
    },
  })
  const unsubscribeRef = useRef<ReturnType<typeof subscribe> | null>(null)

  const lastSubscribedId = useRef<number | "create">(null)

  useEffect(() => {
    if (unsubscribeRef.current) return

    const idToTrack = blog?.id ?? "create"

    if (lastSubscribedId.current !== idToTrack) {
      lastSubscribedId.current = idToTrack
      unsubscribeRef.current = subscribe({
        formState: { values: true },
        callback: ({ values }) => debouncedSave(values),
      })
    }

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
        unsubscribeRef.current = null
        lastSubscribedId.current = null
      }
    }
  }, [blog?.id, subscribe, debouncedSave])

  const {
    mutateAsync: createBlog,
    isPending: isCreating,
    isError: isErrorCreating,
  } = useCreateBlog({
    onSuccess: () => {
      toast.success("SYSTEM_ACTION: COMPLETED", {
        description: "Experience successfully created!",
        duration: 1000,
      })
    },
    onError: () => {
      toast.error("SYSTEM_ACTION: FAILED", {
        description: "Experience couldn't be created!",
        duration: 1000,
      })
    },
  })

  const {
    mutateAsync: updateBlog,
    isPending: isUpdating,
    isError: isErrorUpdating,
  } = useUpdateBlog({
    onSuccess: () => {
      toast.success("SYSTEM_ACTION: COMPLETED", {
        description: "Experience successfully updated!",
        duration: 1000,
      })
    },
    onError: () => {
      toast.error("SYSTEM_ACTION: FAILED", {
        description: "Experience couldn't be updated!",
        duration: 1000,
      })
    },
  })

  const handleCreateBlog = async (blogInput: BlogInput) => {
    const savedBlog = await createBlog(blogInput)

    onSave?.({ shouldClose: true, blog: savedBlog })
  }

  const handleUpdateBlog = async (blogInput: BlogInput) => {
    if (!blog) return

    const savedBlog = await updateBlog({
      id: blog?.id,
      ...blogInput,
    })

    onSave?.({ blog: savedBlog, shouldClose: false })
  }

  const onSubmit = (blogInput: BlogInput) => {
    sessionStorage.removeItem(STORAGE_KEY)

    if (blog) {
      return handleUpdateBlog(blogInput)
    }

    handleCreateBlog(blogInput)
  }

  const handleCancel = () => {
    blogForm.reset({
      title: " ",
      published: false,
      content: null,
      excerpt: null,
      image_url: null,
    })
    sessionStorage.removeItem(STORAGE_KEY)

    onOpenChange(false)
    onCancel()
  }

  useEffect(() => {
    if (!isOpen) return

    const storedData =
      typeof window !== "undefined" ? sessionStorage.getItem(STORAGE_KEY) : null

    const data = storedData ? JSON.parse(storedData) : {}

    const defaults = {
      published: false,
      content: null,
      excerpt: null,
      image_url: null,
    }

    if (blog) {
      const merged =
        data?.id === blog.id
          ? mergeRight(defaults, mergeRight(blog, data))
          : mergeRight(defaults, blog)

      blogForm.reset(merged)
    } else if (!data?.id) {
      blogForm.reset(mergeRight(defaults, data))
    } else {
      blogForm.reset(defaults)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, blog])

  return (
    <CyberFormProvider {...blogForm} subscribe={subscribe}>
      {isMaximized ? (
        <FullScreenEditor
          form={{ ...blogForm, subscribe }}
          onSubmit={onSubmit}
          onMinimize={() => setIsMaximized(false)}
          onCancel={() => {
            setIsMaximized(false)
            onOpenChange(false)
            onCancel()
          }}
          loading={isUpdating || isCreating}
          editing={!!blog}
        />
      ) : (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent
            showDismiss={false}
            className="mx-auto overflow-y-auto overflow-x-hidden border-2 border-slate-800 bg-slate-900 p-0 text-slate-200 md:max-h-[95dvh] md:max-w-[95vw] xl:min-w-[50vw] xl:max-w-[60vw]"
          >
            {/* Header */}
            <DialogHeader>
              <div className="z-10 flex items-center justify-between ">
                <DialogTitle className="flex items-center font-mono text-xl font-bold text-slate-200">
                  <FileText className="mr-2 text-purple-400" size={20} />
                  <span>{blog ? "EDIT" : "CREATE"}</span>
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleMaximize}
                    title="Maximize Editor"
                  >
                    <Maximize2 size={18} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={onCancel}>
                    <X size={18} />
                  </Button>
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
              type={type}
            />
          </DialogContent>
        </Dialog>
      )}
    </CyberFormProvider>
  )
}
