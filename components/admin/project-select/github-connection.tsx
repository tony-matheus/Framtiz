import { CyberButton } from '@/components/ui-custom/cyber-button';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';

import { CyberDataDisplay } from '@/components/ui-custom/cyber-data-display';
import CyberInput from '@/components/ui-custom/cyber-input';
import Heading from '@/components/ui/typography/heading';
import { useUpdateProfile } from '@/lib/hooks/profile/use-update-profile';
import { cn } from '@/lib/utils';
import { Github, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface GithubConnection {
  connected?: boolean;
  className?: string;
  onSave: () => void;
}

export default function GithubConnection({
  connected = false,
  className,
  onSave,
}: GithubConnection) {
  const { mutate, isPending, error, isSuccess } = useUpdateProfile();

  const [githubUsername, setGithubUsername] = useState('');

  const handleSubmit = async () => {
    await mutate({
      github_username: githubUsername,
    });

    onSave();
  };

  return (
    <CyberCard className={cn('p-8 ', className)}>
      <CyberCardContent>
        <div className='flex flex-col items-center justify-between mb-4 md:mx-auto md:max-w-[400] lg:max-w-[600]'>
          <Github className='text-purple-400 mr-2' size={100} />
          <Heading as='h2' className='font-mono mt-8'>
            GITHUB_CONNECTION
          </Heading>
          <p className='text-sm font-mono text-slate-200 mt-4'>
            Type your github username to sync repos from your account.
          </p>
          {connected ? (
            <CyberDataDisplay
              label='USERNAME'
              value={githubUsername}
              className='w-full mt-4'
            />
          ) : (
            <CyberInput
              label='GITHUB_USERNAME'
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
            />
          )}
          {!!error && (
            <p className='text-sm font-mono text-red-200 my-4'>
              Something went wrong! try again later
            </p>
          )}

          {isSuccess && (
            <p className='text-sm font-mono text-red-200 my-4'>
              Github username saved!
            </p>
          )}

          <div className='mt-8 flex justify-end'>
            <CyberButton
              onClick={handleSubmit}
              variant='primary'
              leftIcon={<RefreshCw size={16} />}
              isLoading={isPending}
            >
              SAVE_AND_SYNC_REPOSITORIES
            </CyberButton>
          </div>
        </div>
      </CyberCardContent>
    </CyberCard>
  );
}
