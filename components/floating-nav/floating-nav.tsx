'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Mail, Terminal, Shield } from 'lucide-react';
import NavItem from './nav-item';
import PowerStatus from './power-status';
import { clientAuthService } from '@/lib/services/auth/client-auth-service';

const NAV_ITEMS = [
  {
    icon: <Home size={18} />,
    label: 'HOME_TERMINAL',
    href: '/',
    status: 'ACTIVE',
  },
  {
    icon: <User size={18} />,
    label: 'USER_PROFILE',
    href: '/admin',
    status: 'SECURE',
  },
  {
    icon: <Briefcase size={18} />,
    label: 'PROJECT_DATABASE',
    href: '#',
    status: 'ONLINE',
  },
  {
    icon: <Mail size={18} />,
    label: 'MESSAGE_SYSTEM',
    href: '#',
    status: 'IDLE',
  },
];

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [percentage, setPercentage] = useState(50);

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      const user = await clientAuthService.getCurrentUser();
      setIsAdmin(!!user?.is_admin);
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
          className={`w-14 h-14 bg-slate-900 border-2 ${
            glitchActive ? 'border-red-500' : 'border-purple-600'
          } text-white flex items-center justify-center z-10 relative`}
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
              className={`absolute bottom-16 right-0 bg-slate-900 border-2 ${
                glitchActive ? 'border-red-500' : 'border-purple-600'
              } min-w-[280px]`}
            >
              {/* Header */}
              <div className='border-b border-slate-800 p-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <div className='w-2 h-2 bg-green-400 mr-2 animate-pulse'></div>
                    <div className='text-xs text-green-400 font-mono'>
                      SYSTEM_TERMINAL
                    </div>
                  </div>
                  <div className='text-xs text-slate-500 font-mono'>v0.0.1</div>
                </div>
              </div>

              {/* Security status */}
              <div className='border-b border-slate-800 p-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Shield size={14} className='text-purple-400 mr-2' />
                    <div className='text-xs text-slate-300 font-mono'>
                      SECURITY_STATUS
                    </div>
                  </div>
                  <div
                    className={`text-xs font-mono ${
                      glitchActive ? 'text-red-500' : 'text-green-400'
                    }`}
                  >
                    {glitchActive ? 'COMPROMISED' : 'SECURED'}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className='p-2'>
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={index}
                    className='mb-2'
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {/* Don't show admin link if not admin */}
                    {(item.label !== 'USER_PROFILE' || isAdmin) && (
                      <NavItem
                        {...item}
                        errorType={glitchActive ? 'error' : 'success'}
                      />
                    )}
                  </motion.div>
                ))}

                {/* Login/Signup links if not admin */}
                {!isAdmin && (
                  <>
                    <motion.div
                      className='mb-2'
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <NavItem
                        label='Login'
                        href='/admin/login'
                        status='SECURE'
                        icon={<User size={18} />}
                      />
                    </motion.div>
                  </>
                )}
              </div>

              {/* Power status */}
              <PowerStatus percentage={percentage} status={getPowerStatus()} />

              {/* Decorative elements */}
              <div className='absolute -top-1 -left-1 w-3 h-3 bg-purple-600'></div>
              <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-400'></div>

              {/* Grid overlay for hacking aesthetic */}
              <div className='absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:10px_10px] z-[-1]'></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
