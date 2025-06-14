import { Building, Calendar, MapPin } from 'lucide-react';

interface ContentCardProps {
  position: string;
  company: string;
  description: string;
  period: string;
  location: string;
}

export default function ContentCard({
  position,
  company,
  description,
  period,
  location,
}: ContentCardProps) {
  return (
    <div className='w-72 border border-slate-700 bg-slate-800/90 p-4 backdrop-blur-sm transition-all duration-300 group-hover:border-purple-500/50 group-hover:shadow-xl group-hover:shadow-purple-500/20'>
      {/* Header */}
      <div className='mb-3 flex items-start'>
        <div className='mr-3 flex size-8 items-center justify-center border border-slate-600 bg-slate-700 transition-colors duration-300 group-hover:border-purple-500'>
          <Building className='size-4 text-green-400' />
        </div>
        <div className='min-w-0 flex-1'>
          <h3 className='text-sm font-semibold leading-tight text-slate-100 transition-colors duration-300 group-hover:text-purple-300'>
            {position}
          </h3>
          <p className='truncate text-xs font-medium text-green-400'>
            {company}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className='mb-3 line-clamp-2 text-xs leading-relaxed text-slate-300'>
        {description}
      </p>

      {/* Meta Information */}
      <div className='space-y-1 text-xs text-slate-400'>
        <div className='flex items-center'>
          <Calendar className='mr-2 size-3 shrink-0' />
          <span className='truncate'>{period}</span>
        </div>
        <div className='flex items-center'>
          <MapPin className='mr-2 size-3 shrink-0' />
          <span className='truncate'>{location}</span>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/10 to-green-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
    </div>
  );
}
