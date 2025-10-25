'use client';

import { AlertTriangle, Info, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../../ui/button';

type ConfirmVariant = 'danger' | 'warning' | 'info' | 'success';

interface CyberConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
  isLoading?: boolean;
}

export function CyberConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'CONFIRM',
  cancelText = 'CANCEL',
  variant = 'danger',
  isLoading = false,
}: CyberConfirmDialogProps) {
  const variantConfig = {
    danger: {
      icon: <AlertTriangle className='text-red-400' size={24} />,
      bgColor: 'bg-red-900/30',
      borderColor: 'border-red-600',
      buttonVariant: 'danger' as const,
    },
    warning: {
      icon: <AlertTriangle className='text-yellow-400' size={24} />,
      bgColor: 'bg-yellow-900/30',
      borderColor: 'border-yellow-600',
      buttonVariant: 'primary' as const,
    },
    info: {
      icon: <Info className='text-blue-400' size={24} />,
      bgColor: 'bg-blue-900/30',
      borderColor: 'border-blue-600',
      buttonVariant: 'primary' as const,
    },
    success: {
      icon: <CheckCircle className='text-green-400' size={24} />,
      bgColor: 'bg-green-900/30',
      borderColor: 'border-green-600',
      buttonVariant: 'secondary' as const,
    },
  };

  const { icon, bgColor, borderColor, buttonVariant } = variantConfig[variant];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='relative mx-auto max-w-md border-2 border-slate-800 bg-slate-900 p-0 text-slate-200'>
        {/* Decorative elements */}
        <div className='absolute -left-1 -top-1 size-3 bg-purple-600'></div>
        <div className='absolute -bottom-1 -right-1 size-3 bg-green-400'></div>

        <DialogHeader className='p-6 pb-2'>
          <div className='flex items-center'>
            <div
              className={`size-10 ${bgColor} border ${borderColor} mr-4 flex items-center justify-center`}
            >
              {icon}
            </div>
            <DialogTitle className='font-mono text-xl font-bold text-slate-200'>
              {title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <DialogDescription className='mb-6 border border-slate-800 bg-slate-800/50 p-6 pt-2 text-slate-300'>
          {description}
        </DialogDescription>

        <DialogFooter className='flex justify-end space-x-4 p-6 pt-0'>
          <Button variant='outline' onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={buttonVariant}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
