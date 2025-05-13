import { redirect } from 'next/navigation';
import { serverAuthService } from '@/lib/services/auth/server-auth-service';

export default async function AdminPage() {
  // Check if user is authenticated and is admin
  const user = await serverAuthService.getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  redirect('/admin/dashboard');
}
