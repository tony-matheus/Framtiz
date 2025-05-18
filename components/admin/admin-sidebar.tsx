'use client';

import {
  Home,
  Settings,
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
    {
      id: 'dashboard',
      label: 'DASHBOARD',
      icon: <Home size={18} />,
      href: '/admin/dashboard',
    },
    {
      id: 'blog',
      label: 'BLOG',
      icon: <Newspaper size={18} />,
      href: '/admin/blogs',
    },
    {
      id: 'projects',
      label: 'PROJECTS',
      icon: <FileCode size={18} />,
      href: '/admin/projects',
    },
    {
      id: 'settings',
      label: 'SETTINGS',
      icon: <Settings size={18} />,
      href: '/admin/settings',
    },
  ];

  return (
    <div className='w-64 bg-slate-900 border-r border-slate-800 min-h-screen overflow-y-auto'>
      {/* Header */}
      <div className='p-4 border-b border-slate-800 flex justify-between items-center'>
        <div className='flex items-center'>
          <div className='size-16 bg-transparent flex rounded-full border-2 border-purple-900 items-center justify-center mr-3'>
            <Image
              src='/logo/logo-dark.png'
              width={500}
              height={500}
              alt='Framtiz logo'
            />
          </div>
          <div>
            <div className='text-sm text-green-400 font-mono'>FRAMTIZ</div>
            <div className='text-xs text-slate-400 font-mono'>v0.0.1</div>
          </div>
        </div>

        {/* Close button - only on mobile */}
        <div className='md:hidden'>
          <CyberButton
            onClick={onClose}
            variant='outline'
            size='icon'
            className='h-7 w-7'
          >
            <X size={16} />
          </CyberButton>
        </div>
      </div>

      {/* User Info */}
      <div className='p-4 border-b border-slate-800'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='w-8 h-8 bg-slate-800 border border-purple-600 flex items-center justify-center mr-3'>
              <UserIcon className='text-purple-400' size={16} />
            </div>
            <div>
              <div className='text-sm text-slate-200 font-mono'>
                {user.username?.toUpperCase() ?? 'EDIT_TO_CHANGE_YOUR_NAME'}
              </div>
              <div className='text-xs text-slate-400 font-mono'>
                {user.isAdmin ? 'ADMIN_LEVEL' : 'USER_LEVEL'}
              </div>
            </div>
          </div>
          <Link href='/admin/edit-profile'>
            <CyberButton variant='outline' size='icon' className='h-7 w-7'>
              <Edit size={14} className='text-purple-400' />
            </CyberButton>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <div className='p-4'>
        <div className='text-xs text-slate-500 font-mono mb-2'>NAVIGATION</div>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href);

          return (
            <Link key={item.id} href={item.href} passHref>
              <div
                className={`flex items-center w-full p-3 mb-2 text-left ${
                  isActive
                    ? 'bg-purple-900/30 border border-purple-600 text-purple-300'
                    : 'border border-slate-800 text-slate-400 hover:border-purple-600 hover:text-purple-300'
                } transition-colors`}
              >
                <span className='mr-3'>{item.icon}</span>
                <span className='font-mono text-sm'>{item.label}</span>
                {isActive && (
                  <span className='w-1 h-1 bg-green-400 ml-auto'></span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* System Status */}
      <div className='p-4 mt-auto border-t border-slate-800'>
        <div className='text-xs text-slate-500 font-mono mb-2'>
          SYSTEM_STATUS
        </div>
        <div className='bg-slate-800/50 p-3 border border-slate-700'>
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
          variant='danger'
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
