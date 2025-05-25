'use client';

import { useRouter } from 'next/navigation';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { ArrowLeft } from 'lucide-react';
import GithubConnection from '@/components/admin/project-select/github-connection';
import { useUserContext } from '@/lib/contexts/user-context';
import RepoList from '@/components/admin/project-select/repo-list';

export default function ProjectSelectPage() {
  const user = useUserContext();

  const router = useRouter();

  const navigateBack = () => {
    router.push('/admin/projects');
  };

  return (
    <div>
      <div className='mb-4 flex items-center justify-between gap-2'>
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
