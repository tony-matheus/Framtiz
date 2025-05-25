'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { Plus } from 'lucide-react';
import ProjectEditorModal from '@/components/admin/projects/project-editor-modal';
import { CyberConfirmDialog } from '@/components/ui-custom/cyber-confirm-dialog';
import EmptyState from '@/components/admin/empty-state';
import { useProjectContext } from './contexts/project-context';
import { Project } from '@/lib/services/project-service';
import ProjectCard from '@/components/admin/projects/project-card';
import { useDeleteProject } from '@/lib/hooks/projects/use-delete-projects';

export default function ProjectsPage() {
  const {
    state: { projects },
    dispatch,
  } = useProjectContext();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [proejctToDelete, setProjectToDelete] = useState<Project | null>(null);

  const { mutateAsync, isPending: isDeleting } = useDeleteProject();

  const router = useRouter();

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setIsEditorOpen(true);
  };

  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteProject = async () => {
    if (!proejctToDelete) return;

    await mutateAsync(proejctToDelete.id);

    dispatch({ type: 'DELETE_PROJECT', projectId: proejctToDelete.id });
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
          onSave={() => {}}
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
