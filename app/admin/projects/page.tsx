'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/admin-header';
import AdminLayout from '@/components/admin/admin-layout';
import { CyberSectionHeader } from '@/components/ui-custom/cyber-section-header';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import SystemFooter from '@/components/admin/system-footer';
import { Edit, Plus, Trash2, ExternalLink } from 'lucide-react';
import ProjectEditorModal from '@/components/admin/project-editor-modal';
import { CyberConfirmDialog } from '@/components/ui-custom/cyber-confirm-dialog';
import EmptyState from '@/components/admin/empty-state';

// Mock data for selected projects
const mockSelectedRepos = [
  {
    id: 1,
    name: 'neural-net',
    full_name: 'janedeveloper/neural-net',
    description:
      'AI-powered content generation platform with advanced language models',
    language: 'TypeScript',
    stargazers_count: 124,
    forks_count: 18,
    updated_at: '2025-04-28T14:32:18Z',
    level: 'LVL 86',
    status: 'ONLINE',
  },
  {
    id: 2,
    name: 'crypto-vault',
    full_name: 'janedeveloper/crypto-vault',
    description: 'Secure blockchain wallet with multi-signature authentication',
    language: 'JavaScript',
    stargazers_count: 87,
    forks_count: 12,
    updated_at: '2025-05-02T09:15:42Z',
    level: 'LVL 72',
    status: 'STABLE',
  },
  {
    id: 3,
    name: 'shadow-proxy',
    full_name: 'janedeveloper/shadow-proxy',
    description: 'Advanced VPN service with encrypted traffic routing',
    language: 'Rust',
    stargazers_count: 215,
    forks_count: 34,
    updated_at: '2025-05-08T16:47:23Z',
    level: 'LVL 94',
    status: 'SECURE',
  },
];

export default function ProjectsPage() {
  const [selectedRepos, setSelectedRepos] = useState<any[]>(mockSelectedRepos);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentRepo, setCurrentRepo] = useState<any>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [repoToDelete, setRepoToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const systemStatus = {
    security: 'SECURE',
    connection: 'STABLE',
    lastSync: '2025-05-11 10:42:18',
  };

  const handleEditRepo = (repo: any) => {
    setCurrentRepo(repo);
    setIsEditorOpen(true);
  };

  const handleSaveRepo = (updatedRepo: any) => {
    setSelectedRepos(
      selectedRepos.map((repo) =>
        repo.id === updatedRepo.id ? updatedRepo : repo
      )
    );
  };

  const handleDeleteRepo = (repo: any) => {
    setRepoToDelete(repo);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteRepo = () => {
    setIsDeleting(true);
    // Simulate API call
    setTimeout(() => {
      setSelectedRepos(
        selectedRepos.filter((repo) => repo.id !== repoToDelete.id)
      );
      setIsDeleting(false);
      setIsDeleteConfirmOpen(false);
    }, 1000);
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
          className='mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'
        >
          <CyberSectionHeader
            title='PORTFOLIO_PROJECTS'
            subtitle='Manage your selected projects for display on your portfolio.'
          >
            PROJECT_MANAGEMENT
          </CyberSectionHeader>

          <CyberButton
            variant='primary'
            leftIcon={<Plus size={16} />}
            onClick={navigateToProjectSelector}
            className='md:self-end'
          >
            ADD_NEW_PROJECT
          </CyberButton>
        </motion.div>

        {/* Selected Projects */}
        {selectedRepos.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {selectedRepos.map((repo) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * repo.id }}
              >
                <CyberCard className='h-full cyber-card-with-accents hover:border-purple-600 transition-colors'>
                  <CyberCardContent>
                    <div className='flex justify-between items-start mb-3'>
                      <h3 className='text-lg font-mono text-slate-200'>
                        {repo.name}
                      </h3>
                      <div className='flex gap-2'>
                        <CyberButton
                          variant='outline'
                          size='icon'
                          className='h-7 w-7'
                          onClick={() => handleEditRepo(repo)}
                        >
                          <Edit size={14} />
                        </CyberButton>
                        <CyberButton
                          variant='outline'
                          size='icon'
                          className='h-7 w-7'
                          onClick={() => handleDeleteRepo(repo)}
                        >
                          <Trash2 size={14} />
                        </CyberButton>
                      </div>
                    </div>

                    <div className='mb-3'>
                      <div className='text-xs text-slate-400 mb-1 font-mono'>
                        STATUS
                      </div>
                      <div className='flex items-center'>
                        <span className='w-2 h-2 bg-green-400 mr-2 animate-pulse'></span>
                        <span className='text-green-400 text-sm font-mono'>
                          {repo.status}
                        </span>
                      </div>
                    </div>

                    <p className='text-sm text-slate-400 mb-3'>
                      {repo.description}
                    </p>

                    <div className='flex flex-wrap gap-2 mb-4'>
                      <span className='px-2 py-1 text-xs bg-slate-800 text-purple-300 border border-purple-900 flex items-center'>
                        <span className='w-1 h-1 bg-green-400 mr-1'></span>
                        {repo.language}
                      </span>
                      <span className='px-2 py-1 text-xs bg-slate-800 text-purple-300 border border-purple-900'>
                        {repo.level}
                      </span>
                    </div>

                    <div className='flex justify-between items-center text-xs text-slate-500 mt-auto pt-2 border-t border-slate-800'>
                      <div className='flex items-center'>
                        <span>Stars: {repo.stargazers_count}</span>
                        <span className='mx-2'>•</span>
                        <span>Forks: {repo.forks_count}</span>
                      </div>
                      <a
                        href={`https://github.com/${repo.full_name}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-purple-400 hover:text-green-400 transition-colors flex items-center'
                      >
                        <ExternalLink size={12} className='mr-1' />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </CyberCardContent>
                </CyberCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState
            title='NO_PROJECTS_SELECTED'
            description="You haven't selected any projects to display on your portfolio yet."
            actionLabel='ADD_PROJECT'
            onAction={navigateToProjectSelector}
          />
        )}
      </div>

      {/* Project Editor Modal */}
      {currentRepo && (
        <ProjectEditorModal
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          selectedRepo={currentRepo}
          onSave={handleSaveRepo}
          className='cyber-project-editor'
        />
      )}

      {/* Delete Confirmation Dialog */}
      <CyberConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDeleteRepo}
        title='CONFIRM_DELETION'
        description={`Are you sure you want to remove ${repoToDelete?.name} from your portfolio? This action cannot be undone.`}
        confirmText='DELETE_PROJECT'
        cancelText='CANCEL'
        variant='danger'
        isLoading={isDeleting}
      />
    </>
  );
}
