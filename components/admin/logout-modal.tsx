'use client';

import { useRouter } from 'next/navigation';
import { CyberConfirmDialog } from '@/components/ui-custom/cyber-confirm-dialog';
import { useState } from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Simulate logout
    setTimeout(() => {
      router.push('/admin');
      setIsLoggingOut(false);
      onClose();
    }, 1000);
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
