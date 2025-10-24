import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BlogHeader() {
  return (
    <div className='relative z-30 pb-6'>
      {/* Back to home link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href='/'
          className='group inline-flex items-center text-sm text-green-400 transition-colors duration-300 hover:text-purple-400'
          prefetch={true}
        >
          <ArrowLeft className='mr-2 size-4 transition-transform group-hover:-translate-x-1' />
          <span className='font-mono'>BACK_TO_HOME</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className='text-center'
      >
        <div className='mb-4 flex items-center justify-center'>
          <BookOpen className='mr-3 text-purple-400' size={24} />
          <h1 className='bg-gradient-to-r from-purple-400 via-purple-600 to-green-400 bg-clip-text text-3xl font-bold text-transparent md:text-5xl'>
            DIGITAL_INSIGHTS
          </h1>
        </div>

        <p className='mx-auto max-w-2xl font-mono text-base leading-relaxed text-slate-300'>
          Exploring the intersection of technology, development, and innovation.
        </p>
      </motion.div>
    </div>
  );
}
