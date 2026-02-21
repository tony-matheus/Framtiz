import { motion } from "framer-motion"

export default function GridBackground() {
  return (
    <motion.div className="absolute inset-0 opacity-50">
      <div
        className="size-full"
        style={{
          backgroundImage: `
                  linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
                `,
          backgroundSize: "40px 40px",
        }}
      />
    </motion.div>
  )
}
