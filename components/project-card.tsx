'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Lock, Shield } from 'lucide-react';
import Image from 'next/image';
import type { Project } from '@/lib/services/project-service';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <motion.div
      className={`bg-slate-900 border-2 border-slate-800 overflow-hidden h-full relative ${
        glitchActive ? 'glitch' : ''
      }`}
      whileHover={{
        borderColor: '#8b5cf6',
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Status indicator */}
      <div className='absolute top-0 right-0 z-10'>
        <div className='flex items-center bg-slate-800 px-3 py-1'>
          <span className='w-2 h-2 bg-green-400 mr-2 animate-pulse'></span>
          <span className='text-xs text-green-400 font-mono'>
            {project.status}
          </span>
        </div>
      </div>

      {/* Level badge */}
      <div className='absolute top-0 left-0 z-10'>
        <div className='flex items-center bg-purple-900/50 px-3 py-1 border-r border-b border-purple-600'>
          <span className='text-xs text-purple-300 font-mono'>
            {project.level}
          </span>
        </div>
      </div>

      <div className='relative h-56 overflow-hidden'>
        <Image
          src={project.image_url || '/placeholder.svg?height=300&width=500'}
          alt={project.title}
          fill
          className='object-cover transition-transform duration-700'
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            filter: glitchActive ? 'hue-rotate(90deg) brightness(1.2)' : 'none',
          }}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80'></div>

        {/* Grid overlay */}
        <div className='absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]'></div>

        {/* Title */}
        <div className='absolute bottom-0 left-0 right-0 p-4'>
          <h3 className='text-xl font-bold text-white font-mono border-l-2 border-green-400 pl-2'>
            {project.title}
          </h3>
        </div>
      </div>

      <div className='p-6 relative'>
        <div className='absolute -top-10 right-4 flex gap-2'>
          <motion.a
            href={project.github_url}
            target='_blank'
            rel='noopener noreferrer'
            className='w-10 h-10 bg-slate-800 border border-purple-600 flex items-center justify-center text-purple-300'
            whileHover={{
              backgroundColor: '#10b981',
              borderColor: '#10b981',
              color: '#ffffff',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={18} />
          </motion.a>
          {project.live_url && (
            <motion.a
              href={project.live_url}
              target='_blank'
              rel='noopener noreferrer'
              className='w-10 h-10 bg-slate-800 border border-green-400 flex items-center justify-center text-green-300'
              whileHover={{
                backgroundColor: '#8b5cf6',
                borderColor: '#8b5cf6',
                color: '#ffffff',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={18} />
            </motion.a>
          )}
        </div>

        <p className='text-slate-300 mb-4 mt-2'>{project.description}</p>

        <div className='flex flex-wrap gap-2 mt-auto'>
          {/* {project.tech_stack.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-slate-800 text-purple-300 border border-purple-900 flex items-center"
            >
              <span className="w-1 h-1 bg-green-400 mr-1"></span>
              {tech}
            </span>
          ))} */}
        </div>

        {/* Security indicators */}
        <div className='absolute bottom-2 right-2 flex items-center text-xs text-slate-500'>
          <Lock size={12} className='mr-1' />
          <Shield size={12} />
        </div>
      </div>

      {/* Glitch effect overlay */}
      {glitchActive && (
        <div className='absolute inset-0 bg-purple-600/10 z-10 pointer-events-none'></div>
      )}

      {/* Corner decorations */}
      <div className='absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-600'></div>
      <div className='absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-400'></div>
    </motion.div>
  );
}
