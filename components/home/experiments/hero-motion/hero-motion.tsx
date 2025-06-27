'use client';

import { useCanvasEffect } from '@/hooks/use-canvas-effect';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import Skills from './skills';
import ProfilePic from './profile-pic';

export type Profile = {
  id: number;
  name: string;
  description: string;
  github_url: string;
};

interface ProjectShowcaseProps {
  profile: Profile;
}

export default function HeroMotion({ profile }: ProjectShowcaseProps) {
  const canvasRef = useCanvasEffect();

  return (
    <section className='relative flex h-screen items-center justify-center overflow-hidden'>
      <canvas ref={canvasRef} className='absolute inset-0 z-10 opacity-40' />
      {/* Decorative elements */}
      <div className='absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-purple-600 to-green-400'></div>
      <div className='absolute right-0 top-0 h-40 w-1 bg-purple-600'></div>
      <div className='absolute bottom-0 left-0 h-1 w-40 bg-green-400'></div>
      <div className='container z-10 mx-auto px-4 text-center'>
        <ProfilePic />
        <div className='mx-auto max-w-3xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className='mb-6 inline-flex border-l-0 border-purple-600 bg-gradient-to-r from-purple-600 to-green-400 bg-clip-text pl-0 text-4xl font-bold text-transparent md:border-l-4 md:pl-4 md:text-6xl'>
              {profile.name}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className='mx-auto mb-8 inline-flex border-l-0 border-green-400 pl-0 font-mono text-lg text-slate-300 md:border-l-4 md:pl-4 md:text-2xl'>
              {profile.description}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <CyberButton
              size='lg'
              variant='outline'
              className='mx-auto'
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className='mr-2'>INITIALIZE CONTACT</span>
              <ArrowDown />
            </CyberButton>
          </motion.div>
        </div>
      </div>

      <Skills />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
        }}
        className='absolute inset-x-auto bottom-4'
      >
        <ArrowDown className='size-6 text-purple-400' />
      </motion.div>
      {/* Game-like notification */}
      {/* <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className='absolute right-4 top-10 max-w-xs border-l-4 border-green-400 bg-slate-800/80 p-4 md:right-10'
      >
        <div className='mb-1 font-mono text-xs text-green-400'>
          SYSTEM NOTIFICATION
        </div>
        <div className='text-slate-200'>
          Portfolio system initialized. Scroll down to view projects.
        </div>
      </motion.div> */}
    </section>
  );
}
