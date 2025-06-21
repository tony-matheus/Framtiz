'use client';

import ReactMarkdown from 'react-markdown';
import { motion, useScroll } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Tag,
  User,
} from 'lucide-react';

import { CyberButton } from '@/components/ui-custom/cyber-button';
import Link from 'next/link';
import Image from 'next/image';
import { CyberStatusBadge } from '@/components/ui-custom/cyber-status-badge';
import { Blog } from '@/lib/services/blog-service/helpers';

export default function BlogPost({ blog }: { blog: Blog }) {
  const { scrollYProgress } = useScroll();

  return (
    <div>
      {/* Reading Progress Bar */}
      <div className='fixed left-0 top-0 z-50 h-1 w-full bg-slate-800'>
        <motion.div
          id='scroll-indicator'
          className='fixed inset-0 h-1 bg-gradient-to-r from-purple-600 to-green-400'
          style={{
            scaleX: scrollYProgress,
            originX: 0,
          }}
        />
      </div>
      {/* Decorative elements */}
      <div className='absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-purple-600 to-green-400'></div>
      <div className='absolute right-0 top-0 h-40 w-1 bg-purple-600'></div>
      <div className='absolute bottom-0 left-0 h-1 w-40 bg-green-400'></div>

      {/* Grid background */}
      <div className='absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] '></div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm'
      >
        <div className=' mx-auto p-4'>
          <div className='flex items-center justify-between'>
            <Link
              href='/blog'
              className='group inline-flex items-center text-sm text-slate-400 transition-colors duration-300 hover:text-purple-400'
              prefetch={true}
            >
              <ArrowLeft className='mr-2 size-4 transition-transform group-hover:-translate-x-1' />
              <span className='font-mono'> BACK_TO_BLOG</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Article Container - Digital Book Style */}
      <div className='container relative z-10 mx-auto max-w-4xl px-4 py-8'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='relative'
        >
          {/* Digital Book Frame */}
          <div className='relative overflow-hidden border-2 border-slate-800 bg-slate-900'>
            {/* Corner decorations */}
            <div className='absolute -left-1 -top-1 size-4 bg-purple-600'></div>
            <div className='absolute -right-1 -top-1 size-4 bg-green-400'></div>
            <div className='absolute -bottom-1 -left-1 size-4 bg-green-400'></div>
            <div className='absolute -bottom-1 -right-1 size-4 bg-purple-600'></div>

            {/* Digital scan lines */}
            <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_98%,rgba(139,92,246,0.03)_100%)] bg-[length:100%_4px]'></div>

            {/* Header Image */}
            <div className='relative h-64 overflow-hidden md:h-80'>
              <Image
                src={blog.image_url || '/placeholder.svg'}
                alt={blog.title}
                fill
                className='object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent'></div>

              {/* Glitch effect overlay */}
              <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_98%,rgba(139,92,246,0.1)_100%)] bg-[length:3px_100%]'></div>
            </div>

            {/* Article Content */}
            <div className='p-6 md:p-12'>
              {/* Article Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='mb-8'
              >
                {/* Category and Status */}
                <div className='mb-4 flex items-center gap-3'>
                  <CyberStatusBadge status='online'>
                    {/* {blog.category} */}
                  </CyberStatusBadge>
                  <div className='font-mono text-xs text-slate-500'>
                    FILE_ID: {blog.title.toUpperCase()}
                  </div>
                </div>

                {/* Title */}
                <h1 className='mb-6 bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-3xl font-bold leading-tight text-transparent md:text-5xl'>
                  {blog.title}
                </h1>

                {/* Meta Information */}
                <div className='mb-6 flex flex-wrap items-center gap-6 text-sm text-slate-400'>
                  <div className='flex items-center'>
                    <User size={16} className='mr-2 text-purple-400' />
                    Willian Frantz
                  </div>
                  <div className='flex items-center'>
                    <Calendar size={16} className='mr-2 text-green-400' />
                    {/* {formatDate(blog.publishedAt)} */}
                  </div>
                  <div className='flex items-center'>
                    <Clock size={16} className='mr-2 text-purple-400' />2 min
                    {/* {blog.readTime} */}
                  </div>
                </div>

                {/* Tags */}
                <div className='mb-8 flex flex-wrap gap-2'>
                  {/* {blog.tags.map((tag: string) => ( */}
                  {[
                    'Performance',
                    'Optimization',
                    'Web Vitals',
                    'Monitoring',
                  ].map((tag: string) => (
                    <span
                      key={tag}
                      className='flex cursor-pointer items-center border border-purple-900/50 bg-slate-800 px-3 py-1 text-xs text-purple-300 transition-colors hover:bg-purple-900/20'
                    >
                      <Tag size={10} className='mr-1' />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Excerpt */}
                {/* <div className='mb-8 border-l-4 border-purple-600 bg-slate-800/50 p-4'>
                  <p className='italic leading-relaxed text-slate-300'>
                    {blog.excerpt}
                  </p>
                </div> */}
              </motion.div>

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='prose prose-invert prose-lg max-w-none'
              >
                {blog.content ? (
                  <ReactMarkdown>{blog.content}</ReactMarkdown>
                ) : (
                  <div className='italic text-slate-500'>
                    No content to preview
                  </div>
                )}
              </motion.div>

              {/* Article Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className='mt-12 border-t border-slate-800 pt-8'
              >
                <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
                  <div className='font-mono text-sm text-slate-400'>
                    END_OF_FILE • ARTICLE_COMPLETE
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Digital Book Binding Effect */}
            <div className='absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-purple-600 via-slate-700 to-green-400'></div>
            <div className='absolute inset-y-0 left-1 w-px bg-slate-600'></div>
            <div className='absolute inset-y-0 left-3 w-px bg-slate-700'></div>
          </div>

          {/* Page Navigation */}
          <div className='mt-8 hidden items-center justify-between'>
            <CyberButton
              variant='outline'
              className='cursor-not-allowed opacity-50'
            >
              <ChevronLeft size={16} className='mr-2' />
              PREV_ARTICLE
            </CyberButton>

            <div className='font-mono text-xs text-slate-500'>
              PAGE_01 / DIGITAL_ARCHIVE
            </div>

            <CyberButton
              variant='outline'
              className='cursor-not-allowed opacity-50'
            >
              NEXT_ARTICLE
              <ChevronRight size={16} className='ml-2' />
            </CyberButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
