'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { clientAuthService } from '@/lib/services/auth/client-auth-service';
import { User } from '@/lib/services/auth/auth-types';

export default function MakeAdminPage() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await clientAuthService.getCurrentUser();
      setUser(currentUser);

      if (!currentUser) {
        router.push('/auth/login');
      }
    };

    checkUser();
  }, [router]);

  const handleMakeAdmin = async () => {
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/make-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to make user admin');
      }

      setSuccess(true);

      // Redirect to admin dashboard after a delay
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-slate-950'>
        <div className='text-slate-400'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-950 p-4'>
      <div className='absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)]'></div>

      {/* Decorative elements */}
      <div className='absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-purple-600 to-green-400'></div>
      <div className='absolute right-0 top-0 h-40 w-1 bg-purple-600'></div>
      <div className='absolute bottom-0 left-0 h-1 w-40 bg-green-400'></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='relative w-full max-w-md border-2 border-slate-800 bg-slate-900 p-8'
      >
        <div className='absolute -left-1 -top-1 size-3 bg-purple-600'></div>
        <div className='absolute -bottom-1 -right-1 size-3 bg-green-400'></div>

        <div className='mb-8 text-center'>
          <div className='mb-4 flex justify-center'>
            <div className='flex size-16 items-center justify-center border-2 border-purple-600 bg-slate-800'>
              <Shield className='text-purple-400' size={32} />
            </div>
          </div>
          <h1 className='bg-gradient-to-r from-purple-600 to-green-400 bg-clip-text text-2xl font-bold text-transparent'>
            ADMIN_PRIVILEGES
          </h1>
          <p className='mt-2 font-mono text-sm text-slate-400'>
            ELEVATION_REQUIRED
          </p>
        </div>

        {error && (
          <div className='mb-6 flex items-start border border-red-900/50 bg-red-900/20 p-3 text-red-400'>
            <AlertTriangle size={18} className='mr-2 mt-0.5 shrink-0' />
            <p className='text-sm'>{error}</p>
          </div>
        )}

        {success && (
          <div className='mb-6 border border-green-900/50 bg-green-900/20 p-3 text-green-400'>
            <p className='text-sm'>
              Admin privileges granted successfully! Redirecting...
            </p>
          </div>
        )}

        <div className='mb-6 border border-slate-700 bg-slate-800/50 p-4'>
          <h3 className='mb-2 font-mono text-lg text-slate-200'>
            USER_INFORMATION
          </h3>
          <div className='grid grid-cols-2 gap-2 text-sm'>
            <div className='text-slate-400'>EMAIL:</div>
            <div className='text-slate-200'>{user.email}</div>
            <div className='text-slate-400'>USERNAME:</div>
            <div className='text-slate-200'>{user.username || 'N/A'}</div>
            <div className='text-slate-400'>ADMIN_STATUS:</div>
            <div className='text-red-400'>NOT_ADMIN</div>
          </div>
        </div>

        <div className='mb-6'>
          <p className='mb-4 text-sm text-slate-300'>
            You need admin privileges to access the admin dashboard. Click the
            button below to grant admin privileges to your account.
          </p>
          <p className='mb-4 text-xs text-yellow-400'>
            Note: This operation is only available for the first user in the
            system or if you&apos;re already an admin.
          </p>
        </div>

        <button
          onClick={handleMakeAdmin}
          disabled={isLoading || success}
          className='flex w-full items-center justify-center border-2 border-purple-600 bg-transparent p-3 font-medium text-purple-300 transition-all duration-300 hover:bg-purple-900/30'
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
            >
              <RefreshCw className='size-5' />
            </motion.div>
          ) : (
            <span className='font-mono'>GRANT_ADMIN_PRIVILEGES</span>
          )}
        </button>

        <div className='mt-6 text-center'>
          <p className='font-mono text-xs text-slate-500'>
            SYSTEM_VERSION: 2.4.1
          </p>
        </div>
      </motion.div>
    </div>
  );
}
