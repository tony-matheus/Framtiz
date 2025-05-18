import type { ReactNode } from 'react';

import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import { redirect } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import SystemFooter from '@/components/admin/system-footer';
import { serverBlogService } from '@/lib/services/blog-service';
import { BlogProvider } from './contexts/blog-context';

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await serverAuthService.getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  const { blogs, totalPages } = await serverBlogService.getAllBlogs();

  return (
    <AdminLayout user={user}>
      <BlogProvider initialblogs={blogs} totalPages={totalPages}>
        {children}
      </BlogProvider>
      <SystemFooter />
    </AdminLayout>
  );
}
