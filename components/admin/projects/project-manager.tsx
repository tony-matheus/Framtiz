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
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-green-400 bg-clip-text text-transparent'>
          PROJECT_MANAGEMENT
        </h2>
        <div className='flex gap-4'>
          <button
            onClick={refreshProjects}
            disabled={isLoading}
            className='px-4 py-2 bg-slate-800 border border-purple-600 text-purple-300 flex items-center hover:bg-purple-900/30 transition-colors'
          >
            <RefreshCw
              size={16}
              className={`mr-2 ${isLoading ? 'animate-spin' : ''}`}
            />
            <span className='font-mono text-sm'>REFRESH</span>
          </button>
          <button
            onClick={handleCreateProject}
            className='px-4 py-2 bg-slate-800 border border-green-600 text-green-300 flex items-center hover:bg-green-900/30 transition-colors'
          >
            <Plus size={16} className='mr-2' />
            <span className='font-mono text-sm'>NEW_PROJECT</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className='relative'>
        <div className='absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r border-slate-700'>
          <Search size={16} className='text-slate-500' />
        </div>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full bg-slate-800 border border-slate-700 p-3 pl-12 text-slate-200 focus:border-purple-600 outline-none transition-colors'
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
      <div className='bg-slate-900 border border-slate-800'>
        <div className='grid grid-cols-[1fr_auto] gap-4 p-3 border-b border-slate-800 text-xs text-slate-400 font-mono'>
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
              className='grid grid-cols-[1fr_auto] gap-4 p-3 border-b border-slate-800 items-center hover:bg-slate-800/50'
              whileHover={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
            >
              <div>
                <div className='flex items-center'>
                  <h3 className='font-mono text-sm text-slate-200'>
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className='ml-2 px-2 py-0.5 bg-purple-900/30 border border-purple-600 text-purple-300 text-xs'>
                      FEATURED
                    </span>
                  )}
                </div>
                <div className='text-xs text-slate-400 mt-1'>
                  {project.description}
                </div>
                <div className='flex flex-wrap gap-1 mt-2'>
                  {project.tech_stack.map((tech, index) => (
                    <span
                      key={index}
                      className='px-2 py-0.5 bg-slate-800 text-xs text-purple-300 border border-purple-900'
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
                  className={`p-2 border ${
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
                  className='p-2 border border-slate-700 text-slate-400 hover:border-purple-600 hover:text-purple-300 hover:bg-purple-900/20 transition-colors'
                  title='Edit project'
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className='p-2 border border-slate-700 text-slate-400 hover:border-red-600 hover:text-red-300 hover:bg-red-900/20 transition-colors'
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
