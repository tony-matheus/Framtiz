'use client';

import { motion } from 'framer-motion';
import AdminLayout from '@/components/admin/admin-layout';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberProgress } from '@/components/ui-custom/cyber-progress';
import SystemFooter from '@/components/admin/system-footer';
import { SectionHeader } from '@/components/admin/section-header';

export default function DashboardPage() {
  const systemStatus = {
    security: 'SECURE',
    connection: 'STABLE',
    lastSync: '2025-05-11 10:42:18',
  };

  return (
    <AdminLayout>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-8'
        >
          <SectionHeader
            title='PORTFOLIO_METRICS'
            subtitle='Real-time analytics and system performance metrics for your portfolio.'
          >
            SYSTEM_OVERVIEW
          </SectionHeader>
        </motion.div>

        {/* Dashboard content */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <CyberCard>
            <CyberCardContent>
              <h3 className='text-lg font-mono text-slate-200 mb-4 flex items-center'>
                <div className='w-2 h-2 bg-purple-400 mr-2'></div>
                VISITOR_METRICS
              </h3>
              <div className='text-3xl font-bold text-purple-300 mb-2'>
                1,248
              </div>
              <div className='text-sm text-slate-400'>
                Total visitors this month
              </div>
              <CyberProgress value={65} className='mt-4' />
              <div className='mt-2 text-xs text-green-400'>
                +12.5% from last month
              </div>
            </CyberCardContent>
          </CyberCard>

          <CyberCard>
            <CyberCardContent>
              <h3 className='text-lg font-mono text-slate-200 mb-4 flex items-center'>
                <div className='w-2 h-2 bg-green-400 mr-2'></div>
                PROJECT_ENGAGEMENT
              </h3>
              <div className='text-3xl font-bold text-green-300 mb-2'>843</div>
              <div className='text-sm text-slate-400'>
                Project view interactions
              </div>
              <CyberProgress value={78} status='success' className='mt-4' />
              <div className='mt-2 text-xs text-green-400'>
                +8.3% from last month
              </div>
            </CyberCardContent>
          </CyberCard>

          <CyberCard>
            <CyberCardContent>
              <h3 className='text-lg font-mono text-slate-200 mb-4 flex items-center'>
                <div className='w-2 h-2 bg-purple-400 mr-2'></div>
                CONTACT_REQUESTS
              </h3>
              <div className='text-3xl font-bold text-purple-300 mb-2'>37</div>
              <div className='text-sm text-slate-400'>
                New contact form submissions
              </div>
              <CyberProgress value={45} status='warning' className='mt-4' />
              <div className='mt-2 text-xs text-yellow-400'>
                -3.2% from last month
              </div>
            </CyberCardContent>
          </CyberCard>
        </div>

        {/* System Status */}
        <CyberCard>
          <CyberCardContent>
            <h3 className='text-lg font-mono text-slate-200 mb-4 flex items-center'>
              <div className='w-2 h-2 bg-green-400 mr-2'></div>
              SYSTEM_HEALTH
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='bg-slate-800/50 p-4 border border-slate-700'>
                <div className='flex justify-between items-center mb-2'>
                  <div className='text-sm text-slate-300 font-mono'>
                    CPU_USAGE
                  </div>
                  <div className='text-sm text-green-400 font-mono'>24%</div>
                </div>
                <CyberProgress value={24} status='success' size='sm' />
              </div>
              <div className='bg-slate-800/50 p-4 border border-slate-700'>
                <div className='flex justify-between items-center mb-2'>
                  <div className='text-sm text-slate-300 font-mono'>
                    MEMORY_USAGE
                  </div>
                  <div className='text-sm text-green-400 font-mono'>42%</div>
                </div>
                <CyberProgress value={42} status='success' size='sm' />
              </div>
              <div className='bg-slate-800/50 p-4 border border-slate-700'>
                <div className='flex justify-between items-center mb-2'>
                  <div className='text-sm text-slate-300 font-mono'>
                    STORAGE_USAGE
                  </div>
                  <div className='text-sm text-yellow-400 font-mono'>78%</div>
                </div>
                <CyberProgress value={78} status='warning' size='sm' />
              </div>
              <div className='bg-slate-800/50 p-4 border border-slate-700'>
                <div className='flex justify-between items-center mb-2'>
                  <div className='text-sm text-slate-300 font-mono'>
                    NETWORK_TRAFFIC
                  </div>
                  <div className='text-sm text-green-400 font-mono'>35%</div>
                </div>
                <CyberProgress value={35} status='success' size='sm' />
              </div>
            </div>
          </CyberCardContent>
        </CyberCard>
      </div>

      <SystemFooter systemStatus={systemStatus} />
    </AdminLayout>
  );
}
