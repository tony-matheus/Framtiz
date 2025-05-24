'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { ArrowLeft } from 'lucide-react';
import AdminHeader from '@/components/admin/admin-header';
import GithubConnection from '@/components/admin/project-select/github-connection';
import { useUserContext } from '@/lib/contexts/user-context';
import { Separator } from '@radix-ui/react-separator';
import RepoList from '@/components/admin/project-select/repo-list';

export default function ProjectSelectPage() {
  const user = useUserContext();

  const router = useRouter();

  const navigateBack = () => {
    router.push('/admin/projects');
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-8'
      >
        <AdminHeader title='GITHUB_REPOSITORY_SELECTOR' />
      </motion.div>
      <Separator className='bg-gradient-to-r from-purple-600 to-green-400 h-[1] mb-8' />

      <div className='flex items-center justify-between gap-2 mb-4'>
        <CyberButton
          variant='outline'
          leftIcon={<ArrowLeft size={16} />}
          onClick={navigateBack}
        >
          BACK_TO_PROJECTS
        </CyberButton>
      </div>
      {user.githubUsername ? (
        <RepoList />
      ) : (
        <div className=''>
          <GithubConnection
            connected={!!user.githubUsername}
            onSave={() => {}}
            className='my-12'
          />
        </div>
      )}
    </div>
  );
}
