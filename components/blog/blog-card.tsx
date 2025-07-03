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
    <Link
      href={`/blog/${blog.id}`}
      className={cn(className, 'h-full flex flex-col')}
    >
      <CyberCard
        withCornerAccents={false}
        className='flex h-full flex-col rounded-none'
      >
        <div className='relative hidden h-48 overflow-hidden xl:block'>
          <Image
            src={blog.image_url || '/placeholder.svg'}
            alt={blog.title}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent'></div>
        </div>

        <CyberCardContent className='flex flex-1 flex-col justify-between rounded-none'>
          <div className='mb-4 flex justify-between gap-4 xl:mb-0 xl:block'>
            <div>
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
              {!!blog.excerpt && (
                <div className='xl:mb-8'>
                  <p className='line-clamp-3 italic leading-relaxed text-slate-300 md:line-clamp-4'>
                    {blog.excerpt}
                  </p>
                </div>
              )}
            </div>
            <div className='relative h-[53px] w-[80px] shrink-0  md:h-[107px] md:w-[160px] xl:hidden'>
              <Image
                src={blog.image_url || '/placeholder.svg'}
                alt={blog.title}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-105'
              />
            </div>
          </div>
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
