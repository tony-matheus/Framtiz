'use client';

import { Star, Clock, Plus, Check, ExternalLink } from 'lucide-react';
import { GithubRepo } from '@/app/api/github/repos/route';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import CyberSearchInput from '@/components/ui-custom/inputs/cyber-search-input';

interface RepoSelectorProps {
  repos: GithubRepo[];
  selectedRepos: GithubRepo[];
  setSelectedRepos: (repos: GithubRepo[]) => void;
}

export default function RepoSelector({
  repos,
  selectedRepos,
  setSelectedRepos,
}: RepoSelectorProps) {
  // Toggle repo selection
  const toggleRepoSelection = (repo: GithubRepo) => {
    if (selectedRepos.some((r) => r.id === repo.id)) {
      setSelectedRepos(selectedRepos.filter((r) => r.id !== repo.id));
    } else {
      if (selectedRepos.length < 8) {
        setSelectedRepos([...selectedRepos, repo]);
      }
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className='mb-8'>
      {/* Search and filters */}
      <div className='mb-4 flex flex-col md:flex-row gap-4'>
        <CyberSearchInput onSearch={() => {}} />
        <div className='flex items-center text-sm text-slate-300'>
          <span className='font-mono mr-2'>SELECTED:</span>
          <span className='px-2 py-1 bg-purple-900/30 border border-purple-600 font-mono'>
            {selectedRepos.length}/{repos.length}
          </span>
        </div>
      </div>

      {/* Repository table */}
      <div className='bg-slate-900 border border-slate-800'>
        <Table>
          <TableHeader className='bg-slate-900 border-b border-slate-800'>
            <TableRow className='hover:bg-transparent border-none'>
              <TableHead className='text-xs text-slate-400 font-mono w-[60px] py-3'>
                SELECT
              </TableHead>
              <TableHead className='text-xs text-slate-400 font-mono py-3'>
                REPOSITORY
              </TableHead>
              <TableHead className='text-xs text-slate-400 font-mono text-center py-3 w-[100px]'>
                STARS
              </TableHead>
              <TableHead className='text-xs text-slate-400 font-mono py-3 w-[150px]'>
                UPDATED
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {repos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='p-6 text-center text-slate-400'
                >
                  No repositories found matching your search criteria.
                </TableCell>
              </TableRow>
            ) : (
              repos.map((repo) => {
                const isSelected = selectedRepos.some((r) => r.id === repo.id);
                const isDisabled = selectedRepos.length >= 8 && !isSelected;

                return (
                  <motion.tr
                    key={repo.id}
                    className={cn('group border-b border-slate-800', {
                      'opacity-50': isDisabled,
                      'hover:bg-slate-800/50 ': !isDisabled,
                      'bg-purple-900/30 border-y border-purple-600 hover:bg-purple-900/90':
                        isSelected,
                    })}
                  >
                    <TableCell>
                      <CyberButton
                        variant='outline'
                        size='icon'
                        onClick={() => toggleRepoSelection(repo)}
                        disabled={isDisabled}
                      >
                        {isSelected ? <Check size={16} /> : <Plus size={16} />}
                      </CyberButton>
                    </TableCell>
                    <TableCell>
                      <a
                        href={repo.url}
                        className='font-mono text-sm text-slate-200 hover:text-white group-hover:font-bold'
                      >
                        <div className='flex items-center gap-2'>
                          {repo.name}
                          <ExternalLink size={12} />
                        </div>
                      </a>
                      <p className='text-xs text-slate-400 mt-1'>
                        {repo.description}
                      </p>
                    </TableCell>
                    <TableCell className='text-center'>
                      <div className='flex items-center justify-center text-slate-300'>
                        <Star size={14} className='mr-1 text-yellow-500' />
                        <p>{repo.watchers_count}</p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className='flex items-center text-slate-300 text-xs'>
                        <Clock size={14} className='mr-1 text-green-400' />
                        <p>{formatDate(repo.updated_at)}</p>
                      </div>
                    </TableCell>
                  </motion.tr>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
