'use client';

import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import MetricCard from '@/components/admin/dashboard/metric-card';
import { CyberProgress } from '@/components/ui-custom/cyber-progress';

export default function DashboardPage() {
  return (
    <div>
      {/* Dashboard content */}
      <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-3'>
        <MetricCard
          title='VISITOR_METRICS'
          subtitle='Total visitors this month'
          info='+12.5% from last month'
          value='1,248'
        />
        <MetricCard
          title='PROJECT_ENGAGEMENT'
          subtitle='Project view interactions'
          info='+8.3% from last month'
          value='843'
          status='success'
        />
        <MetricCard
          title='CONTACT_REQUESTS'
          value='37'
          subtitle='New contact form submissions'
          info='-3.2% from last month'
          status='warning'
        />
      </div>

      {/* System Status */}
      <CyberCard>
        <CyberCardContent>
          <h3 className='mb-4 flex items-center font-mono text-lg text-slate-200'>
            <div className='mr-2 size-2 bg-green-400'></div>
            SYSTEM_HEALTH
          </h3>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <CyberProgress
              label='SYSTEM_HEALTH'
              value={24}
              className='border border-slate-700 bg-slate-800/50 p-4'
              showValue
            />
            <CyberProgress
              label='MEMORY_USAGE'
              value={90}
              status='danger'
              className='border border-slate-700 bg-slate-800/50 p-4'
              showValue
            />
            <CyberProgress
              label='STORAGE_USAGE'
              value={40}
              status='success'
              className='border border-slate-700 bg-slate-800/50 p-4'
              showValue
            />
            <CyberProgress
              className='border border-slate-700 bg-slate-800/50 p-4'
              showValue
              label='NETWORK_TRAFFIC'
              value={10}
              status='warning'
            />
          </div>
        </CyberCardContent>
      </CyberCard>
    </div>
  );
}
