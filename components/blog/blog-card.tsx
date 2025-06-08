import { Blog } from '@/lib/services/blog-service';
import Image from 'next/image';
import Link from 'next/link';
import { CyberCard, CyberCardContent } from '../ui-custom/cyber-card';
import { Calendar, Clock } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
}
export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blog/${blog.id}`}>
      <CyberCard>
        <div className='relative h-48 overflow-hidden rounded-t-xl'>
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

        <CyberCardContent>
          <h3 className='mb-3 line-clamp-2 text-xl font-bold text-slate-200 transition-colors duration-300 group-hover:text-purple-300'>
            {blog.title}
          </h3>

          {/* <p className='mb-4 line-clamp-3 text-sm leading-relaxed text-slate-400'>
            {blog.excerpt}
          </p> */}

          {/* Tags */}
          <div className='mb-4 flex flex-wrap gap-1'>
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
            {/* {blog.tags.length > 2 && (
              <span className='px-2 py-1 text-xs text-slate-500'>
                +{blog.tags.length - 2} more
              </span>
            )} */}
          </div>

          {/* Meta info */}
          <div className='flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-500'>
            <div className='flex items-center'>
              <Calendar size={12} className='mr-1' />
              {/* {formatDate(blog.publishedAt)} */}
            </div>
            <div className='flex items-center'>
              <Clock size={12} className='mr-1' />2 min
              {/* {blog.readTime} */}
            </div>
          </div>
        </CyberCardContent>
      </CyberCard>
    </Link>
  );
}
