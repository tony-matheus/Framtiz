import { BlogInput, BlogInputSchema } from "@/lib/schemas/blog-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, UseFormReturn } from "react-hook-form"
import BlogContentEditor from "./blog-content-editor"

import { Separator } from "@radix-ui/react-separator"
import { Button } from "@/components/ui/button"
import { Save, Search, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGenerateBlogContent } from "@/hooks/blogs/mutations/use-generate-content"
import {
  CyberFormInput,
  CyberFormTextarea,
} from "@/components/ui-custom/cyber-form/fields"
import { useEffect, useState } from "react"
import Input from "@/components/ui/input"
import { useFetchGistInfo } from "./hooks/use-fetch-gist-info"
import GistPreview from "./gist-preview"
import ConfirmGistAlert from "./confirm-gist-alert"

export interface BlogFormProps {
  defaultValues?: BlogInput | undefined
  onSubmit: (arg0: BlogInput) => void
  onCancel: () => void
  loading?: boolean
  editing?: boolean
  form?: UseFormReturn<BlogInput>
  type?: "blog" | "gist"
}

const GIST_URL_REGEX =
  /https:\/\/gist\.github\.com\/[a-zA-Z0-9]+\/([a-zA-Z0-9]+)/

export default function BlogForm({
  defaultValues,
  onSubmit,
  onCancel,
  loading = false,
  editing = false,
  form,
  type = "blog",
}: BlogFormProps) {
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false)
  const [gistId, setGistId] = useState<string | null>(null)
  const [gistIdOrUrl, setGistIdOrUrl] = useState<string | null>(null)
  const [previewGist, setPreviewGist] = useState<boolean>(false)
  const [previewContent, setPreviewContent] = useState<string | null>(null)

  const internalForm = useForm<BlogInput>({
    resolver: zodResolver(BlogInputSchema),
    defaultValues,
  })

  const blogForm = form ?? internalForm

  const { mutateAsync: generateData, isPending: isGenerating } =
    useGenerateBlogContent()

  const { gistInfo, isPending: isFetchingGist } = useFetchGistInfo(gistId)

  const handleClick = async () => {
    try {
      const content = blogForm.getValues("content")
      if (content) {
        const { data } = await generateData(
          blogForm.getValues("content")! ?? "",
        )
        blogForm.setValue("excerpt", data.excerpt)
        // setReadTime(data.read_time);
        // setExcerpt(data.excerpt);
      } else {
        // TODO: use fun toast
        handleUnnecessaryTypingMessage()
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleUnnecessaryTypingMessage = () => {
    const text =
      "OH meu lindo, preenche ae a caralha do campo de cima antes de gerar o blog post S2 ta"

    text.split("").forEach((char, index) => {
      setTimeout(() => {
        blogForm.setValue("excerpt", text.slice(0, index + 1))
      }, index * 40)
    })

    setTimeout(
      () => {
        blogForm.setValue("excerpt", "")
      },
      text.length * 40 + 1500,
    )
  }

  useEffect(() => {
    if (gistInfo) {
      setPreviewGist(true)
      setPreviewContent(gistInfo.content)
    }
  }, [gistInfo, blogForm])

  const handleSearchGist = () => {
    if (!gistIdOrUrl) {
      return
    }

    if (GIST_URL_REGEX.test(gistIdOrUrl)) {
      setGistId(gistIdOrUrl.match(GIST_URL_REGEX)?.[1] ?? null)
    } else {
      setGistId(gistIdOrUrl)
    }
  }

  const handleConfirm = (exp: BlogInput) => {
    onSubmit(exp)
  }

  const handleApplyGist = ({
    shouldByPass = false,
  }: {
    shouldByPass?: boolean
  }) => {
    if (
      localStorage.getItem("gist-preview-dont-ask-again") === "true" ||
      shouldByPass
    ) {
      blogForm.setValue("content", previewContent ?? "")
      setGistId(null)
      setPreviewGist(false)
      setPreviewContent(null)
      return
    }

    setShowConfirmationAlert(true)
  }

  return (
    <>
      <form
        onSubmit={blogForm.handleSubmit(handleConfirm)}
        className="relative"
      >
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex w-full flex-col gap-2 md:flex-row md:gap-8">
                <CyberFormInput
                  control={blogForm.control}
                  name="title"
                  label="TITLE"
                  placeholder="Enter some fun title..."
                  className="flex-1"
                />
                <div className="flex h-fit flex-1 gap-2">
                  <Input
                    value={gistIdOrUrl ?? ""}
                    onChange={(e) => setGistIdOrUrl(e.target.value)}
                    label="GIST_ID_OR_URL"
                    placeholder="Enter the GIST ID or URL"
                  />
                  <Button
                    type="button"
                    onClick={handleSearchGist}
                    className="mt-auto"
                    size="icon"
                    isLoading={isFetchingGist}
                  >
                    <Search size={16} />
                  </Button>
                </div>
              </div>
            </div>

            <Controller
              control={blogForm.control}
              name="content"
              render={({ field }) => (
                <BlogContentEditor
                  content={field.value ?? ""}
                  onContentChange={field.onChange}
                />
              )}
            />

            {type === "blog" && (
              <>
                <Separator className="h-px bg-gradient-to-r from-purple-500 to-green-400" />
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs">
                    Generate the following with AI
                  </p>

                  <Button
                    type="button"
                    onClick={handleClick}
                    disabled={isGenerating}
                    size="sm"
                    className={cn(isGenerating ? "ripple-loop" : "")}
                  >
                    <Sparkles
                      className={cn(
                        "ml-2",
                        isGenerating ? "animate-shine" : false,
                      )}
                    />
                    Generate with AI
                  </Button>
                </div>
                <CyberFormTextarea
                  control={blogForm.control}
                  name="excerpt"
                  label="EXCERPT"
                  placeholder={
                    isGenerating ? "Generating" : "Write a short description"
                  }
                  className="resize-none"
                  disabled={isGenerating}
                />
              </>
            )}
          </div>
        </div>
        <input type="hidden" {...blogForm.register("published")} />
        <div className="sticky bottom-0 flex flex-row justify-end gap-2 border-t border-slate-800 bg-slate-900 p-2 sm:flex-row sm:justify-end md:p-4">
          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              e.preventDefault()
              onCancel()
            }}
            className="hidden md:flex"
          >
            CANCEL
          </Button>
          {editing ? (
            <Button
              type="submit"
              variant="secondary"
              isLoading={loading}
              leftIcon={<Save size={16} />}
            >
              UPDATE_BLOG
            </Button>
          ) : (
            <div className="flex items-center gap-4 md:inline-flex">
              <Button
                type="submit"
                variant="default"
                isLoading={loading}
                leftIcon={<Save size={16} />}
                onClick={() => blogForm.setValue("published", false)}
                className="flex-1"
              >
                SAVE_DRAFT
              </Button>
              <Button
                type="submit"
                variant="secondary"
                isLoading={loading}
                leftIcon={<Save size={16} />}
                onClick={() => blogForm.setValue("published", true)}
                className="flex-1"
              >
                PUBLISHE
              </Button>
            </div>
          )}
        </div>
      </form>
      {previewGist && (
        <>
          <div className="fixed inset-0 z-20 flex items-center justify-center overflow-hidden bg-black/30 p-4 md:p-8">
            <GistPreview
              content={previewContent ?? ""}
              onClose={() => {
                setPreviewGist(false)
                setPreviewContent(null)
                setGistId(null)
              }}
              onApply={() => handleApplyGist({ shouldByPass: false })}
            />
          </div>
          {showConfirmationAlert && (
            <div
              className="fixed inset-0 z-30 flex items-center justify-center overflow-hidden bg-black/80 p-4 md:p-8"
              onWheel={(e) => e.preventDefault()}
              onTouchMove={(e) => e.preventDefault()}
            >
              <ConfirmGistAlert
                onCancel={() => setShowConfirmationAlert(false)}
                onConfirm={() => {
                  setShowConfirmationAlert(false)
                  handleApplyGist({ shouldByPass: true })
                }}
              />
            </div>
          )}
        </>
      )}
    </>
  )
}
