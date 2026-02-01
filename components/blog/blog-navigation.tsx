import { motion } from "framer-motion"
import { ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"

export default function BlogNavigation({
  link,
  text,
}: {
  link: string
  text: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm"
    >
      <div className="container mx-auto p-4 ">
        <div className="flex items-center justify-between">
          <Link
            href={link}
            className="group inline-flex w-32 items-center text-sm text-green-400 transition-colors duration-300 hover:text-purple-400"
            prefetch={true}
          >
            <ArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-mono">{text}</span>
          </Link>
          <div className="flex items-center justify-center">
            <BookOpen className="mr-3 text-purple-400" size={24} />
            <h1 className="bg-gradient-to-r from-purple-400 via-purple-600 to-green-400 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
              BLOG
            </h1>
          </div>
          <div className="w-32 bg-red-300" />
        </div>
      </div>
    </motion.div>
  )
}
