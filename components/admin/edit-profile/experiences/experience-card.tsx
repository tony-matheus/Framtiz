import type React from 'react';
import { Edit2, Trash2, Calendar, MapPin, Building } from 'lucide-react';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberStatusBadge } from '@/components/ui-custom/cyber-status-badge';
import { EMPLOYMENT_TYPES } from './constants';
import { formatElapsedDuration, getFormattedDate } from '@/lib/helpers/daytime';

export default function ExperienceCard({ experience, onEdit, onDelete }) {
  return (
    <CyberCard key={experience.id}>
      <CyberCardContent className='p-6'>
        <div className='mb-4 flex items-start justify-between'>
          <div className='flex-1'>
            <div className='mb-2 flex items-center gap-3'>
              <h4 className='font-mono text-lg text-slate-200'>
                {experience.position}
              </h4>
              {experience.isCurrentPosition && (
                <CyberStatusBadge status='online'>CURRENT</CyberStatusBadge>
              )}
              <CyberStatusBadge status='success'>
                {
                  EMPLOYMENT_TYPES.find(
                    (t) => t.value === experience.employmentType
                  )?.label
                }
              </CyberStatusBadge>
            </div>
            <div className='mb-2 flex items-center gap-4 font-mono text-sm text-slate-400'>
              <div className='flex items-center gap-1'>
                <Building size={14} />
                {experience.company}
              </div>
              <div className='flex items-center gap-1'>
                <MapPin size={14} />
                {experience.location}
              </div>
            </div>
            <div className='mb-3 flex items-center gap-1 font-mono text-sm text-slate-500'>
              <Calendar size={14} />
              {getFormattedDate(experience.startDate)} -{' '}
              {experience.endDate
                ? getFormattedDate(experience.endDate)
                : 'Present'}
              <span className='ml-2'>
                (
                {formatElapsedDuration(
                  experience.startDate,
                  experience.endDate
                )}
                )
              </span>
            </div>
            <p className='text-sm leading-relaxed text-slate-300'>
              {experience.description}
            </p>
          </div>
          <div className='ml-4 flex gap-2'>
            <CyberButton
              size='sm'
              variant='outline'
              onClick={() => onEdit(experience)}
              leftIcon={<Edit2 size={14} />}
            >
              EDIT
            </CyberButton>
            <CyberButton
              size='sm'
              variant='outline'
              onClick={() => onDelete(experience.id)}
              leftIcon={<Trash2 size={14} />}
              className='border-red-800 text-red-400 hover:bg-red-900/20'
            >
              DELETE
            </CyberButton>
          </div>
        </div>
      </CyberCardContent>
    </CyberCard>
  );
}
