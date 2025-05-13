'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import RepoSelector from '@/components/admin/project-select/repo-selector';
import { useGithubRepos } from '@/lib/hooks/github/use-github-repos';
import { GithubRepo } from '@/app/api/github/repos/route';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberPagination } from '@/components/ui-custom/cyber-pagination';
import EmptyState from '../empty-state';
import { CyberErrorState } from '@/components/ui-custom/cyber-error-state';
import ProjectCreation from './project-creation';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const indexOfFirstItem = 0;
const indexOfLastItem = 12;
const ITEM_PER_PAGE = 10;

export default function RepoList() {
  const [selectedRepos, setSelectedRepos] = useState<GithubRepo[]>([]);

  const { data, totalPages, currentPage, goToPage, isLoading, isError } =
    useGithubRepos(1, ITEM_PER_PAGE);

  // Render loading skeletons
  const renderSkeletons = () => {
    return Array(ITEM_PER_PAGE)
      .fill(0)
      .map((_, index) => (
        <motion.div
          key={`skeleton-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 * index }}
        >
          <Skeleton
            className={cn(
              'w-full border-b border-slate-300/50 bg-slate-800/50',
              index === 0 ? 'h-[41]' : 'h-[57]'
            )}
          />
        </motion.div>
      ));
  };

  return (
    <div>
      {isLoading && renderSkeletons()}

      {/* Error State */}
      {!isLoading && isError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CyberErrorState
            title='DATA_RETRIEVAL_ERROR'
            message='Something went wrong.'
            onRetry={() => {}}
          />
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && data.length === 0 && (
        <EmptyState
          title='NO_PROJECTS_SELECTED'
          description="You haven't selected any projects to display on your portfolio yet."
          actionLabel='ADD_PROJECT'
          onAction={() => {}}
        />
      )}
      {!isLoading && !isError && data.length > 1 && (
        <RepoSelector
          repos={data}
          selectedRepos={selectedRepos}
          setSelectedRepos={setSelectedRepos}
        />
      )}

      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='mt-8 mb-12'
        >
          <CyberCard className='inline-block mx-auto'>
            <CyberCardContent className='p-2 sm:p-4'>
              <CyberPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={goToPage}
              />
            </CyberCardContent>
          </CyberCard>

          <div className='text-center mt-4 text-xs text-slate-400 font-mono'>
            SHOWING {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, selectedRepos.length)} OF{' '}
            {selectedRepos.length} REPOS
          </div>
        </motion.div>
      )}

      {/* Bottom action bar */}
      {selectedRepos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='sticky bottom-0 z-10 px-4'
        >
          <ProjectCreation
            selectedRepos={selectedRepos}
            onSave={() => {}}
            onClean={() => setSelectedRepos([])}
          />
        </motion.div>
      )}
    </div>
  );
}
