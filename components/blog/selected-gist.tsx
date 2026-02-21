"use client"
import { getFormattedDate } from "@/lib/helpers/daytime"
import MarkdownRender from "@/components/ui/markdown-render"
import { Blog } from "@/lib/services/blog-service/helpers"
import { motion } from "framer-motion"
import { NotebookIcon, XIcon } from "lucide-react"

const NotebookIconMotion = motion(NotebookIcon)

export default function SelectedGist({
  activeGist,
  setActiveGist,
}: {
  activeGist: Blog
  setActiveGist: (gist: Blog | null) => void
}) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
        onPointerDown={() => setActiveGist(null)}
      >
        <motion.div
          layoutId={`gist-card-${activeGist.id}`}
          role="dialog"
          aria-modal="true"
          aria-label={`Gist: ${activeGist.title}`}
          className="relative w-full max-w-4xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl"
          transition={{ type: "spring", stiffness: 380, damping: 40 }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="flex items-start gap-3 border-b border-slate-800 bg-slate-900 p-4">
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <NotebookIconMotion
                  className="size-4 text-green-400"
                  layoutId={`gist-icon-${activeGist.id}`}
                />
                <div className="font-mono text-xs text-slate-500">
                  FILE_ID: {String(activeGist.id).padStart(4, "0")}
                </div>
              </div>
              <motion.h2
                className="truncate bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-xl font-bold text-transparent md:text-2xl"
                layoutId={`gist-title-${activeGist.id}`}
              >
                {activeGist.title}
              </motion.h2>
              <div className="mt-1 text-xs text-slate-400">
                {getFormattedDate(
                  activeGist.updated_at ?? activeGist.created_at ?? "",
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveGist(null)}
              className="inline-flex size-9 items-center justify-center border border-slate-700 bg-slate-800 text-slate-200 hover:border-purple-500/50"
              aria-label="Close gist preview"
            >
              <XIcon size={16} />
            </button>
          </div>

          <div className="max-h-[75vh] overflow-y-auto p-4 md:p-6">
            <motion.div
              className="prose prose-invert prose-lg max-w-none"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
            >
              {activeGist.content ? (
                <MarkdownRender content={activeGist.content} />
              ) : (
                <div className="italic text-slate-500">
                  No content to preview
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
