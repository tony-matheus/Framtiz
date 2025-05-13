import type { ReactNode } from 'react';

import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import { redirect } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import SystemFooter from '@/components/admin/system-footer';

export default async function ProjectsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await serverAuthService.getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <AdminLayout user={user}>
      {children}
      <SystemFooter />
    </AdminLayout>
  );
}
