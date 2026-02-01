"use client"

import { useEffect } from "react"
import { Save, Minimize2, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useIsMobile } from "@/hooks/use-mobile"
import { useForm } from "react-hook-form"
import { BlogInput, BlogInputSchema } from "@/lib/schemas/blog-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { BlogFormProps } from "./blog-form"
import { CyberFormInput } from "@/components/ui-custom/cyber-form/fields"
import {
  CyberFormControl,
  CyberFormField,
  CyberFormItem,
} from "@/components/ui-custom/cyber-form/cyber-form"
import MarkdownRender from "@/components/ui/markdown-render"
import { Card, CardContent } from "@/components/ui/card"

interface FullScreenEditorProps extends BlogFormProps {
  onMinimize: () => void
}

export default function FullScreenEditor({
  defaultValues,
  onSubmit,
  onCancel,
  onMinimize,
  loading = false,
  editing = false,
  form,
}: FullScreenEditorProps) {
  const internalForm = useForm<BlogInput>({
    resolver: zodResolver(BlogInputSchema),
    defaultValues,
  })

  const blogForm = form ?? internalForm

  const isMobile = useIsMobile()
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key to exit full-screen mode
      if (e.key === "Escape") {
        onMinimize()
      }

      // Ctrl+S to save
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault()

        blogForm.handleSubmit(onSubmit)()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onMinimize, onSubmit, blogForm])

  return (
    <form
      onSubmit={blogForm.handleSubmit(onSubmit)}
      className="fixed inset-0 z-50 flex flex-col bg-slate-950"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 bg-slate-900 p-4 md:gap-[100px]">
        <div className="flex flex-1 items-center gap-4">
          <h2 className="flex items-center font-mono text-xl font-bold text-slate-200 ">
            <FileText className="mr-2 text-purple-400" size={20} />
            <span>EDITOR</span>
          </h2>

          <CyberFormInput
            control={blogForm.control}
            name="title"
            placeholder="Enter blog title..."
            className="w-full"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="secondary" type="submit" isLoading={loading}>
              <Save size={16} />
              <span className="hidden md:inline-flex">
                {editing ? "UPDATE" : "SAVE_DRAFT"}
              </span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={loading}
              onClick={onMinimize}
              title="Exit Full Screen"
            >
              <Minimize2 size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={loading}
              onClick={onCancel}
              title="Close"
            >
              <X size={18} />
            </Button>
          </div>
        </div>
      </div>

      <ResizablePanelGroup direction={isMobile ? "vertical" : "horizontal"}>
        <ResizablePanel defaultSize={50}>
          <CyberFormField
            control={blogForm.control}
            name="content"
            render={({ field }) => (
              <CyberFormItem className="h-full space-y-0">
                <CyberFormControl>
                  <textarea
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    className="hidden size-full resize-none border-0 bg-slate-800 p-4 font-mono text-slate-200 focus:outline-none md:inline-block"
                    placeholder="Write your blog post in Markdown..."
                  />
                </CyberFormControl>

                <Card
                  withCornerAccents={false}
                  className="block h-full overflow-auto rounded-none border-0 md:hidden"
                >
                  <CardContent className="prose prose-invert max-w-none p-6">
                    {field.value ? (
                      <MarkdownRender content={field.value} />
                    ) : (
                      <div className="italic text-slate-500">
                        No content to preview
                      </div>
                    )}
                  </CardContent>
                </Card>
              </CyberFormItem>
            )}
          />
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className="w-1 bg-gradient-to-b from-purple-600 to-green-400 "
        />

        <ResizablePanel defaultSize={50}>
          <CyberFormField
            control={blogForm.control}
            name="content"
            render={({ field }) => (
              <CyberFormItem className="h-full space-y-0">
                <CyberFormControl>
                  <textarea
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    className="inline-block size-full resize-none border-0 bg-slate-800 p-4 font-mono text-slate-200 focus:outline-none md:hidden"
                    placeholder="Write your blog post in Markdown..."
                  />
                </CyberFormControl>
                <Card
                  withCornerAccents={false}
                  className="hidden h-full overflow-auto rounded-none border-0  md:block"
                >
                  <CardContent className="prose prose-invert max-w-none p-4  ">
                    {field.value ? (
                      <MarkdownRender content={field.value} />
                    ) : (
                      <div className="italic text-slate-500">
                        No content to preview
                      </div>
                    )}
                  </CardContent>
                </Card>
              </CyberFormItem>
            )}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
      {/* Keyboard shortcuts info */}
      <div className="absolute bottom-4 right-4 hidden rounded border border-slate-800 bg-slate-900/80 p-2 text-xs text-slate-500 md:block">
        <div className="font-mono">KEYBOARD_SHORTCUTS:</div>
        <div className="mt-1 flex gap-4">
          <span>ESC - Exit Full Screen</span>
          <span>Ctrl+S - Save</span>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-purple-600 to-transparent"></div>
      <div className="absolute bottom-0 right-0 h-1 w-full bg-gradient-to-l from-green-400 to-transparent"></div>
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-600 to-transparent"></div>
      <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent to-green-400"></div>
    </form>
  )
}
