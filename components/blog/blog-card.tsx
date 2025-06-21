import { Blog } from '@/lib/services/blog-service/helpers';
import Image from 'next/image';
import Link from 'next/link';
import { CyberCard, CyberCardContent } from '../ui-custom/cyber-card';
import { Calendar, Clock } from 'lucide-react';
import { getTimeToReadText } from '@/lib/helpers/get-time-to-read-text';
import { getFormattedDate } from '@/lib/helpers/daytime';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  blog: Blog;
  className?: string;
}
export default function BlogCard({ blog, className }: BlogCardProps) {
  return (
    <Link href={`/blog/${blog.id}`} className={cn(className)}>
      <CyberCard withCornerAccents={false} className='rounded-none'>
        <div className='relative h-48 overflow-hidden'>
          <Image
            src={blog.image_url || '/placeholder.svg'}
            alt={blog.title}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent'></div>

          {/* Category badge */}
          {/* <div className='absolute left-3 top-3'>
            <span className='border border-purple-900/50 bg-slate-800/90 px-2 py-1 text-xs text-purple-300 backdrop-blur-sm'>
              {blog.category}
            </span>
          </div> */}
        </div>

        <CyberCardContent className='rounded-none'>
          <h3 className='mb-3 line-clamp-2 h-[56px] text-xl font-bold text-slate-200 transition-colors duration-300 group-hover:text-purple-300'>
            {blog.title}
          </h3>

          <div className='mb-4  hidden flex-wrap gap-1'>
            {/* {blog.tags.slice(0, 2).map((tag) => ( */}
            {['Performance', 'Optimization', 'Web Vitals', 'Monitoring']
              .slice(0, 2)
              .map((tag) => (
                <span
                  key={tag}
                  className='border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-400'
                >
                  {tag}
                </span>
              ))}
          </div>
          {/* Excerpt */}
          {blog.excerpt && (
            <div className='mb-8 hidden border-l-4 border-purple-600 bg-slate-800/50 p-4'>
              <p className='italic leading-relaxed text-slate-300'>
                {blog.excerpt}
              </p>
            </div>
          )}

          {/* Meta info */}
          <div className='flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-500'>
            <div className='flex items-center'>
              <Calendar size={12} className='mr-1' />
              {getFormattedDate(blog.updated_at ?? '')}
            </div>
            <div className='flex items-center'>
              <Clock size={12} className='mr-1' />
              {getTimeToReadText({ text: blog.content })}
            </div>
          </div>
        </CyberCardContent>
      </CyberCard>
    </Link>
  );
}
