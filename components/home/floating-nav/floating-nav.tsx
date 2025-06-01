'use client';

import { useState, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Mail, Terminal, Shield } from 'lucide-react';
import NavItem, { NavItemsProps } from './nav-item';
import PowerStatus from './power-status';
import { clientAuthService } from '@/lib/services/auth/client-auth-service';

const LOGOUT_NAV_ITEMS = [
  {
    icon: <Home size={18} />,
    label: 'BLOG',
    href: '/blog',
    status: 'ACTIVE',
  },
  {
    icon: <Mail size={18} />,
    label: 'CONTACT',
    href: '/',
    status: 'INACTIVE',
  },
] satisfies NavItemsProps[];

const LOGGED_IN_NAV_ITEMS = [
  {
    icon: <Home size={18} />,
    label: 'ADMIN',
    href: '/admin',
    status: 'ACTIVE',
  },
  {
    icon: <User size={18} />,
    label: 'USER_PROFILE',
    href: '/admin',
    status: 'ACTIVE',
  },
  {
    icon: <User size={18} />,
    label: 'LOGOUT',
    href: '/admin',
    status: 'INACTIVE',
  },
] satisfies NavItemsProps[];

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [percentage, setPercentage] = useState(50);
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      const user = await clientAuthService.getCurrentUser();
      setLoggedIn(!!user);
      setIsAdmin(!!user?.isAdmin);
    };

    checkAdmin();
  }, []);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitchActive(true);
        setPercentage((prev) => (prev - 15 <= 0 ? 0 : prev - 15));
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 8000);
    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    if (percentage <= 0) {
      setPercentage(100);
    }
  }, [percentage]);

  const getPowerStatus = () => {
    if (percentage < 20) {
      return 'low';
    } else if (percentage < 40) {
      return 'medium';
    }
    return 'high';
  };

  return (
    <div className='fixed bottom-6 right-6 z-50'>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='relative'
      >
        {/* Toggle Button */}
        <motion.button
          className={`size-14 border-2 bg-slate-900 ${
            glitchActive ? 'border-red-500' : 'border-purple-600'
          } relative z-10 flex items-center justify-center text-white`}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ borderColor: '#10b981' }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Terminal
              size={24}
              className={glitchActive ? 'text-red-500' : 'text-purple-400'}
            />
          </motion.div>
        </motion.button>

        {/* Nav Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={`absolute bottom-16 right-0 border-2 bg-slate-900 ${
                glitchActive ? 'border-red-500' : 'border-purple-600'
              } min-w-[280px]`}
            >
              {/* Header */}
              <div className='border-b border-slate-800 p-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <div className='mr-2 size-2 animate-pulse bg-green-400'></div>
                    <div className='font-mono text-xs text-green-400'>
                      SYSTEM_TERMINAL
                    </div>
                  </div>
                  <div className='font-mono text-xs text-slate-500'>v0.0.1</div>
                </div>
              </div>

              {/* Security status */}
              <div className='border-b border-slate-800 p-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Shield size={14} className='mr-2 text-purple-400' />
                    <div className='font-mono text-xs text-slate-300'>
                      SECURITY_STATUS
                    </div>
                  </div>
                  <div
                    className={`font-mono text-xs ${
                      glitchActive ? 'text-red-500' : 'text-green-400'
                    }`}
                  >
                    {glitchActive ? 'COMPROMISED' : 'SECURED'}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className='p-2'>
                {LOGOUT_NAV_ITEMS.map((item, index) => (
                  <Fragment key={index}>
                    {/* Don't show admin link if not admin */}
                    {(item.label !== 'USER_PROFILE' || isAdmin) && (
                      <NavItem
                        className='mb-2'
                        {...item}
                        status={glitchActive ? 'INACTIVE' : item.status}
                      />
                    )}
                  </Fragment>
                ))}

                {LOGGED_IN_NAV_ITEMS.map((item, index) => (
                  <Fragment key={index}>
                    {/* Don't show admin link if not admin */}
                    {(item.label !== 'USER_PROFILE' || isAdmin) && (
                      <NavItem
                        className='mb-2'
                        {...item}
                        status={glitchActive ? 'INACTIVE' : item.status}
                      />
                    )}
                  </Fragment>
                ))}

                {/* Login/Signup links if not admin */}
                {!loggedIn && (
                  <NavItem
                    label='Login'
                    href='/admin/login'
                    status='ACTIVE'
                    icon={<User size={18} />}
                    className='mb-2'
                  />
                )}
              </div>

              {/* Power status */}
              <PowerStatus percentage={percentage} status={getPowerStatus()} />

              {/* Decorative elements */}
              <div className='absolute -left-1 -top-1 size-3 bg-purple-600'></div>
              <div className='absolute -bottom-1 -right-1 size-3 bg-green-400'></div>

              {/* Grid overlay for hacking aesthetic */}
              <div className='pointer-events-none absolute inset-0 z-[-1] bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)]'></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
