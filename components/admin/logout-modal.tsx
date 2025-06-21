'use client';

import { redirect } from 'next/navigation';
import { CyberConfirmDialog } from '@/components/ui-custom/cyber-confirm-dialog';
import { useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    setIsLoggingOut(false);
    redirect('/');
  };

  return (
    <CyberConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleLogout}
      title='CONFIRM_LOGOUT'
      description='Are you sure you want to terminate your current session? All unsaved changes will be lost.'
      confirmText='CONFIRM_LOGOUT'
      cancelText='CANCEL'
      variant='destructive'
      isLoading={isLoggingOut}
    />
  );
}
