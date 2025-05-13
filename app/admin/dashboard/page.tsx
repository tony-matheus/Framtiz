'use client';

import { motion } from 'framer-motion';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import AdminHeader from '@/components/admin/admin-header';
import MetricCard from '@/components/admin/dashboard/metric-card';
import { CyberProgress } from '@/components/ui-custom/cyber-progress';

export default function DashboardPage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-8'
      >
        <AdminHeader title='PORTFOLIO_METRICS' />
      </motion.div>

      {/* Dashboard content */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
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
          <h3 className='text-lg font-mono text-slate-200 mb-4 flex items-center'>
            <div className='w-2 h-2 bg-green-400 mr-2'></div>
            SYSTEM_HEALTH
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <CyberProgress
              label='SYSTEM_HEALTH'
              value={24}
              className='bg-slate-800/50 p-4 border border-slate-700'
              showValue
            />
            <CyberProgress
              label='MEMORY_USAGE'
              value={90}
              status='danger'
              className='bg-slate-800/50 p-4 border border-slate-700'
              showValue
            />
            <CyberProgress
              label='STORAGE_USAGE'
              value={40}
              status='success'
              className='bg-slate-800/50 p-4 border border-slate-700'
              showValue
            />
            <CyberProgress
              className='bg-slate-800/50 p-4 border border-slate-700'
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
