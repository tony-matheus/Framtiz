import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export default function GistSelectorSkeleton({ count = 10 }) {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <motion.div
            key={`skeleton-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
          >
            <Skeleton
              className={cn(
                "w-full border-b border-slate-300/50 bg-slate-800/50",
                index === 0 ? "h-[41px]" : "h-[57px]",
              )}
            />
          </motion.div>
        ))}
    </>
  )
}
