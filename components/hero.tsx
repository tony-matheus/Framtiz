'use client';

import { useCanvasEffect } from '@/lib/hooks/use-canvas-effect';
import { motion } from 'framer-motion';
import { ArrowDown, Terminal } from 'lucide-react';
import { Button } from './ui/button';

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
    <section className='relative h-screen flex items-center justify-center overflow-hidden'>
      <canvas
        ref={canvasRef}
        className='absolute inset-0 z-10 opacity-40'
      ></canvas>
      {/* Decorative elements */}
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-green-400'></div>
      <div className='absolute top-0 right-0 w-1 h-40 bg-purple-600'></div>
      <div className='absolute bottom-0 left-0 w-40 h-1 bg-green-400'></div>
      <div className='container mx-auto px-4 z-10'>
        <div className='max-w-3xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='flex items-center mb-4'
          >
            <Terminal className='text-green-400 mr-2' />
            <div className='text-sm text-green-400 font-mono'>
              <span className='animate-pulse'>▋</span> SYSTEM ONLINE
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-green-400 bg-clip-text text-transparent border-l-4 border-purple-600 pl-4'>
              {profile.name}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className='text-xl md:text-2xl mb-8 text-slate-300 font-mono border-l-4 border-green-400 pl-4'>
              {profile.description}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='flex flex-wrap gap-3 mb-10'
          >
            {['Elixir', 'Pill', 'Cerveja', 'Brenda'].map((tech, index) => (
              <span
                key={index}
                className='px-4 py-2 text-sm bg-slate-800 text-purple-300 border border-purple-600 flex items-center'
              >
                <span className='w-2 h-2 bg-green-400 mr-2'></span>
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
              <span className='w-2 h-2 bg-green-400 animate-pulse'></span>
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
        className='absolute bottom-10 left-1/2 transform -translate-x-1/2'
      >
        <ArrowDown className='w-6 h-6 text-purple-400' />
      </motion.div>
      {/* Game-like notification */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className='absolute top-10 right-10 bg-slate-800/80 border-l-4 border-green-400 p-4 max-w-xs'
      >
        <div className='text-xs text-green-400 mb-1 font-mono'>
          SYSTEM NOTIFICATION
        </div>
        <div className='text-slate-200'>
          Portfolio system initialized. Scroll down to view projects.
        </div>
      </motion.div>
    </section>
  );
}
