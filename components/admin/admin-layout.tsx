'use client';

import type React from 'react';

import { useState } from 'react';
import AdminSidebar from './admin-sidebar';
import LogoutModal from './logout-modal';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className='min-h-screen bg-slate-950 text-slate-50 flex'>
      <AdminSidebar onLogout={() => setShowLogoutModal(true)} />
      <div className='flex-1 p-6'>{children}</div>

      {/* Logout confirmation modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </div>
  );
}
