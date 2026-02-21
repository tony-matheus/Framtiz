"use client"

import { getFormattedDate } from "@/lib/helpers/daytime"
import { Blog } from "@/lib/services/blog-service/helpers"
import { motion } from "framer-motion"
import { NotebookIcon } from "lucide-react"

const NotebookIconMotion = motion(NotebookIcon)

export default function GistCard({ gist }: { gist: Blog }) {
  return (
    <button
      type="button"
      className="relative w-56 overflow-hidden border border-slate-700 bg-slate-800/90 p-4 text-left backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20"
    >
      <div className="mb-3 flex items-center">
        <div className="mr-3 flex size-8 items-center justify-center border border-slate-600 bg-slate-700 transition-colors duration-300 hover:border-purple-500">
          <NotebookIconMotion
            layoutId={`gist-icon-${gist.id}`}
            className="size-4 text-green-400"
          />
        </div>
        <div className="min-w-0 flex-1">
          <motion.h3
            className="line-clamp-2 h-[45px] max-h-[45px] text-lg font-semibold leading-tight text-slate-100 transition-colors duration-300 hover:text-purple-300"
            layoutId={`gist-title-${gist.id}`}
          >
            {gist.title}
          </motion.h3>
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
    </button>
  )
}
