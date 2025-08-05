'use client';

import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { BlogAnalytics } from '@/lib/schemas/analytics-schemas';
import { Eye, Calendar, TrendingUp } from 'lucide-react';

interface BlogsTableProps {
  blogs: BlogAnalytics[];
}

export default function BlogsTable({ blogs }: BlogsTableProps) {
  if (!blogs || blogs.length === 0) {
    return (
      <CyberCard>
        <CyberCardContent className='p-6'>
          <div className='py-8 text-center'>
            <TrendingUp className='mx-auto mb-4 size-12 text-slate-400' />
            <h3 className='mb-2 font-mono text-lg text-slate-200'>
              NO_BLOG_VISITS
            </h3>
            <p className='text-slate-400'>
              No blog visits recorded in the selected time period
            </p>
          </div>
        </CyberCardContent>
      </CyberCard>
    );
  }

  return (
    <CyberCard>
      <CyberCardContent className='p-6'>
        <div className='mb-6'>
          <h3 className='mb-2 font-mono text-lg text-slate-100'>
            ALL_BLOG_VISITS
          </h3>
          <p className='text-sm text-slate-400'>
            Complete list of blog posts with visit counts
          </p>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-slate-700'>
                <th className='px-4 py-3 text-left font-mono text-sm text-slate-300'>
                  RANK
                </th>
                <th className='px-4 py-3 text-left font-mono text-sm text-slate-300'>
                  BLOG_TITLE
                </th>
                <th className='px-4 py-3 text-left font-mono text-sm text-slate-300'>
                  VISITS
                </th>
                <th className='px-4 py-3 text-left font-mono text-sm text-slate-300'>
                  LAST_VISITED
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <tr
                  key={blog.slug}
                  className={`border-b border-slate-800/50 transition-colors hover:bg-slate-800/30 ${
                    index === 0 ? 'bg-purple-500/5' : ''
                  }`}
                >
                  <td className='px-4 py-3'>
                    <div
                      className={`inline-flex size-8 items-center justify-center rounded-full font-mono text-sm font-bold ${
                        index === 0
                          ? 'bg-purple-600 text-white'
                          : index === 1
                          ? 'bg-slate-600 text-slate-200'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      #{index + 1}
                    </div>
                  </td>
                  <td className='px-4 py-3'>
                    <div className='max-w-xs'>
                      <p className='font-mono text-sm text-slate-200 truncate'>
                        {blog.title || blog.slug}
                      </p>
                      <p className='text-xs text-slate-500 truncate'>
                        /blogs/{blog.slug}
                      </p>
                    </div>
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex items-center space-x-2'>
                      <Eye className='size-4 text-slate-400' />
                      <span className='font-mono text-sm text-slate-300'>
                        {blog.visit_count.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex items-center space-x-2'>
                      <Calendar className='size-4 text-slate-400' />
                      <span className='font-mono text-xs text-slate-400'>
                        {new Date(blog.last_visited).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='mt-4 flex items-center justify-between text-sm text-slate-500'>
          <span>
            Showing {blogs.length} blog{blogs.length === 1 ? '' : 's'}
          </span>
          <span>
            Total visits:{' '}
            {blogs
              .reduce((sum, blog) => sum + blog.visit_count, 0)
              .toLocaleString()}
          </span>
        </div>
      </CyberCardContent>
    </CyberCard>
  );
}
