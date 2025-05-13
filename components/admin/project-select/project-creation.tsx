import { GithubRepo } from '@/app/api/github/repos/route';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { CyberProgress } from '@/components/ui-custom/cyber-progress';
import { useCreateProjectsWithLogging } from '@/lib/hooks/projects/use-create-projects';
import { cn } from '@/lib/utils';
import { RefreshCw, Save, X } from 'lucide-react';
import { useRef } from 'react';

interface ProjectCreationProps {
  selectedRepos: GithubRepo[];
  onSave: () => void;
  onClean: () => void;
}

export default function ProjectCreation({
  selectedRepos,
  onSave,
  onClean,
}: ProjectCreationProps) {
  const logContainerRef = useRef<HTMLDivElement>(null);

  const {
    progress,
    saving,
    createProjectsWithLogging,
    failedRepos,
    hasError,
    logs,
    successful,
  } = useCreateProjectsWithLogging(logContainerRef, onSave);

  return (
    <div className='bg-gradient-to-r from-purple-600 to-green-400 p-[1px] rounded-t transition-all overflow-hidden'>
      <div className='bg-slate-900 rounded-t p-4'>
        <div
          className={cn(
            'mb-6 justify-between items-end',
            saving || hasError ? 'flex' : 'hidden'
          )}
        >
          <CyberProgress
            value={progress}
            status={hasError ? 'danger' : 'default'}
            label={
              hasError && !saving
                ? `${failedRepos.length} Failed`
                : `${progress}% processed`
            }
          />
        </div>

        <div
          ref={logContainerRef}
          className={cn(
            'bg-black text-white my-4 p-4 rounded-md min-h-[200px] overflow-y-auto max-h-[300px] font-mono text-sm',
            logs.length > 0 ? 'block' : 'hidden'
          )}
        >
          {logs.map((log, index) => (
            <p key={index} className='whitespace-pre-wrap'>
              {log}
            </p>
          ))}
        </div>

        <div className='flex justify-between items-center '>
          <p className='text-slate-300'>
            <span className='font-mono'>{selectedRepos.length}</span> repos
            selected
          </p>

          <div className='flex items-center gap-2'>
            <CyberButton
              variant='outline'
              leftIcon={<X size={16} />}
              onClick={onClean}
            >
              {successful ? 'CLOSE' : 'CLEAN_SELECTION'}
            </CyberButton>

            {!successful && (
              <CyberButton
                variant={hasError ? 'danger' : 'secondary'}
                leftIcon={
                  hasError ? <RefreshCw size={16} /> : <Save size={16} />
                }
                onClick={() => createProjectsWithLogging(selectedRepos)}
                isLoading={saving}
                loadingText={hasError ? 'Retrying...' : 'SAVING...'}
              >
                {hasError ? 'RETRY' : 'SAVE_SELECTION'}
              </CyberButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
