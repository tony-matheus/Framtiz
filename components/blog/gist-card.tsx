"use client"

import { getFormattedDate } from "@/lib/helpers/daytime"
import MarkdownRender from "@/components/ui/markdown-render"
import { Blog } from "@/lib/services/blog-service/helpers"
import { AnimatePresence, motion } from "framer-motion"
import { NotebookIcon, XIcon } from "lucide-react"
import { useEffect, useId, useMemo, useRef, useState } from "react"

export default function GistCard({ gist }: { gist: Blog }) {
  const [isOpen, setIsOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const reactId = useId()
  const layoutId = useMemo(
    () => `gist-card-${gist.id}-${reactId}`,
    [gist.id, reactId],
  )

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }

    window.addEventListener("keydown", onKeyDown)
    window.setTimeout(() => closeButtonRef.current?.focus(), 0)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <>
      <motion.button
        type="button"
        layoutId={layoutId}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={open}
        className="relative w-56 overflow-hidden border border-slate-700 bg-slate-800/90 p-4 text-left backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20"
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.15, ease: "easeOut" },
        }}
      >
        <div className="mb-3 flex items-center">
          <div className="mr-3 flex size-8 items-center justify-center border border-slate-600 bg-slate-700 transition-colors duration-300 hover:border-purple-500">
            <NotebookIcon className="size-4 text-green-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 max-h-[45px] text-lg font-semibold leading-tight text-slate-100 transition-colors duration-300 hover:text-purple-300">
              {gist.title}
            </h3>
          </div>
        </div>

        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-slate-300">
          {gist.excerpt ?? ""}
        </p>

        <div className="space-y-1 text-xs text-slate-400">
          <div className="flex items-center">
            <span className="truncate">
              {getFormattedDate(gist.updated_at ?? gist.created_at ?? "")}
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/10 to-green-500/10 opacity-0 transition-opacity duration-300 hover:opacity-100" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
              onPointerDown={close}
            >
              <motion.div
                layoutId={layoutId}
                role="dialog"
                aria-modal="true"
                aria-label={`Gist: ${gist.title}`}
                className="relative w-full max-w-4xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl"
                transition={{ type: "spring", stiffness: 380, damping: 40 }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <div className="flex items-start gap-3 border-b border-slate-800 bg-slate-900 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <NotebookIcon className="size-4 text-green-400" />
                      <div className="font-mono text-xs text-slate-500">
                        FILE_ID: {String(gist.id).padStart(4, "0")}
                      </div>
                    </div>
                    <h2 className="truncate bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
                      {gist.title}
                    </h2>
                    <div className="mt-1 text-xs text-slate-400">
                      {getFormattedDate(
                        gist.updated_at ?? gist.created_at ?? "",
                      )}
                    </div>
                  </div>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={close}
                    className="inline-flex size-9 items-center justify-center border border-slate-700 bg-slate-800 text-slate-200 hover:border-purple-500/50"
                    aria-label="Close gist preview"
                  >
                    <XIcon size={16} />
                  </button>
                </div>

                <div className="max-h-[75vh] overflow-y-auto p-4 md:p-6">
                  <div className="prose prose-invert prose-lg max-w-none">
                    {gist.content ? (
                      <MarkdownRender content={gist.content} />
                    ) : (
                      <div className="italic text-slate-500">
                        No content to preview
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
