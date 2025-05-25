'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='border-t border-slate-800 bg-slate-950 px-4 py-8'>
      <div className='container mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center'
        >
          <div className='flex items-center justify-center font-mono text-sm text-slate-400'>
            <span>Made with</span>
            <Heart className='mx-2 size-4 animate-pulse text-red-500' />
            <span>by my best friend Tony &apos;linguiça&apos; Lima.</span>
          </div>

          {/* Decorative elements */}
          <div className='mt-4 flex items-center justify-center space-x-4'>
            <div className='h-1 w-8 bg-purple-600'></div>
            <div className='size-2 animate-pulse bg-green-400'></div>
            <div className='h-1 w-8 bg-green-400'></div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
