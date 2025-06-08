import type { ReactNode } from 'react';
import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import { redirect } from 'next/navigation';
import { UserProvider } from '@/lib/contexts/user-context';

export default async function Layout({
  children,
  content,
}: {
  children: ReactNode;
  content: ReactNode;
}) {
  const user = await serverAuthService.getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <UserProvider value={user}>
      {children}
      {content}
    </UserProvider>
  );
}
