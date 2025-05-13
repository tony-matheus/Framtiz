'use client';

import {
  Home,
  Settings,
  FileCode,
  User,
  LogOut,
  Terminal,
  Edit,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { CyberProgress } from '@/components/ui-custom/cyber-progress';
import { Separator } from '@/components/ui/separator';

interface AdminSidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      id: 'dashboard',
      label: 'DASHBOARD',
      icon: <Home size={18} />,
      href: '/admin/dashboard',
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
    <div className='w-64 bg-slate-900 border-r border-slate-800 min-h-screen'>
      {/* Header */}
      <div className='p-4 border-b border-slate-800'>
        <div className='flex items-center'>
          <div className='w-10 h-10 bg-purple-600 flex items-center justify-center mr-3'>
            <Terminal className='text-white' size={20} />
          </div>
          <div>
            <div className='text-sm text-green-400 font-mono'>ADMIN_CMS</div>
            <div className='text-xs text-slate-400 font-mono'>v2.4.1</div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className='p-4 border-b border-slate-800'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='w-8 h-8 bg-slate-800 border border-purple-600 flex items-center justify-center mr-3'>
              <User className='text-purple-400' size={16} />
            </div>
            <div>
              <div className='text-sm text-slate-200 font-mono'>
                JANE_DEVELOPER
              </div>
              <div className='text-xs text-slate-400 font-mono'>
                ADMIN_LEVEL
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
          const isActive = pathname === item.href;

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
