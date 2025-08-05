'use client';

import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { BlogAnalytics } from '@/lib/schemas/analytics-schemas';
import { Eye } from 'lucide-react';
import EmptyState from '../empty-state';
import Link from 'next/link';

interface TopBlogsSectionProps {
  blogs: BlogAnalytics[];
}

export default function TopBlogsSection({ blogs }: TopBlogsSectionProps) {
  if (!blogs || blogs.length === 0) {
    return (
      <EmptyState title='No blog visits recorded in the selected time period' />
    );
  }

  return (
    <CyberCard>
      <CyberCardContent className='p-6'>
        <div className='mb-4'>
          <h3 className='mb-2 font-mono text-lg text-slate-100'>
            TOP_PERFORMING_BLOGS
          </h3>
          <p className='text-sm text-slate-400'>
            Most visited blog posts in the selected time period
          </p>
        </div>

        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {blogs.map((blog, index) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug}>
              <div
                className={`relative  border p-4 ${
                  index === 0
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-slate-700 bg-slate-800/50'
                }`}
              >
                {/* Rank badge */}
                <div
                  className={`absolute -left-2 -top-2 flex size-8 items-center justify-center rounded-full font-mono text-sm font-bold ${
                    index === 0
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-600 text-slate-200'
                  }`}
                >
                  #{index + 1}
                </div>

                {/* Blog info */}
                <div className='mt-2'>
                  <h4 className='mb-2 line-clamp-2 font-mono text-sm text-slate-200'>
                    {blog.title ?? blog.slug}
                  </h4>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <Eye className='size-4 text-slate-400' />
                      <span className='font-mono text-sm text-slate-300'>
                        {blog.visit_count}{' '}
                        {blog.visit_count === 1 ? 'visit' : 'visits'}
                      </span>
                    </div>

                    <div className='text-xs text-slate-500'>
                      {new Date(blog.last_visited).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Glow effect for top blog */}
                {index === 0 && (
                  <div className='pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-transparent' />
                )}
              </div>
            </Link>
          ))}
        </div>

        {blogs.length < 2 && (
          <div className='mt-4 text-center'>
            <p className='text-sm text-slate-500'>
              Only {blogs.length} blog{blogs.length === 1 ? ' has' : 's have'}{' '}
              been visited in this period
            </p>
          </div>
        )}
      </CyberCardContent>
    </CyberCard>
  );
}
