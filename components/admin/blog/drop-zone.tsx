"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { CircleX, Upload, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface DropZoneProps {
  onFileDrop: (files: FileList) => void
  disabled?: boolean
}

export default function DropZone({
  onFileDrop,
  disabled = false,
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (disabled) return
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (disabled) return

    // Only set dragging to false if we're leaving the drop zone
    // and not entering a child element
    if (
      dropZoneRef.current &&
      !dropZoneRef.current.contains(e.relatedTarget as Node)
    ) {
      setIsDragging(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (disabled) return
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileDrop(e.dataTransfer.files)
    }
  }

  // Global drag event handlers to show/hide the drop zone
  useEffect(() => {
    const handleGlobalDragOver = (e: DragEvent) => {
      e.preventDefault()
      if (disabled) return

      // Check if the dragged items contain files
      if (e.dataTransfer?.types.includes("Files")) {
        setIsVisible(true)
      }
    }

    const handleGlobalDragLeave = (e: DragEvent) => {
      if (disabled) return

      // Only hide if we're leaving the window
      if (
        e.clientX <= 0 ||
        e.clientY <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        setIsVisible(false)
        setIsDragging(false)
      }
    }

    const handleGlobalDrop = () => {
      if (disabled) return
      setIsVisible(false)
      setIsDragging(false)
    }

    window.addEventListener("dragover", handleGlobalDragOver)
    window.addEventListener("dragleave", handleGlobalDragLeave)
    window.addEventListener("drop", handleGlobalDrop)

    return () => {
      window.removeEventListener("dragover", handleGlobalDragOver)
      window.removeEventListener("dragleave", handleGlobalDragLeave)
      window.removeEventListener("drop", handleGlobalDrop)
    }
  }, [disabled])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <motion.div
          ref={dropZoneRef}
          initial={{ scale: 0.9 }}
          animate={{
            scale: isDragging ? 1.05 : 1,
            borderColor: isDragging ? "#8b5cf6" : "#334155",
          }}
          className={`flex h-64 w-full max-w-2xl flex-col items-center justify-center gap-4 rounded-none border-2 border-dashed ${
            isDragging ? "bg-slate-800/50" : "bg-slate-900/50"
          }`}
        >
          <div className="relative">
            {process.env.NEXT_PUBLIC_IMAGE_DROP_ENABLED === "true" ? (
              <Upload
                size={48}
                className={`${
                  isDragging ? "text-purple-400" : "text-slate-400"
                }`}
              />
            ) : (
              <CircleX
                size={48}
                className={`${
                  isDragging ? "text-purple-400" : "text-slate-400"
                }`}
              />
            )}

            <Upload
              size={48}
              className={`${isDragging ? "text-purple-400" : "text-slate-400"}`}
            />
            {isDragging && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-green-400 text-xs font-bold text-slate-900"
              >
                +
              </motion.div>
            )}
          </div>
          <div className="text-center">
            <h3 className="mb-1 font-mono text-lg text-slate-200">
              {process.env.NEXT_PUBLIC_IMAGE_DROP_ENABLED === "true" ? (
                <>{isDragging ? "DROP_TO_UPLOAD" : "DRAG_FILES_HERE"}</>
              ) : (
                "NOT_SUPPORTED"
              )}
            </h3>
            <p className="max-w-md text-sm text-slate-400">
              {process.env.NEXT_PUBLIC_IMAGE_DROP_ENABLED === "true"
                ? `Drop images or videos to upload and insert them into your\u00A0content`
                : "Drop image or video not supported yet"}
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-4 text-slate-400 hover:text-slate-200"
          >
            <X size={24} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
