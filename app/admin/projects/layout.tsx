import type { ReactNode } from 'react';

import { serverProjectService } from '@/lib/services/project-service';
import { ProjectProvider } from './contexts/project-context';

export default async function ProjectsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const projects = await serverProjectService.getAllProjects();

  return (
    <ProjectProvider initialProjects={projects}>{children}</ProjectProvider>
  );
}
