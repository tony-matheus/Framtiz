import type { ReactNode } from 'react';

import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import AdminLayout from '@/components/admin/admin-layout/admin-layout';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await serverAuthService.getCurrentUser();

  if (!user) {
    redirect('/auth/login');
  }

  return <AdminLayout user={user}>{children}</AdminLayout>;
}
