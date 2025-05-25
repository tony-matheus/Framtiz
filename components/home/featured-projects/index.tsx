'use client';

import { useOneTimeAnimation } from '@/lib/hooks/use-one-time-animations';
import { motion } from 'framer-motion';
import ProjectCard from './project-card';
import { Project } from '@/lib/services/project-service';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const { ref, shouldAnimate } = useOneTimeAnimation(0.1);

  const handleShare = (project: Project) => {
    const text = `Check out ${project.title}: ${project.description}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(project.github_url)}`;
    window.open(url, '_blank');
  };

  return (
    <section
      ref={ref}
      className='w-full border-y border-slate-800 bg-slate-900'
      id='projects'
    >
      <div className='container mx-auto px-4 py-24'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='mb-20 text-center'
        >
          <h2 className='mb-6 text-4xl font-light text-slate-100 md:text-6xl'>
            Featured Projects
          </h2>
          <p className='mx-auto max-w-3xl text-xl font-light text-slate-400'>
            A selection of projects showcasing innovative solutions and
            technical excellence.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              animate={
                shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }
              }
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                image='/placeholder.svg'
                url={project.github_url}
                onClick={() => handleShare(project)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
