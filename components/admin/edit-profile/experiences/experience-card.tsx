import type React from 'react';
import { Edit2, Trash2, Calendar, MapPin, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberStatusBadge } from '@/components/ui-custom/cyber-status-badge';
import { formatElapsedDuration, getFormattedDate } from '@/lib/helpers/daytime';
import { EMPLOYMENT_TYPES, Experience } from '@/lib/schemas/experience-schemas';

interface ExperienceCardProps {
  experience: Experience;
  onEdit: (arg0: Experience) => void;
  onDelete: (arg0: Experience) => void;
  deleting?: boolean;
}

export default function ExperienceCard({
  experience,
  onEdit,
  onDelete,
  deleting = false,
}: ExperienceCardProps) {
  return (
    <CyberCard key={experience.id}>
      <CyberCardContent>
        <div className='flex items-start justify-between'>
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
            <div className=' flex items-center gap-1 font-mono text-sm text-slate-500'>
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
            {!!experience.description && (
              <p className='text-sm leading-relaxed text-slate-300'>
                {experience.description}
              </p>
            )}
          </div>
          <div className='ml-4 flex gap-2'>
            <Button
              size='icon'
              variant='outline'
              onClick={() => onEdit(experience)}
            >
              <Edit2 size={14} />
            </Button>
            <Button
              size='icon'
              variant='destructive'
              onClick={() => onDelete(experience)}
              isLoading={deleting}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </CyberCardContent>
    </CyberCard>
  );
}
