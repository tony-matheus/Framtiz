import { motion } from "framer-motion"
import ContentCard from "./content-card"

interface ExperienceCardProps {
  position: string
  company: string
  description: string
  period: string
  location: string
  shouldAnimate: boolean
  indicatorDelay: number
}

export default function ExperienceCard({
  period,
  shouldAnimate = true,
  indicatorDelay,
  ...props
}: ExperienceCardProps) {
  return (
    <div className="relative">
      {/* Connection Node */}
      <div className="absolute -left-2 -top-2 size-4 rounded-full border-2 border-slate-900 bg-gradient-to-br from-purple-500 to-green-400 transition-transform duration-300 group-hover:scale-125" />
      <ContentCard period={period} {...props} />

      {/* Floating Timeline Indicator */}
      <motion.div
        className="absolute right-0 whitespace-nowrap border border-slate-600 bg-slate-900/80 px-2 py-1 text-xs text-slate-300"
        initial={{ opacity: 0, y: 10 }}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: indicatorDelay }} //index * 0.2 + 0.5 }}
      >
        {period}
      </motion.div>
    </div>
  )
}
