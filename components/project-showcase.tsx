'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from './project-card';
import type { Project } from '@/lib/services/project-service';

interface ProjectShowcaseProps {
  projects: Project[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <section ref={ref} className='py-20 px-4 bg-slate-950 relative'>
      {/* Decorative elements */}
      <div className='absolute top-0 right-0 w-1/4 h-1 bg-purple-600'></div>
      <div className='absolute bottom-0 left-0 w-1/4 h-1 bg-green-400'></div>

      <div className='container mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className='mb-16 border-l-4 border-purple-600 pl-4'
        >
          <div className='flex items-center mb-2'>
            <div className='w-2 h-2 bg-green-400 mr-2'></div>
            <div className='text-sm text-green-400 font-mono'>
              PROJECTS_DATABASE
            </div>
          </div>
          <h2 className='text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-green-400 bg-clip-text text-transparent'>
            FEATURED_PROJECTS
          </h2>
          <p className='text-slate-300 max-w-2xl'>
            A collection of advanced systems and applications developed with
            cutting-edge technologies.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
