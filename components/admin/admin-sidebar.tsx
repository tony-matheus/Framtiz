'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Settings, FileCode, User, LogOut, Terminal } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clientAuthService } from '@/lib/services/auth/client-auth-service';

interface AdminSidebarProps {
  activeTab: string;
}

export default function AdminSidebar({ activeTab }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(activeTab);

  // Update current tab based on pathname
  useEffect(() => {
    if (pathname === '/admin') setCurrentTab('dashboard');
    else if (pathname === '/admin/projects') setCurrentTab('projects');
    else if (pathname === '/admin/settings') setCurrentTab('settings');
  }, [pathname]);

  const navItems = [
    {
      id: 'dashboard',
      label: 'DASHBOARD',
      icon: <Home size={18} />,
      href: '/admin',
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

  const handleLogout = async () => {
    await clientAuthService.signOut();
    router.push('/');
  };

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
        <div className='flex items-center'>
          <div className='w-8 h-8 bg-slate-800 border border-purple-600 flex items-center justify-center mr-3'>
            <User className='text-purple-400' size={16} />
          </div>
          <div>
            <div className='text-sm text-slate-200 font-mono'>ADMIN_USER</div>
            <div className='text-xs text-slate-400 font-mono'>ADMIN_LEVEL</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className='p-4'>
        <div className='text-xs text-slate-500 font-mono mb-2'>NAVIGATION</div>
        {navItems.map((item) => (
          <Link key={item.id} href={item.href}>
            <motion.div
              className={`flex items-center w-full p-3 mb-2 text-left ${
                currentTab === item.id
                  ? 'bg-purple-900/30 border border-purple-600 text-purple-300'
                  : 'border border-slate-800 text-slate-400 hover:border-purple-600 hover:text-purple-300'
              } transition-colors`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className='mr-3'>{item.icon}</span>
              <span className='font-mono text-sm'>{item.label}</span>
              {currentTab === item.id && (
                <span className='w-1 h-1 bg-green-400 ml-auto'></span>
              )}
            </motion.div>
          </Link>
        ))}
      </div>

      {/* System Status */}
      <div className='p-4 mt-auto border-t border-slate-800'>
        <div className='text-xs text-slate-500 font-mono mb-2'>
          SYSTEM_STATUS
        </div>
        <div className='bg-slate-800/50 p-3 border border-slate-700'>
          <div className='flex items-center justify-between mb-2'>
            <div className='text-xs text-slate-400 font-mono'>CPU_USAGE</div>
            <div className='text-xs text-green-400 font-mono'>24%</div>
          </div>
          <div className='w-full h-1 bg-slate-700'>
            <div className='h-full bg-green-400' style={{ width: '24%' }}></div>
          </div>
        </div>

        <div className='mt-4'>
          <button
            onClick={handleLogout}
            className='flex items-center w-full p-3 border border-red-900/50 text-red-400 hover:bg-red-900/20 transition-colors'
          >
            <LogOut size={18} className='mr-3' />
            <span className='font-mono text-sm'>LOGOUT</span>
          </button>
        </div>
      </div>
    </div>
  );
}
