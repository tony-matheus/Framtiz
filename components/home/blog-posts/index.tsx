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
      <div className='container mx-auto overflow-hidden py-24'>
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

        {/* Carousel Container */}
        <div className='relative'>
          {/* Navigation Buttons
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={cn(
              'absolute left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-slate-800/90 backdrop-blur-sm border border-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110',
              canScrollLeft
                ? 'text-slate-300 hover:bg-slate-700/90 hover:text-white hover:border-slate-600'
                : 'text-slate-600 cursor-not-allowed opacity-50'
            )}
          >
            <ChevronLeft className='w-6 h-6' />
          </button>

          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-slate-800/90 backdrop-blur-sm border border-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              canScrollRight
                ? 'text-slate-300 hover:bg-slate-700/90 hover:text-white hover:border-slate-600'
                : 'text-slate-600 cursor-not-allowed opacity-50'
            }`}
          >
            <ChevronRight className='w-6 h-6' />
          </button> */}

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={
              shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }
            }
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className='scrollbar-hide flex flex-row gap-8 overflow-x-auto scroll-smooth'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} className='w-96 shrink-0' />
            ))}
          </motion.div>

          {/* Pagination Dots
          <div className='flex justify-center mt-12 gap-2'>
            {blogPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentIndex
                    ? 'bg-purple-500 w-8'
                    : 'bg-slate-600 hover:bg-slate-500 w-2'
                }`}
              />
            ))}
          </div> */}
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
