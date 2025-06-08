import { Blog } from '@/lib/services/blog-service';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { CyberCard } from '../ui-custom/cyber-card';
import { CyberStatusBadge } from '../ui-custom/cyber-status-badge';
import Image from 'next/image';
import { CyberButton } from '../ui-custom/cyber-button';
import Link from 'next/link';

interface FeatureBlogProps {
  blog: Blog;
}

export default function FeatureBlog({ blog }: FeatureBlogProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Link href={`/blog/${blog.id}`}>
        <CyberCard
          className='group relative cursor-pointer border-purple-500/80 transition-colors duration-300 hover:border-purple-600'
          withCornerAccents
        >
          {/* Featured badge */}
          <div className='absolute left-4 top-4 z-10'>
            <CyberStatusBadge status='success'>FEATURED</CyberStatusBadge>
          </div>

          {/* Image */}
          <div className='relative h-64 overflow-hidden rounded-xl md:h-96'>
            <Image
              src={blog.image_url || '/placeholder.svg'}
              alt={blog.title}
              fill
              className='object-cover transition-transform duration-700 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent'></div>

            {/* Grid overlay */}
            <div className='absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] opacity-30'></div>
          </div>

          {/* Content overlay */}
          <div className='absolute inset-x-0 bottom-0 rounded-xl p-6 md:p-8'>
            <div className='mb-4 flex flex-wrap gap-2'>
              {/* {blog.tags.slice(0, 3).map((tag) => ( */}
              {['Performance', 'Optimization', 'Web Vitals', 'Monitoring']
                .slice(0, 3)
                .map((tag) => (
                  <span
                    key={`${blog.id}_${tag}`}
                    className='border border-purple-900/50 bg-slate-800/80 px-2 py-1 text-xs text-purple-300 backdrop-blur-sm'
                  >
                    <Tag size={10} className='mr-1 inline' />
                    {tag}
                  </span>
                ))}
            </div>

            <h2 className='mb-4 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-purple-500 md:text-4xl'>
              {blog.title}
            </h2>

            {/* <p className='mb-6 max-w-3xl text-lg leading-relaxed text-slate-300'>
                {blog.excerpt}
              </p> */}

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-6 text-sm text-slate-400'>
                <div className='flex items-center'>
                  <Calendar size={16} className='mr-2 text-green-400' />
                  {formatDate(blog.updated_at!)}
                </div>
                <div className='flex items-center'>
                  <Clock size={16} className='mr-2 text-purple-400' />
                  {/* {blog.readTime} */}2 min
                </div>
              </div>

              <CyberButton>
                READ_ARTICLE
                <ArrowRight
                  size={16}
                  className='ml-2 transition-transform group-hover:translate-x-1'
                />
              </CyberButton>
            </div>
          </div>
        </CyberCard>
      </Link>
    </>
  );
}
