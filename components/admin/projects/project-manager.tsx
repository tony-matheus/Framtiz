'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, RefreshCw, Search, Edit, Trash2, Star } from 'lucide-react';
import type { Project } from '@/lib/services/project-service';
import ProjectForm from './project-form';

interface ProjectManagerProps {
  initialProjects: Project[];
}

export default function ProjectManager({
  initialProjects,
}: ProjectManagerProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Filter projects based on search term
  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const refreshProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error refreshing projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = () => {
    setEditingProject(null);
    setIsCreating(true);
  };

  const handleEditProject = (project: Project) => {
    setIsCreating(false);
    setEditingProject(project);
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      } else {
        alert('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('An error occurred while deleting the project');
    }
  };

  const handleToggleFeatured = async (id: number, featured: boolean) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !featured }),
      });

      if (response.ok) {
        setProjects(
          projects.map((p) => (p.id === id ? { ...p, featured: !featured } : p))
        );
      } else {
        alert('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      alert('An error occurred while updating the project');
    }
  };

  const handleProjectSaved = (savedProject: Project) => {
    if (editingProject) {
      // Update existing project
      setProjects(
        projects.map((p) => (p.id === savedProject.id ? savedProject : p))
      );
      setEditingProject(null);
    } else {
      // Add new project
      setProjects([savedProject, ...projects]);
      setIsCreating(false);
    }
  };

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h2 className='bg-gradient-to-r from-purple-600 to-green-400 bg-clip-text text-2xl font-bold text-transparent'>
          PROJECT_MANAGEMENT
        </h2>
        <div className='flex gap-4'>
          <button
            onClick={refreshProjects}
            disabled={isLoading}
            className='flex items-center border border-purple-600 bg-slate-800 px-4 py-2 text-purple-300 transition-colors hover:bg-purple-900/30'
          >
            <RefreshCw
              size={16}
              className={`mr-2 ${isLoading ? 'animate-spin' : ''}`}
            />
            <span className='font-mono text-sm'>REFRESH</span>
          </button>
          <button
            onClick={handleCreateProject}
            className='flex items-center border border-green-600 bg-slate-800 px-4 py-2 text-green-300 transition-colors hover:bg-green-900/30'
          >
            <Plus size={16} className='mr-2' />
            <span className='font-mono text-sm'>NEW_PROJECT</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex w-10 items-center justify-center border-r border-slate-700'>
          <Search size={16} className='text-slate-500' />
        </div>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full border border-slate-700 bg-slate-800 p-3 pl-12 text-slate-200 outline-none transition-colors focus:border-purple-600'
          placeholder='Search projects...'
        />
      </div>

      {/* Project Form */}
      {(isCreating || editingProject) && (
        <ProjectForm
          project={editingProject}
          onSave={handleProjectSaved}
          onCancel={() => {
            setIsCreating(false);
            setEditingProject(null);
          }}
        />
      )}

      {/* Projects List */}
      <div className='border border-slate-800 bg-slate-900'>
        <div className='grid grid-cols-[1fr_auto] gap-4 border-b border-slate-800 p-3 font-mono text-xs text-slate-400'>
          <div>PROJECT</div>
          <div>ACTIONS</div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className='p-6 text-center text-slate-400'>
            No projects found matching your search criteria.
          </div>
        ) : (
          filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className='grid grid-cols-[1fr_auto] items-center gap-4 border-b border-slate-800 p-3 hover:bg-slate-800/50'
              whileHover={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
            >
              <div>
                <div className='flex items-center'>
                  <h3 className='font-mono text-sm text-slate-200'>
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className='ml-2 border border-purple-600 bg-purple-900/30 px-2 py-0.5 text-xs text-purple-300'>
                      FEATURED
                    </span>
                  )}
                </div>
                <div className='mt-1 text-xs text-slate-400'>
                  {project.description}
                </div>
                <div className='mt-2 flex flex-wrap gap-1'>
                  {project.tech_stack.map((tech, index) => (
                    <span
                      key={index}
                      className='border border-purple-900 bg-slate-800 px-2 py-0.5 text-xs text-purple-300'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() =>
                    handleToggleFeatured(project.id, project.featured)
                  }
                  className={`border p-2 ${
                    project.featured
                      ? 'border-yellow-600 text-yellow-400 hover:bg-yellow-900/20'
                      : 'border-slate-700 text-slate-400 hover:bg-slate-800'
                  } transition-colors`}
                  title={
                    project.featured
                      ? 'Remove from featured'
                      : 'Add to featured'
                  }
                >
                  <Star size={16} />
                </button>
                <button
                  onClick={() => handleEditProject(project)}
                  className='border border-slate-700 p-2 text-slate-400 transition-colors hover:border-purple-600 hover:bg-purple-900/20 hover:text-purple-300'
                  title='Edit project'
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className='border border-slate-700 p-2 text-slate-400 transition-colors hover:border-red-600 hover:bg-red-900/20 hover:text-red-300'
                  title='Delete project'
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
