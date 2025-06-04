import type { ReactNode } from 'react';

import { serverAuthService } from '@/lib/services/auth/server-auth-service';

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await serverAuthService.getCurrentUser();

  if (!user) {
    return children;
  }

  return null;
}
