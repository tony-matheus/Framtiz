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
    router.push('/admin/login');
  };

  return (
    <div className='min-h-screen bg-slate-950 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px]'></div>

      {/* Decorative elements */}
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-green-400'></div>
      <div className='absolute top-0 right-0 w-1 h-40 bg-purple-600'></div>
      <div className='absolute bottom-0 left-0 w-40 h-1 bg-green-400'></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-slate-900 border-2 border-slate-800 p-8 w-full max-w-md relative'
      >
        <div className='absolute -top-1 -left-1 w-3 h-3 bg-purple-600'></div>
        <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-400'></div>

        <div className='text-center mb-8'>
          <div className='flex justify-center mb-4'>
            <div className='w-16 h-16 bg-slate-800 border-2 border-purple-600 flex items-center justify-center'>
              <User className='text-purple-400' size={32} />
            </div>
          </div>
          <h1 className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-green-400 bg-clip-text text-transparent'>
            CREATE_ADMIN_ACCOUNT
          </h1>
          <p className='text-slate-400 mt-2 text-sm font-mono'>
            SECURE_REGISTRATION
          </p>
        </div>

        {error && (
          <div className='mb-6 p-3 border border-red-900/50 bg-red-900/20 text-red-400 flex items-start'>
            <AlertTriangle size={18} className='mr-2 mt-0.5 flex-shrink-0' />
            <p className='text-sm'>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <label className='block text-slate-400 text-sm font-mono mb-2'>
              EMAIL
            </label>
            <div className='relative'>
              <div className='absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r border-slate-700'>
                <Mail size={16} className='text-slate-500' />
              </div>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full bg-slate-800 border border-slate-700 p-3 pl-12 text-slate-200 focus:border-purple-600 outline-none transition-colors'
                placeholder='Enter email'
              />
            </div>
          </div>

          <div className='mb-6'>
            <label className='block text-slate-400 text-sm font-mono mb-2'>
              USERNAME
            </label>
            <div className='relative'>
              <div className='absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r border-slate-700'>
                <User size={16} className='text-slate-500' />
              </div>
              <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full bg-slate-800 border border-slate-700 p-3 pl-12 text-slate-200 focus:border-purple-600 outline-none transition-colors'
                placeholder='Enter username'
              />
            </div>
          </div>

          <div className='mb-6'>
            <label className='block text-slate-400 text-sm font-mono mb-2'>
              FULL_NAME (OPTIONAL)
            </label>
            <div className='relative'>
              <div className='absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r border-slate-700'>
                <User size={16} className='text-slate-500' />
              </div>
              <input
                type='text'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className='w-full bg-slate-800 border border-slate-700 p-3 pl-12 text-slate-200 focus:border-purple-600 outline-none transition-colors'
                placeholder='Enter full name (optional)'
              />
            </div>
          </div>

          <div className='mb-6'>
            <label className='block text-slate-400 text-sm font-mono mb-2'>
              PASSWORD
            </label>
            <div className='relative'>
              <div className='absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r border-slate-700'>
                <Lock size={16} className='text-slate-500' />
              </div>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full bg-slate-800 border border-slate-700 p-3 pl-12 text-slate-200 focus:border-purple-600 outline-none transition-colors'
                placeholder='Enter password'
              />
            </div>
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full bg-transparent border-2 border-purple-600 text-purple-300 p-3 font-medium hover:bg-purple-900/30 transition-all duration-300 flex items-center justify-center'
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
                <RefreshCw className='w-5 h-5' />
              </motion.div>
            ) : (
              <span className='font-mono'>CREATE_ACCOUNT</span>
            )}
          </button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-slate-500 text-xs font-mono'>
            SYSTEM_VERSION: 2.4.1
          </p>
        </div>
      </motion.div>
    </div>
  );
}
