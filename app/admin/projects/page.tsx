'use client';

import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberPagination } from '@/components/ui-custom/cyber-pagination';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { Plus } from 'lucide-react';
import ProjectEditorModal from '@/components/admin/projects/project-editor-modal';
import { CyberConfirmDialog } from '@/components/ui-custom/cyber-confirm-dialog';
import EmptyState from '@/components/admin/empty-state';
import { Project } from '@/lib/services/project-service';
import ProjectCard from '@/components/admin/projects/project-card';
import { useDeleteProject } from '@/hooks/projects/mutations/use-delete-projects';
import { useQueryClient } from '@tanstack/react-query';
import { useSuspenseFetchProjects } from '@/hooks/projects/fetch/use-suspense-fetch-projects';
import CyberSearchInput from '@/components/ui-custom/inputs/cyber-search-input';

export default function ProjectsPage() {
  const queryClient = useQueryClient();

  const [term, setTerm] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [proejctToDelete, setProjectToDelete] = useState<Project | null>(null);

  const { mutateAsync: mutateDestroy, isPending: isDeleting } =
    useDeleteProject();

  const { projects, totalPages, currentPage, goToPage } =
    useSuspenseFetchProjects({
      initialPage: 1,
      title: term,
      limit: 2,
    });

  const refetchPage = (page: number, term = '') => {
    queryClient.refetchQueries({
      queryKey: ['blogs', term, page],
      exact: true,
    });
  };

  const router = useRouter();

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setIsEditorOpen(true);
  };

  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteConfirmOpen(true);
  };

  const handleSaveProject = () => {
    setIsEditorOpen(false);
    if (currentProject) {
      refetchPage(currentPage, term);
      return setCurrentProject(null);
    }
    goToPage(1);
    refetchPage(1, '');
  };

  const confirmDeleteProject = async () => {
    if (!proejctToDelete) return;

    await mutateDestroy(proejctToDelete.id);

    refetchPage(currentPage, term);
    setIsDeleteConfirmOpen(false);
  };

  const navigateToProjectSelector = () => {
    router.push('/admin/project-select');
  };

  return (
    <>
      <div className=''>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-4 flex flex-col items-start justify-end gap-4 py-4 md:flex-row md:items-center'
        >
          <CyberSearchInput onSearch={setTerm} />
          <CyberButton
            variant='primary'
            leftIcon={<Plus size={16} />}
            onClick={navigateToProjectSelector}
            className='md:self-end'
          >
            ADD_PROJECT
          </CyberButton>
        </motion.div>

        {/* Selected Projects */}
        {projects.length > 0 ? (
          <>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {projects.map((project) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  key={project.id}
                >
                  <ProjectCard
                    {...project}
                    githubUrl={project.github_url}
                    onEdit={() => handleEditProject(project)}
                    onDelete={() => handleDeleteProject(project)}
                  />
                </motion.div>
              ))}
            </div>
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='mb-12 mt-8'
              >
                <CyberCard className='mx-auto inline-block'>
                  <CyberCardContent className='p-2 sm:p-4'>
                    <CyberPagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onPageChange={goToPage}
                    />
                  </CyberCardContent>
                </CyberCard>
              </motion.div>
            )}
          </>
        ) : (
          <EmptyState
            title='NO_PROJECTS_SELECTED'
            description="You haven't selected Project projects to display on your portfolio yet."
            actionLabel='ADD_PROJECT'
            onAction={navigateToProjectSelector}
          />
        )}
      </div>

      {/* Project Editor Modal */}
      {currentProject && (
        <ProjectEditorModal
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          selectedRepo={currentProject}
          onSave={handleSaveProject}
          className='cyber-project-editor'
        />
      )}

      {/* Delete Confirmation Dialog */}
      <CyberConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDeleteProject}
        title='CONFIRM_DELETION'
        description={`Are you sure you want to remove ${proejctToDelete?.title} from your portfolio? This action cannot be undone.`}
        confirmText='DELETE_PROJECT'
        cancelText='CANCEL'
        variant='danger'
        isLoading={isDeleting}
      />
    </>
  );
}
