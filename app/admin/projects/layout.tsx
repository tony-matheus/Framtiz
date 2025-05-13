import type { ReactNode } from 'react';

import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import { redirect } from 'next/navigation';
import { serverProjectService } from '@/lib/services/project-service';
import AdminLayout from '@/components/admin/admin-layout';
import SystemFooter from '@/components/admin/system-footer';
import { ProjectProvider } from './contexts/project-context';

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
    <AdminLayout user={user}>
      <ProjectProvider initialProjects={projects}>{children}</ProjectProvider>
      <SystemFooter />
    </AdminLayout>
  );
}
