import type { ReactNode } from 'react';

import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import AdminLayout from '@/components/ui-custom/experiments/practical-sidebar/admin-layout';

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await serverAuthService.getCurrentUser();

  if (!user) {
    return children;
  }

  return <AdminLayout user={user}>{children}</AdminLayout>;
}
