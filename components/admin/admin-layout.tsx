'use client';

import type React from 'react';
import { useState } from 'react';
import AdminSidebar from './admin-sidebar';
import LogoutModal from './logout-modal';
import { Menu } from 'lucide-react';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { User } from '@/lib/services/auth/auth-types';

interface AdminLayoutProps {
  children: React.ReactNode;
  user: User;
}

export default function AdminLayout({ children, user }: AdminLayoutProps) {
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Mobile sidebar toggle */}
      <div className='fixed left-4 top-4 z-30 md:hidden'>
        <CyberButton
          variant='outline'
          size='icon'
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className='bg-slate-900'
        >
          <Menu size={20} />
        </CyberButton>
      </div>

      {/* Sidebar - hidden on mobile by default, shown when toggled */}
      <div
        className={`${
          sidebarOpen ? 'fixed inset-0 z-20 bg-black/50' : 'hidden'
        } md:hidden`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`${
          sidebarOpen ? 'fixed left-0 top-0 z-30' : 'hidden'
        } md:relative md:block`}
      >
        <AdminSidebar
          user={user}
          onClose={() => setSidebarOpen(false)}
          onLogout={() => setShowLogoutModal(true)}
        />
      </div>

      <div className='flex-1 overflow-y-auto p-4 md:p-6'>{children}</div>

      {/* Logout confirmation modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </div>
  );
}
