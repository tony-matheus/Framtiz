import { CyberButton } from '@/components/ui-custom/cyber-button';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';

import { CyberDataDisplay } from '@/components/ui-custom/cyber-data-display';
import CyberInput from '@/components/ui-custom/cyber-input';
import Heading from '@/components/ui/typography/heading';
import { useUpdateProfile } from '@/hooks/profile/use-update-profile';
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
        <div className='mb-4 flex flex-col items-center justify-between md:mx-auto md:max-w-[400] lg:max-w-[600]'>
          <Github className='mr-2 text-purple-400' size={100} />
          <Heading as='h2' className='mt-8 font-mono'>
            GITHUB_CONNECTION
          </Heading>
          <p className='mt-4 font-mono text-sm text-slate-200'>
            Type your github username to sync repos from your account.
          </p>
          {connected ? (
            <CyberDataDisplay
              label='USERNAME'
              value={githubUsername}
              className='mt-4 w-full'
            />
          ) : (
            <CyberInput
              label='GITHUB_USERNAME'
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
            />
          )}
          {!!error && (
            <p className='my-4 font-mono text-sm text-red-200'>
              Something went wrong! try again later
            </p>
          )}

          {isSuccess && (
            <p className='my-4 font-mono text-sm text-red-200'>
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
