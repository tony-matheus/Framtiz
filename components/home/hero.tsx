'use client';

import { useCanvasEffect } from '@/hooks/use-canvas-effect';
import { motion } from 'framer-motion';
import { ArrowDown, Terminal } from 'lucide-react';
import { Button } from '../ui/primitives/button';

export type Profile = {
  id: number;
  name: string;
  description: string;
  github_url: string;
};

interface ProjectShowcaseProps {
  profile: Profile;
}

export default function Hero({ profile }: ProjectShowcaseProps) {
  const canvasRef = useCanvasEffect();

  return (
    <section className='relative flex h-screen items-center justify-center overflow-hidden'>
      <canvas ref={canvasRef} className='absolute inset-0 z-10 opacity-40' />
      {/* Decorative elements */}
      <div className='absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-purple-600 to-green-400'></div>
      <div className='absolute right-0 top-0 h-40 w-1 bg-purple-600'></div>
      <div className='absolute bottom-0 left-0 h-1 w-40 bg-green-400'></div>
      <div className='container z-10 mx-auto px-4'>
        <div className='mx-auto max-w-3xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='mb-4 flex items-center'
          >
            <Terminal className='mr-2 text-green-400' />
            <div className='font-mono text-sm text-green-400'>
              <span className='animate-pulse'>▋</span> SYSTEM ONLINE
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className='mb-6 border-l-4 border-purple-600 bg-gradient-to-r from-purple-600 to-green-400 bg-clip-text pl-4 text-4xl font-bold text-transparent md:text-6xl'>
              {profile.name}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className='mb-8 border-l-4 border-green-400 pl-4 font-mono text-xl text-slate-300 md:text-2xl'>
              {profile.description}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='mb-10 flex flex-wrap gap-3'
          >
            {['Elixir', 'Pill', 'Cerveja', 'Brenda'].map((tech, index) => (
              <span
                key={index}
                className='flex items-center border border-purple-600 bg-slate-800 px-4 py-2 text-sm text-purple-300'
              >
                <span className='mr-2 size-2 bg-green-400'></span>
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button size='default' variant='outline'>
              <span className='mr-2'>INITIALIZE CONTACT</span>
              <span className='size-2 animate-pulse bg-green-400'></span>
            </Button>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
        }}
        className='absolute bottom-10 left-1/2 -translate-x-1/2'
      >
        <ArrowDown className='size-6 text-purple-400' />
      </motion.div>
      {/* Game-like notification */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className='absolute right-10 top-10 max-w-xs border-l-4 border-green-400 bg-slate-800/80 p-4'
      >
        <div className='mb-1 font-mono text-xs text-green-400'>
          SYSTEM NOTIFICATION
        </div>
        <div className='text-slate-200'>
          Portfolio system initialized. Scroll down to view projects.
        </div>
      </motion.div>
    </section>
  );
}
