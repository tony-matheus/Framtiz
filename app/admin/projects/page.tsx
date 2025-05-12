import { redirect } from 'next/navigation';
import { serverProjectService } from '@/lib/services/project-service';
import AdminHeader from '@/components/admin/admin-header';
import AdminSidebar from '@/components/admin/admin-sidebar';
import ProjectManager from '@/components/admin/project-manager';
import { serverAuthService } from '@/lib/services/auth/server-auth-service';

export default async function ProjectsPage() {
  // Check if user is authenticated and is admin
  const user = await serverAuthService.getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  if (!user.is_admin) {
    redirect('/admin/make-admin');
  }

  // Get projects
  const projects = await serverProjectService.getAllProjects();

  const systemStatus = {
    security: 'SECURE',
    connection: 'STABLE',
    lastSync: new Date().toISOString().replace('T', ' ').substring(0, 19),
  };

  return (
    <div className='min-h-screen bg-slate-950 text-slate-50 flex'>
      {/* Admin Sidebar */}
      <AdminSidebar activeTab='projects' />

      {/* Main Content */}
      <div className='flex-1 p-6'>
        <AdminHeader systemStatus={systemStatus} />

        {/* Main Content Area */}
        <div className='mt-8'>
          <ProjectManager initialProjects={projects} />
        </div>
      </div>
    </div>
  );
}
