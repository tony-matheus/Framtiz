import type { ReactNode } from 'react';

import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import { redirect } from 'next/navigation';
import { serverProjectService } from '@/lib/services/project-service';
import AdminLayout from '@/components/admin/admin-layout';
import AdminHeader from '@/components/admin/admin-header';
import SystemFooter from '@/components/admin/system-footer';
import { ProjectProvider } from './contexts/project-context';

const systemStatus = {
  security: 'SECURE',
  connection: 'STABLE',
  lastSync: '2025-05-11 10:42:18',
};

export default async function ProjectsLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Check if user is authenticated and is admin
  const user = await serverAuthService.getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  // Get projects
  const projects = await serverProjectService.getAllProjects();

  return (
    <AdminLayout>
      <ProjectProvider value={{ projects, systemStatus }}>
        {children}
      </ProjectProvider>
      <SystemFooter systemStatus={systemStatus} />
    </AdminLayout>
  );
}
