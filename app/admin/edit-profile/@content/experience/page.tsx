'use client';

import type React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import ExperienceEmptyState from '@/components/admin/edit-profile/experiences/experience-empty-state';
import ExperienceCard from '@/components/admin/edit-profile/experiences/experience-card';
import ExperienceFormDialog from '@/components/admin/edit-profile/experiences/exp-form-dialog';
import { useQueryClient } from '@tanstack/react-query';
import { Experience } from '@/lib/schemas/experience-schemas';
import { useDestroyExperience } from '@/hooks/experiences/mutations/use-destroy-experience';
import { useFetchExperiences } from '@/hooks/experiences/fetch/use-fetch-experiences';
import { Skeleton } from '@/components/ui/skeleton';

export default function ExperiencePage() {
  const queryClient = useQueryClient();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [experience, setExperience] = useState<Experience | null>(null);

  const { experiences, isLoading } = useFetchExperiences({
    initialPage: 1,
  });

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { mutateAsync: mutateDestroy } = useDestroyExperience();

  const refetchPage = () => {
    queryClient.refetchQueries({
      queryKey: ['experiences', 1, 50, ''],
      exact: true,
    });
  };

  const handleDelete = async (exp: Experience) => {
    setDeletingId(exp.id);
    await mutateDestroy(exp.id);
    setDeletingId(null);
    refetchPage();
  };

  const handleSave = () => {
    refetchPage();
    setDialogOpen(false);
    setExperience(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='space-y-6'
    >
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center font-mono text-lg text-slate-200'>
            <div className='mr-2 size-2 bg-purple-400'></div>
            WORK_EXPERIENCE
          </h3>
          <p className='mt-1 font-mono text-sm text-slate-400'>
            Manage your professional work history and career progression.
          </p>
        </div>
        <CyberButton
          variant='secondary'
          leftIcon={<Plus size={16} />}
          onClick={() => setDialogOpen(true)}
          className='px-2 md:px-4'
        >
          <span className='hidden md:inline'>ADD_EXPERIENCE</span>
        </CyberButton>
      </div>

      {/* Experience List */}
      <div className='space-y-4'>
        {isLoading && experiences.length === 0 ? (
          <>
            <Skeleton className='h-20 w-full bg-slate-800/50 sm:h-56' />
            <Skeleton className='h-20 w-full bg-slate-800/50 sm:h-56' />
            <Skeleton className='h-20 w-full bg-slate-800/50 sm:h-56' />
            <Skeleton className='h-20 w-full bg-slate-800/50 sm:h-56' />
          </>
        ) : (
          <>
            {experiences.length === 0 ? (
              <ExperienceEmptyState />
            ) : (
              experiences.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  onEdit={() => {
                    setExperience(experience);
                    setDialogOpen(true);
                  }}
                  deleting={experience.id === deletingId}
                  onDelete={handleDelete}
                />
              ))
            )}
          </>
        )}
      </div>
      <ExperienceFormDialog
        experience={experience}
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        onCancel={() => setDialogOpen(false)}
        onSave={handleSave}
      />
    </motion.div>
  );
}
