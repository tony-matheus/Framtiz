import { GithubRepo } from '@/app/api/github/repos/route';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

type CreateProjectInput = {
  title: string;
  slug: string;
  description?: string;
  github_url: string;
};

async function createProject(project: CreateProjectInput) {
  const { data } = await axios.post('/api/admin/projects', project);

  return data;
}

export const useCreateProject = () =>
  useMutation({
    mutationFn: createProject,
  });

export const useCreateProjectsFromGitHubRepo = (onSave?: () => void) => {
  const [progress, setProgress] = useState<number>(0);
  const [saving, setSaving] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [failedRepos, setFailedRepos] = useState<GithubRepo[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [successful, setSuccessful] = useState(false);

  const { mutateAsync } = useCreateProject();

  const createProjects = async (
    selectedRepos: GithubRepo[],
    handleLogUpdate: (message: string) => void
  ) => {
    setSaving(true);
    setProgress(0);
    setFailedRepos([]);

    const failedRepoList = [];
    const errors: string[] = [];

    handleLogUpdate('Start Creation');
    handleLogUpdate('');

    for (let index = 0; index < selectedRepos.length; index++) {
      const selectedRepo = selectedRepos[index];
      handleLogUpdate(`processing ${selectedRepo.name}...`);

      try {
        await mutateAsync({
          title: selectedRepo.name.split('_').join('_').toUpperCase(),
          slug: selectedRepo.name,
          description: selectedRepo.description ?? '',
          github_url: selectedRepo.url,
        });
        handleLogUpdate(`project ${selectedRepo.name} successfully created ✅`);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        const errorMessage =
          e?.response?.data?.error || 'Unknown error occurred';
        failedRepoList.push(selectedRepo);
        errors.push(errorMessage);
        handleLogUpdate(
          `project ${selectedRepo.name} failed to be created ❌, error: ${errorMessage}`
        );
      }

      setProgress(Math.round(((index + 1) / selectedRepos.length) * 100));
    }

    setSaving(false);
    setFailedRepos(failedRepoList);
    setHasError(failedRepoList.length > 0);
    setSuccessful(failedRepoList.length === 0);
    setErrorMessages(errors);
    onSave?.();
  };

  return {
    saving,
    successful,
    progress,
    createProjects,
    failedRepos,
    hasError,
    errorMessages,
  };
};

export const useCreateProjectsWithLogging = (
  logContainerRef: React.RefObject<HTMLDivElement | null>,
  onSave?: () => void
) => {
  const { createProjects, ...data } = useCreateProjectsFromGitHubRepo(onSave);

  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, logContainerRef]);

  const handleLogUpdate = (message: string) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const createProjectsWithLogging = async (selectedRepos: GithubRepo[]) => {
    await createProjects(selectedRepos, handleLogUpdate);
  };

  return {
    ...data,
    createProjectsWithLogging,
    logs,
    logContainerRef,
  };
};
