'use client';

import {
  FileCode,
  User as UserIcon,
  LogOut,
  Edit,
  X,
  Newspaper,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { CyberProgress } from '@/components/ui-custom/cyber-progress';
import { Separator } from '@/components/ui/separator';
import { User } from '@/lib/services/auth/auth-types';
import Image from 'next/image';

interface AdminSidebarProps {
  onClose: () => void;
  onLogout: () => void;
  user: User;
}

export default function AdminSidebar({
  onClose,
  onLogout,
  user,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    // {
    //   id: 'dashboard',
    //   label: 'DASHBOARD',
    //   icon: <Home size={18} />,
    //   href: '/admin/dashboard',
    // },
    {
      id: 'blog',
      label: 'BLOGS',
      icon: <Newspaper size={18} />,
      href: '/admin/blogs',
    },
    {
      id: 'projects',
      label: 'PROJECTS',
      icon: <FileCode size={18} />,
      href: '/admin/projects',
    },
    // {
    //   id: 'settings',
    //   label: 'SETTINGS',
    //   icon: <Settings size={18} />,
    //   href: '/admin/settings',
    // },
  ];

  return (
    <div className='min-h-screen w-64 overflow-y-auto border-r border-slate-800 bg-slate-950'>
      {/* Header */}
      <div className='flex items-center justify-between border-b border-slate-800 p-4'>
        <div className='flex items-center'>
          <div className='mr-3 flex size-16 items-center justify-center rounded-full border-2 border-purple-900 bg-transparent'>
            <Image
              src='/logo/logo-dark.png'
              width={500}
              height={500}
              alt='Framtiz logo'
            />
          </div>
          <div>
            <div className='font-mono text-sm text-green-400'>FRAMTIZ</div>
            <div className='font-mono text-xs text-slate-400'>v0.0.1</div>
          </div>
        </div>

        {/* Close button - only on mobile */}
        <div className='md:hidden'>
          <CyberButton
            onClick={onClose}
            variant='outline'
            size='icon'
            className='size-7'
          >
            <X size={16} />
          </CyberButton>
        </div>
      </div>

      {/* User Info */}
      <div className='border-b border-slate-800 p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='mr-3 flex size-8 items-center justify-center border border-purple-600 bg-slate-800'>
              <UserIcon className='text-purple-400' size={16} />
            </div>
            <div>
              <div className='font-mono text-sm text-slate-200'>
                {user.username?.toUpperCase() ?? 'EDIT_TO_CHANGE_YOUR_NAME'}
              </div>
              <div className='font-mono text-xs text-slate-400'>
                {user.isAdmin ? 'ADMIN_LEVEL' : 'USER_LEVEL'}
              </div>
            </div>
          </div>
          <Link href='/admin/edit-profile'>
            <CyberButton variant='outline' size='icon' className='size-7'>
              <Edit size={14} className='text-purple-400' />
            </CyberButton>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <div className='p-4'>
        <div className='mb-2 font-mono text-xs text-slate-500'>NAVIGATION</div>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href);

          return (
            <Link key={item.id} href={item.href} passHref>
              <div
                className={`mb-2 flex w-full items-center p-3 text-left ${
                  isActive
                    ? 'border border-purple-600 bg-purple-900/30 text-purple-300'
                    : 'border border-slate-800 text-slate-400 hover:border-purple-600 hover:text-purple-300'
                } transition-colors`}
              >
                <span className='mr-3'>{item.icon}</span>
                <span className='font-mono text-sm'>{item.label}</span>
                {isActive && (
                  <span className='ml-auto size-1 bg-green-400'></span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* System Status */}
      <div className='mt-auto border-t border-slate-800 p-4'>
        <div className='mb-2 font-mono text-xs text-slate-500'>
          SYSTEM_STATUS
        </div>
        <div className='border border-slate-700 bg-slate-800/50 p-3'>
          <CyberProgress
            label='CPU_USAGE'
            value={24}
            showValue
            size='sm'
            status='success'
          />
        </div>

        <Separator className='my-4 bg-slate-800' />

        <CyberButton
          variant='destructive'
          onClick={onLogout}
          className='w-full justify-start'
          leftIcon={<LogOut size={18} />}
        >
          LOGOUT
        </CyberButton>
      </div>
    </div>
  );
}
