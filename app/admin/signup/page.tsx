'use client';

import type React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, AlertTriangle, RefreshCw, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { clientAuthService } from '@/lib/services/auth/client-auth-service';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !username) {
      setError('Email, password, and username are required');
      return;
    }

    setIsLoading(true);

    const result = await clientAuthService.signUp({
      email,
      password,
      username,
      full_name: fullName || undefined,
    });

    setIsLoading(false);

    if (!result.success) {
      setError(result.error || 'Signup failed');
      return;
    }

    // Redirect to login page
    router.push('/auth/login');
  };

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
              <User className='text-purple-400' size={32} />
            </div>
          </div>
          <h1 className='bg-gradient-to-r from-purple-600 to-green-400 bg-clip-text text-2xl font-bold text-transparent'>
            CREATE_ADMIN_ACCOUNT
          </h1>
          <p className='mt-2 font-mono text-sm text-slate-400'>
            SECURE_REGISTRATION
          </p>
        </div>

        {error && (
          <div className='mb-6 flex items-start border border-red-900/50 bg-red-900/20 p-3 text-red-400'>
            <AlertTriangle size={18} className='mr-2 mt-0.5 shrink-0' />
            <p className='text-sm'>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label className='mb-2 block font-mono text-sm text-slate-400'>
              EMAIL
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex w-10 items-center justify-center border-r border-slate-700'>
                <Mail size={16} className='text-slate-500' />
              </div>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border border-slate-700 bg-slate-800 p-3 pl-12 text-slate-200 outline-none transition-colors focus:border-purple-600'
                placeholder='Enter email'
              />
            </div>
          </div>

          <div className='mb-6'>
            <label className='mb-2 block font-mono text-sm text-slate-400'>
              USERNAME
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex w-10 items-center justify-center border-r border-slate-700'>
                <User size={16} className='text-slate-500' />
              </div>
              <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full border border-slate-700 bg-slate-800 p-3 pl-12 text-slate-200 outline-none transition-colors focus:border-purple-600'
                placeholder='Enter username'
              />
            </div>
          </div>

          <div className='mb-6'>
            <label className='mb-2 block font-mono text-sm text-slate-400'>
              FULL_NAME (OPTIONAL)
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex w-10 items-center justify-center border-r border-slate-700'>
                <User size={16} className='text-slate-500' />
              </div>
              <input
                type='text'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className='w-full border border-slate-700 bg-slate-800 p-3 pl-12 text-slate-200 outline-none transition-colors focus:border-purple-600'
                placeholder='Enter full name (optional)'
              />
            </div>
          </div>

          <div className='mb-6'>
            <label className='mb-2 block font-mono text-sm text-slate-400'>
              PASSWORD
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex w-10 items-center justify-center border-r border-slate-700'>
                <Lock size={16} className='text-slate-500' />
              </div>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full border border-slate-700 bg-slate-800 p-3 pl-12 text-slate-200 outline-none transition-colors focus:border-purple-600'
                placeholder='Enter password'
              />
            </div>
          </div>

          <button
            type='submit'
            disabled={isLoading}
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
              <span className='font-mono'>CREATE_ACCOUNT</span>
            )}
          </button>
        </form>

        <div className='mt-6 text-center'>
          <p className='font-mono text-xs text-slate-500'>
            SYSTEM_VERSION: 2.4.1
          </p>
        </div>
      </motion.div>
    </div>
  );
}
