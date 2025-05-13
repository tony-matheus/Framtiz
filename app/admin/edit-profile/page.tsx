'use client';

import type React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Save, Mail, MapPin, Globe, Github, Twitter } from 'lucide-react';
import AdminHeader from '@/components/admin/admin-header';
import AdminLayout from '@/components/admin/admin-layout';
import { CyberSectionHeader } from '@/components/ui-custom/cyber-section-header';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberFormField } from '@/components/ui-custom/cyber-form-field';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { CyberDataDisplay } from '@/components/ui-custom/cyber-data-display';
import { CyberStatusBadge } from '@/components/ui-custom/cyber-status-badge';
import { Separator } from '@/components/ui/separator';
import SystemFooter from '@/components/admin/system-footer';

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    username: 'JANE_DEVELOPER',
    email: 'jane@developer.com',
    role: 'ADMIN_LEVEL',
    bio: 'Full-stack developer with expertise in React, Next.js, and TypeScript. Passionate about creating intuitive user interfaces and robust backend systems.',
    location: 'CYBER_CITY_42',
    website: 'https://janedeveloper.com',
    github: 'https://github.com/janedeveloper',
    twitter: '@jane_developer',
  });

  const systemStatus = {
    security: 'SECURE',
    connection: 'STABLE',
    lastSync: '2025-05-11 10:42:18',
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <AdminLayout>
      <AdminHeader systemStatus={systemStatus} title='PROFILE_MANAGEMENT' />

      <div className='mt-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-8'
        >
          <CyberSectionHeader
            title='PROFILE_CONFIGURATION'
            subtitle='Update your personal information and account settings.'
          >
            USER_PROFILE
          </CyberSectionHeader>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Profile sidebar */}
          <CyberCard>
            <CyberCardContent className='flex flex-col items-center p-6'>
              <div className='w-24 h-24 bg-slate-800 border-2 border-purple-600 flex items-center justify-center mb-4'>
                <User className='text-purple-400' size={48} />
              </div>
              <div className='text-center'>
                <div className='text-lg text-slate-200 font-mono'>
                  {profile.username}
                </div>
                <div className='text-sm text-slate-400 font-mono'>
                  {profile.role}
                </div>
              </div>

              <Separator className='my-6 bg-slate-800' />

              <div className='w-full space-y-4'>
                <div className='p-3 border border-slate-800'>
                  <div className='text-xs text-slate-500 font-mono mb-1'>
                    ACCOUNT_STATUS
                  </div>
                  <CyberStatusBadge status='online'>ACTIVE</CyberStatusBadge>
                </div>

                <CyberDataDisplay
                  label='LAST_LOGIN'
                  value='2025-05-12 14:32:18'
                />
                <CyberDataDisplay label='SECURITY_LEVEL' value='LEVEL_3' />
              </div>
            </CyberCardContent>
          </CyberCard>

          {/* Profile form */}
          <CyberCard className='md:col-span-2'>
            <CyberCardContent>
              <h3 className='text-lg font-mono text-slate-200 mb-4 flex items-center'>
                <div className='w-2 h-2 bg-purple-400 mr-2'></div>
                EDIT_PROFILE
              </h3>

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <CyberFormField
                    label='USERNAME'
                    name='username'
                    value={profile.username}
                    onChange={handleInputChange}
                    icon={<User size={16} className='text-slate-500' />}
                  />

                  <CyberFormField
                    label='EMAIL'
                    name='email'
                    type='email'
                    value={profile.email}
                    onChange={handleInputChange}
                    icon={<Mail size={16} className='text-slate-500' />}
                  />
                </div>

                <CyberFormField
                  label='BIO'
                  name='bio'
                  value={profile.bio}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <CyberFormField
                    label='LOCATION'
                    name='location'
                    value={profile.location}
                    onChange={handleInputChange}
                    icon={<MapPin size={16} className='text-slate-500' />}
                  />

                  <CyberFormField
                    label='WEBSITE'
                    name='website'
                    type='url'
                    value={profile.website}
                    onChange={handleInputChange}
                    icon={<Globe size={16} className='text-slate-500' />}
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <CyberFormField
                    label='GITHUB'
                    name='github'
                    type='url'
                    value={profile.github}
                    onChange={handleInputChange}
                    icon={<Github size={16} className='text-slate-500' />}
                  />

                  <CyberFormField
                    label='TWITTER'
                    name='twitter'
                    value={profile.twitter}
                    onChange={handleInputChange}
                    icon={<Twitter size={16} className='text-slate-500' />}
                  />
                </div>

                <div className='flex justify-end'>
                  <CyberButton
                    type='submit'
                    variant='secondary'
                    isLoading={isSaving}
                    loadingText='SAVING...'
                    leftIcon={<Save size={16} />}
                  >
                    SAVE_PROFILE
                  </CyberButton>
                </div>
              </form>
            </CyberCardContent>
          </CyberCard>
        </div>
      </div>

      <SystemFooter systemStatus={systemStatus} />
    </AdminLayout>
  );
}
