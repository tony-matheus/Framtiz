'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/admin-header';
import AdminLayout from '@/components/admin/admin-layout';
import RepoSelector from '@/components/admin/repo-selector';
import { CyberSectionHeader } from '@/components/ui-custom/cyber-section-header';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { CyberDataDisplay } from '@/components/ui-custom/cyber-data-display';
import SystemFooter from '@/components/admin/system-footer';
import { Github, RefreshCw, ArrowLeft, Save } from 'lucide-react';

export default function ProjectSelectPage() {
  const [selectedRepos, setSelectedRepos] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const systemStatus = {
    security: 'SECURE',
    connection: 'STABLE',
    lastSync: '2025-05-11 10:42:18',
  };

  const handleSaveSelection = () => {
    setIsSaving(true);
    // Simulate API call to save selection
    setTimeout(() => {
      setIsSaving(false);
      router.push('/admin/projects');
    }, 1500);
  };

  const navigateBack = () => {
    router.push('/admin/projects');
  };

  return (
    <AdminLayout>
      <AdminHeader systemStatus={systemStatus} title='PROJECT_SELECTION' />

      <div className='mt-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'
        >
          <CyberSectionHeader
            title='GITHUB_REPOSITORY_SELECTOR'
            subtitle='Connect to your GitHub account to select repositories for display on your portfolio. Maximum of 8 projects can be selected.'
          >
            PROJECT_SELECTION
          </CyberSectionHeader>

          <div className='flex gap-3 md:self-end'>
            <CyberButton
              variant='outline'
              leftIcon={<ArrowLeft size={16} />}
              onClick={navigateBack}
            >
              BACK_TO_PROJECTS
            </CyberButton>

            <CyberButton
              variant='secondary'
              leftIcon={<Save size={16} />}
              onClick={handleSaveSelection}
              isLoading={isSaving}
              loadingText='SAVING...'
              disabled={selectedRepos.length === 0}
            >
              SAVE_SELECTION
            </CyberButton>
          </div>
        </motion.div>

        {/* GitHub Connection Status */}
        <CyberCard className='mb-8'>
          <CyberCardContent>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center'>
                <Github className='text-purple-400 mr-2' size={20} />
                <h3 className='text-lg font-mono text-slate-200'>
                  GITHUB_CONNECTION
                </h3>
              </div>
              <div className='flex items-center'>
                <span className='w-2 h-2 bg-green-400 mr-2 animate-pulse'></span>
                <span className='text-green-400 text-sm font-mono'>
                  CONNECTED
                </span>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
              <CyberDataDisplay label='USERNAME' value='JANE_DEVELOPER' />
              <CyberDataDisplay label='TOTAL_REPOS' value='24' />
              <CyberDataDisplay
                label='LAST_SYNC'
                value={systemStatus.lastSync}
              />
            </div>
            <div className='mt-4 flex justify-end'>
              <CyberButton variant='primary' leftIcon={<RefreshCw size={16} />}>
                SYNC_REPOSITORIES
              </CyberButton>
            </div>
          </CyberCardContent>
        </CyberCard>

        {/* Repository Selector */}
        <RepoSelector
          selectedRepos={selectedRepos}
          setSelectedRepos={setSelectedRepos}
        />

        {/* Bottom action bar */}
        {selectedRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mt-8 flex justify-between items-center p-4 bg-slate-900 border border-slate-800 sticky bottom-6 z-10'
          >
            <div className='text-slate-300'>
              <span className='font-mono'>{selectedRepos.length}</span> projects
              selected
            </div>
            <CyberButton
              variant='secondary'
              leftIcon={<Save size={16} />}
              onClick={handleSaveSelection}
              isLoading={isSaving}
              loadingText='SAVING...'
            >
              SAVE_SELECTION
            </CyberButton>
          </motion.div>
        )}
      </div>

      <SystemFooter systemStatus={systemStatus} />
    </AdminLayout>
  );
}
