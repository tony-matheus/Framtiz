'use client';

import { motion } from 'framer-motion';
import { useOneTimeAnimation } from '@/hooks/use-one-time-animations';
import { Blog } from '@/lib/services/blog-service/helpers';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BlogCard from '@/components/blog/blog-card';

interface BlogPostsProps {
  blogs: Blog[];
}

export default function BlogPosts({ blogs }: BlogPostsProps) {
  const { ref, shouldAnimate } = useOneTimeAnimation(0.2);

  return (
    <section
      ref={ref}
      className='w-full border-y border-slate-800 bg-slate-950 font-mono'
      id='blog'
    >
      <div className='container mx-auto overflow-hidden px-4 py-24 md:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className='mb-16 text-center'
        >
          <h2 className='mb-6  text-4xl text-slate-100 md:text-6xl'>
            LATEST INSIGHTS
          </h2>
          <p className='mx-auto max-w-2xl font-mono text-xl text-slate-400'>
            Thoughts on technology, development, and innovation.
          </p>
        </motion.div>

        <div className='relative'>
          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={
              shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }
            }
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className='scrollbar-hide flex h-auto  min-h-0 flex-col gap-4 overflow-x-auto scroll-smooth xl:h-[460px] xl:flex-row xl:gap-8 xl:overflow-x-visible'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} className='xl:w-96' />
            ))}
          </motion.div>
        </div>

        {/* Simple View More Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='mt-16 text-center'
        >
          <Link
            href='/blog'
            className='font-mono text-slate-400 underline-offset-4 transition-colors duration-300 hover:text-slate-300 hover:underline'
          >
            <div className='inline-flex items-center gap-2'>
              View all articles
              <ArrowRight />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
