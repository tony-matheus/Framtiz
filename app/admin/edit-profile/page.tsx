'use client';

import type React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Save, Mail, MapPin, Github, Twitter } from 'lucide-react';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberFormField } from '@/components/ui-custom/cyber-form-field';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { CyberDataDisplay } from '@/components/ui-custom/cyber-data-display';
import { CyberStatusBadge } from '@/components/ui-custom/cyber-status-badge';
import { Separator } from '@/components/ui/separator';
import { useUserContext } from '../../../lib/contexts/user-context';
import AdminHeader from '@/components/admin/admin-header';
import { useUpdateProfile } from '@/lib/hooks/profile/use-update-profile';

export default function EditProfile() {
  const user = useUserContext();

  const { mutate, isPending } = useUpdateProfile();

  const [profile, setProfile] = useState({
    username: user.username,
    email: user.email,
    role: 'ADMIN_LEVEL',
    bio: 'Senior Full-stack developer.',
    location: '',
    githubUsername: user.githubUsername,
    twitter: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      username: profile.username,
      github_username: profile.githubUsername,
    });
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-8'
      >
        <AdminHeader title='PROFILE_CONFIGURATION' />
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
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <CyberFormField
                  label='GITHUB'
                  name='githubUsername'
                  type='text'
                  value={profile.githubUsername}
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
                  isLoading={isPending}
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
  );
}
