import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { CyberFormField } from '@/components/ui-custom/cyber-form-field';
import { Building, Briefcase, Calendar, MapPin } from 'lucide-react';
import { EMPLOYMENT_TYPES } from './constants';

const experienceSchema = z.object({
  company: z.string().min(1),
  position: z.string().min(1),
  location: z.string().min(1),
  employmentType: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  isCurrentPosition: z.boolean().default(false),
  description: z.string().min(1),
});

export default function ExperienceForm({
  editingId,
  defaultValues,
  onSubmit,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues,
  });

  const isCurrentPosition = watch('isCurrentPosition');

  return (
    <CyberCard>
      <CyberCardContent className='p-6'>
        <h4 className='mb-4 flex items-center font-mono text-sm text-slate-300'>
          <div className='mr-2 size-1 bg-green-400'></div>
          {editingId ? 'EDIT_EXPERIENCE' : 'ADD_NEW_EXPERIENCE'}
        </h4>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <CyberFormField
              label='COMPANY'
              icon={<Building size={16} className='text-slate-500' />}
              {...register('company')}
              error={errors.company?.message}
              required
            />

            <CyberFormField
              label='POSITION'
              icon={<Briefcase size={16} className='text-slate-500' />}
              {...register('position')}
              error={errors.position?.message}
              required
            />

            <CyberFormField
              label='LOCATION'
              icon={<MapPin size={16} className='text-slate-500' />}
              {...register('location')}
              error={errors.location?.message}
              required
            />

            <div>
              <label className='mb-2 block font-mono text-xs text-slate-400'>
                EMPLOYMENT_TYPE
              </label>
              <select
                {...register('employmentType')}
                className='w-full border border-slate-700 bg-slate-900 p-3 font-mono text-sm text-slate-200 focus:border-purple-500 focus:outline-none'
              >
                {EMPLOYMENT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <CyberFormField
              label='START_DATE'
              type='month'
              icon={<Calendar size={16} className='text-slate-500' />}
              {...register('startDate')}
              error={errors.startDate?.message}
              required
            />

            <div>
              <CyberFormField
                label='END_DATE'
                type='month'
                icon={<Calendar size={16} className='text-slate-500' />}
                {...register('endDate')}
                disabled={isCurrentPosition}
              />
              <div className='mt-2 flex items-center'>
                <input
                  type='checkbox'
                  id='isCurrentPosition'
                  {...register('isCurrentPosition')}
                  className='mr-2'
                />
                <label
                  htmlFor='isCurrentPosition'
                  className='font-mono text-xs text-slate-400'
                >
                  CURRENT_POSITION
                </label>
              </div>
            </div>
          </div>

          <CyberFormField
            label='DESCRIPTION'
            multiline
            rows={4}
            {...register('description')}
            error={errors.description?.message}
            required
          />

          <div className='flex gap-2'>
            <CyberButton type='submit' variant='secondary'>
              {editingId ? 'UPDATE_EXPERIENCE' : 'ADD_EXPERIENCE'}
            </CyberButton>
            <CyberButton type='button' variant='outline' onClick={onCancel}>
              CANCEL
            </CyberButton>
          </div>
        </form>
      </CyberCardContent>
    </CyberCard>
  );
}
