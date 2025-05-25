import type { ReactNode } from 'react';

import { serverProjectService } from '@/lib/services/project-service';
import { ProjectProvider } from './contexts/project-context';
import { redirect } from 'next/navigation';
import { serverAuthService } from '@/lib/services/auth/server-auth-service';

export default async function ProjectsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await serverAuthService.getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }
  const projects = await serverProjectService.getAllProjects();

  return (
    <ProjectProvider initialProjects={projects}>{children}</ProjectProvider>
  );
}
