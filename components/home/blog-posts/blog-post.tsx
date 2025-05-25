import { Calendar } from 'lucide-react';

interface BlogPostProps {
  id: number;
  title: string;
  image: string;
  date?: string;
}

export default function BlogPost({ id, title, image, date }: BlogPostProps) {
  return (
    <article
      key={id}
      className='group w-96 flex-none cursor-pointer transition-transform duration-500 hover:-translate-y-2'
    >
      {/* Image Container */}
      <div className='relative mb-6 h-64 overflow-hidden border border-slate-700 bg-slate-800 transition-colors duration-300 group-hover:border-slate-600'>
        <img
          src={image}
          alt={title}
          className='size-full object-cover transition-transform duration-700 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent'></div>

        {/* Category Badge */}
        <div className='absolute left-4 top-4'>
          {/* <span className='px-3 py-1 text-xs font-medium bg-slate-900/90 text-slate-300 backdrop-blur-sm border border-slate-700'>
            {post.category}
          </span> */}
        </div>
      </div>

      {/* Content */}
      <div className='space-y-4 px-2'>
        {/* Meta Information */}
        {date && (
          <div className='flex items-center gap-4 text-sm text-slate-500'>
            <Calendar className='mr-1 size-4' />
            {new Date(date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        )}

        {/* Title */}
        <h3 className='text-xl font-semibold leading-tight text-slate-100 transition-colors duration-300 group-hover:text-purple-300'>
          {title}
        </h3>

        {/* Excerpt */}
        {/* <p className='text-slate-400 leading-relaxed text-sm'>{post.excerpt}</p> */}
      </div>
    </article>
  );
}
