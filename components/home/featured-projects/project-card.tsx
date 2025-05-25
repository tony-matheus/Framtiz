import { CyberButton } from '@/components/ui-custom/cyber-button';
import { Github, Share } from 'lucide-react';
// import Image from 'next/image';

interface ProjectCardProps {
  image: string;
  title: string;
  description?: string;
  onClick: () => void;
  url?: string;
}

export default function ProjectCard({
  image,
  title,
  description,
  onClick,
  url,
}: ProjectCardProps) {
  return (
    <div className='group relative h-[400px] overflow-hidden bg-slate-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10'>
      {/* Background Image */}
      <div className='absolute inset-0'>
        <img
          src={image || '/placeholder.svg'}
          alt={title}
          className='size-full object-cover transition-transform duration-700 group-hover:scale-105'
        />
        {/* Blur overlay */}
        <div className='absolute inset-0 bg-slate-900/70 backdrop-blur-[1px] transition-all duration-500 group-hover:backdrop-blur-[2px]'></div>
      </div>

      {/* Content Overlay */}
      <div className='absolute inset-0 flex flex-col justify-end p-6'>
        {/* Category Badge */}
        {/* TODO: Create badge component */}
        {/* <div className='self-start'>
          <span className='px-3 py-1 text-xs font-medium bg-slate-800/90 text-slate-300 border border-slate-700 backdrop-blur-sm'>
            {project.category}
          </span>
        </div> */}

        {/* Project Info */}
        <div className='space-y-4'>
          <div>
            <h3 className='mb-3 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-purple-300'>
              {title}
            </h3>
            {description && (
              <p className='text-sm leading-relaxed text-slate-300'>
                {description}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className='flex gap-2 opacity-80 transition-opacity duration-300 group-hover:opacity-100'>
            {url && (
              <a
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center border border-slate-700 bg-slate-800/90 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-slate-600 hover:bg-slate-700/90 hover:text-white'
              >
                <Github className='mr-2 size-4' />
                Code
              </a>
            )}

            <CyberButton
              size='sm'
              onClick={onClick}
              // className='flex items-center px-3 py-2 bg-slate-800/90 hover:bg-slate-700/90 text-slate-300 hover:text-white transition-all duration-300 text-sm backdrop-blur-sm border border-slate-700 hover:border-slate-600'
            >
              <Share className='size-4' />
            </CyberButton>
          </div>
        </div>
      </div>
    </div>
  );
}
