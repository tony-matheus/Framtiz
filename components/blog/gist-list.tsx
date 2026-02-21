"use client"

import { Blog } from "@/lib/services/blog-service/helpers"
import { AnimatePresence, motion } from "framer-motion"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import GistCard from "./gist-card"
import SelectedGist from "./selected-gist"

export default function GistList({ gists }: { gists: Blog[] }) {
  const [activeGist, setActiveGist] = useState<Blog | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveGist(null)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <>
      {gists.length > 0 && (
        <div className="mb-4 border border-green-600">
          <h2 className="p-4 pb-0 text-2xl font-bold text-slate-100">Gists</h2>
          <ul className="flex flex-row gap-4 overflow-x-scroll p-4">
            {gists.map((gist) => (
              <motion.li
                key={gist.id}
                onClick={() => setActiveGist(gist)}
                layoutId={`gist-card-${gist.id}`}
                aria-haspopup="dialog"
                aria-expanded={activeGist?.id === gist.id}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.15, ease: "easeOut" },
                }}
              >
                <GistCard gist={gist} />
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      <AnimatePresence>
        {activeGist ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />
        ) : null}
      </AnimatePresence>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeGist ? (
              <SelectedGist
                activeGist={activeGist}
                setActiveGist={setActiveGist}
              />
            ) : null}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}
