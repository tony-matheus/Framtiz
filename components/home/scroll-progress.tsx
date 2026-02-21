"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AchievementNotification from "./achievement-notification"

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [maxProgress, setMaxProgress] = useState(0)
  const [achievementUnlocked, setAchievementUnlocked] = useState(false)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (scrollTop / docHeight) * 100

      if (currentProgress > maxProgress) {
        setMaxProgress(currentProgress)
        setScrollProgress(currentProgress)

        if (currentProgress >= 99 && !achievementUnlocked) {
          setAchievementUnlocked(true)
          setTimeout(() => setAchievementUnlocked(false), 5000)
        }
      }
    }

    window.addEventListener("scroll", updateScrollProgress)
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [maxProgress, achievementUnlocked])

  return (
    <>
      {/* Progress Indicator */}
      <div className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
        <div className="relative">
          {/* Background track */}
          <div className="h-64 w-1 border border-slate-700 bg-slate-800"></div>

          {/* Progress fill */}
          <motion.div
            className="absolute left-0 top-0 w-1 bg-gradient-to-b from-purple-600 to-green-400"
            style={{ height: `${(scrollProgress / 100) * 256}px` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          <motion.div
            className="absolute -left-1 size-3 rounded-full border-2 border-slate-900 bg-purple-600"
            style={{ top: `${(scrollProgress / 100) * 256 - 6}px` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="absolute inset-0 animate-pulse rounded-full bg-purple-600"></div>
          </motion.div>

          {[25, 50, 75, 100].map((milestone) => (
            <div
              key={milestone}
              className={`absolute -left-2 h-0.5 w-5 transition-colors duration-300 ${
                scrollProgress >= milestone
                  ? milestone === 100
                    ? "bg-yellow-400"
                    : "bg-green-400"
                  : "bg-slate-700"
              }`}
              style={{ top: `${(milestone / 100) * 256 - 1}px` }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {achievementUnlocked && (
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
          >
            <AchievementNotification
              title="ACHIEVEMENT UNLOCKED!"
              subtitle="Portfolio Explorer"
              description={`You've explored the entire portfolio! 🎉`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
