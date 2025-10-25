'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, Terminal, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCanvasEffect } from '@/hooks/use-canvas-effect';

export function ParallaxBackground() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 10; // range: -5 to 5
      const y = (e.clientY / innerHeight - 0.5) * 10;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className='absolute inset-0 overflow-hidden'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-75 will-change-transform'
        style={{
          backgroundImage: `url('/will-compressed.png?height=1080&width=1920')`,
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          maskImage:
            'radial-gradient(ellipse at center, black 60%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 60%, transparent 100%)',
        }}
      />
      {/* Filter overlays */}
      <div className='absolute inset-0 bg-gradient-to-br from-purple-900/40 via-slate-950/60 to-green-900/40'></div>
      <div className='absolute inset-0 bg-slate-950/50'></div>
    </div>
  );
}

export default function ExperimentHero() {
  const [isAchivementVisible, setIsAchivementVisible] = useState(true);

  const canvasRef = useCanvasEffect();

  return (
    <section className='relative flex h-screen items-center justify-center overflow-hidden'>
      {/* Background Image with Filters */}
      <ParallaxBackground />

      <canvas
        ref={canvasRef}
        className='absolute inset-0 z-10 opacity-40'
      ></canvas>

      {/* Decorative elements */}
      <div className='absolute left-0 top-0 z-20 h-1 w-full bg-gradient-to-r from-purple-600 to-green-400'></div>
      <div className='absolute right-0 top-0 z-20 h-40 w-1 bg-purple-600'></div>
      <div className='absolute bottom-0 left-0 z-20 h-1 w-40 bg-green-400'></div>

      <div className='container relative z-30 mx-auto px-4'>
        <div className='mx-auto max-w-4xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='mb-6 flex items-center justify-center'
          >
            <Terminal className='mr-3 text-green-400' size={20} />
            <div className='font-mono text-sm text-green-400'>
              <span className='animate-pulse'>▋</span> SYSTEM ONLINE - PORTFOLIO
              v2.0
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className='mb-6 bg-gradient-to-r from-purple-400 via-purple-600 to-green-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-7xl'>
              WILLIAN L. FRANTZ
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className='mb-8 font-mono text-xl text-slate-200 sm:text-2xl md:text-3xl'>
              GAME DEVELOPER / SENIOR ANTI_CHEAT ENGINEER
            </h2>
            <p className='mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-300'></p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='mb-10 flex flex-wrap justify-center gap-3'
          >
            {[
              // TwitterIcon,
              // Linkedin,
              // Github,
              'Erlang',
              'Unreal 5',
              'Anti-cheat',
              'Brenda',
              'Tony',
            ].map((tech, index) => (
              <span
                key={index}
                className='flex items-center border border-purple-600/50 bg-slate-800/80 px-4 py-2 text-sm text-purple-300 backdrop-blur-sm transition-all duration-300 hover:bg-purple-900/30'
              >
                <span className='mr-2 size-2 animate-pulse bg-green-400'></span>
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className='flex flex-col items-center justify-center gap-4 sm:flex-row'
          >
            {/* <button className='group flex items-center bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-4 font-medium text-white transition-all duration-300 hover:from-purple-700 hover:to-purple-800'>
              <span className='mr-2'>VIEW PROJECTS</span>
              <ArrowDown className='size-4 transition-transform group-hover:translate-y-1' />
            </button> */}

            <button className='group flex items-center border-2 border-green-500 bg-transparent px-8 py-4 text-green-400 transition-all duration-300 hover:bg-green-500/10'>
              <Download className='mr-2 size-4 transition-transform group-hover:translate-y-1' />
              <span>DOWNLOAD CV</span>
            </button>
            <Button size='lg' className='group px-8 py-4'>
              VIEW PROJECTS
              <ArrowDown className='size-4 transition-transform group-hover:translate-y-1' />
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
        className='absolute bottom-10 left-1/2 z-30 -translate-x-1/2'
      >
        <ArrowDown className='size-6 text-purple-400' />
      </motion.div>

      {/* Achievement notification */}

      <AnimatePresence>
        {isAchivementVisible && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            exit={{
              x: 50,
              opacity: 0,
              transition: { delay: 0, duration: 0.3 },
            }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className='absolute right-4 top-10 z-30 hidden'
          >
            <div className='max-w-xs border-l-4 border-green-400 bg-slate-900/90 p-4 backdrop-blur-sm sm:right-10'>
              <button
                onClick={() => setIsAchivementVisible(false)}
                className='absolute right-2 top-2 text-slate-400 transition hover:text-white'
                aria-label='Close'
              >
                <X size={16} />
              </button>

              <div className='mb-1 font-mono text-xs text-green-400'>
                ACHIEVEMENT UNLOCKED
              </div>
              <div className='text-sm text-slate-200'>
                Portfolio system initialized. Ready for exploration.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
