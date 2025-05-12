import { redirect } from 'next/navigation';
// import { serverAnalyticsService } from '@/lib/services/analytics-service';
import AdminHeader from '@/components/admin/admin-header';
import { serverAuthService } from '@/lib/services/auth/server-auth-service';
// import AdminSidebar from '@/components/admin/admin-sidebar';
// import AnalyticsDashboard from '@/components/admin/analytics-dashboard';

export default async function AdminPage() {
  // Check if user is authenticated and is admin
  const user = await serverAuthService.getCurrentUser();

  console.log(user);
  if (!user) {
    redirect('/admin/login');
  }

  if (!user.is_admin) {
    // If user is authenticated but not admin, redirect to make-admin page
    redirect('/admin/make-admin');
  }

  // Get analytics data
  // const analyticsData = await serverAnalyticsService.getAnalyticsSummary()

  const systemStatus = {
    security: 'SECURE',
    connection: 'STABLE',
    lastSync: new Date().toISOString().replace('T', ' ').substring(0, 19),
  };

  return (
    <div className='min-h-screen bg-slate-950 text-slate-50 flex'>
      {/* Admin Sidebar */}
      {/* <AdminSidebar activeTab='dashboard' setActiveTab={() => {}} /> */}

      {/* Main Content */}
      <div className='flex-1 p-6'>
        <AdminHeader systemStatus={systemStatus} />

        {/* Main Content Area */}
        <div className='mt-8'>
          {/* <AnalyticsDashboard initialData={analyticsData} /> */}
        </div>
      </div>
    </div>
  );
}
