'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { Save, Sparkles, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { Project } from '@/lib/services/project-service';

interface ProjectEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRepo: Project;
  onSave: (updatedRepo: Project) => void;
  className?: string;
}

export default function ProjectEditorModal({
  isOpen,
  onClose,
  selectedRepo,
  onSave,
  className,
}: ProjectEditorModalProps) {
  const [editingRepo, setEditingRepo] = useState(selectedRepo);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Update editing repo when selected repo changes
  useEffect(() => {
    if (selectedRepo) {
      setEditingRepo(selectedRepo);
    }
  }, [selectedRepo]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditingRepo({ ...editingRepo, [name]: value });
  };

  // Generate AI description
  const generateDescription = () => {
    setIsGeneratingDescription(true);

    // Simulate API call to generate description
    setTimeout(() => {
      const aiDescriptions = [
        'An advanced machine learning platform that leverages neural networks for content generation with state-of-the-art language models.',
        'A secure and robust blockchain wallet solution featuring multi-signature authentication and encrypted storage.',
        'High-performance VPN service with military-grade encryption and anonymous routing protocols.',
        'Real-time monitoring dashboard with predictive analytics and intelligent alerting capabilities.',
        'Comprehensive IoT management platform with mesh networking support and secure device communication.',
        'Cloud-native development environment with integrated CI/CD pipelines and containerized workflows.',
      ];

      const randomDescription =
        aiDescriptions[Math.floor(Math.random() * aiDescriptions.length)];

      setEditingRepo({ ...editingRepo, description: randomDescription });
      setIsGeneratingDescription(false);
    }, 2000);
  };

  // Save changes to the selected repo
  const saveChanges = () => {
    setIsSaving(true);

    // Simulate API call to save changes
    setTimeout(() => {
      onSave(editingRepo);
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  if (!isOpen || !selectedRepo) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm'
        onClick={onClose}
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      />

      {/* Modal */}
      <div
        className={`fixed left-1/2 top-1/2 z-50 flex max-h-[90vh] w-[95%] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col border-2 border-slate-800 bg-slate-900 ${className}`}
        style={{
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
          animation: 'scaleIn 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative elements */}
        <div className='absolute -left-1 -top-1 size-3 bg-purple-600'></div>
        <div className='absolute -bottom-1 -right-1 size-3 bg-green-400'></div>
        <div className='absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-purple-600 to-transparent'></div>
        <div className='absolute bottom-0 right-0 h-1 w-full bg-gradient-to-l from-green-400 to-transparent'></div>

        {/* Header */}
        <div className='z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900 p-4'>
          <h2 className='flex items-center font-mono text-xl font-bold text-slate-200'>
            <div className='mr-2 size-2 animate-pulse bg-green-400'></div>
            EDITING: {editingRepo.title.toUpperCase()}
          </h2>
          <Button variant='outline' size='icon' onClick={onClose}>
            <X size={18} />
          </Button>
        </div>

        {/* Content - scrollable area */}
        <div
          className='flex-1 overflow-y-auto p-4'
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#8b5cf6 #1e293b' }}
        >
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
            {/* Preview panel */}
            <CyberCard className='h-fit lg:col-span-1'>
              <CyberCardContent>
                <h3 className='mb-4 flex items-center font-mono text-lg text-slate-200'>
                  <div className='mr-2 size-2 bg-purple-400'></div>
                  PROJECT_PREVIEW
                </h3>
                <div className='mb-4 flex aspect-video items-center justify-center border border-slate-700 bg-slate-800 text-slate-500'>
                  {editingRepo.image_url ? (
                    <img
                      src={editingRepo.image_url || '/placeholder.svg'}
                      alt={editingRepo.title}
                      className='size-full object-cover'
                    />
                  ) : (
                    <span>No Preview Available</span>
                  )}
                </div>
                <div className='space-y-2'>
                  <div className='font-mono text-lg text-slate-200'>
                    {editingRepo.title}
                  </div>
                  <div className='text-sm text-slate-400'>
                    {editingRepo.description}
                  </div>
                </div>
              </CyberCardContent>
            </CyberCard>

            {/* Editor form */}
            <CyberCard className='lg:col-span-2'>
              <CyberCardContent>
                <div className='space-y-6'>
                  <div>
                    <label className='mb-2 block font-mono text-sm text-slate-400'>
                      PROJECT_TITLE
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={editingRepo.name}
                      onChange={handleInputChange}
                      className='w-full border border-slate-700 bg-slate-800 p-3 text-slate-200 outline-none transition-colors focus:border-purple-600'
                    />
                  </div>

                  <div>
                    <div className='mb-2 flex items-center justify-between'>
                      <label className='block font-mono text-sm text-slate-400'>
                        PROJECT_DESCRIPTION
                      </label>
                      <button
                        onClick={generateDescription}
                        disabled={isGeneratingDescription}
                        className='flex items-center text-xs text-purple-300 transition-colors hover:text-green-400'
                      >
                        {isGeneratingDescription ? (
                          <>
                            <RefreshCw
                              size={14}
                              className='mr-1 animate-spin'
                            />
                            <span>GENERATING...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles size={14} className='mr-1' />
                            <span>GENERATE_WITH_AI</span>
                          </>
                        )}
                      </button>
                    </div>
                    <textarea
                      name='description'
                      value={editingRepo.description ?? ''}
                      onChange={handleInputChange}
                      rows={4}
                      className='w-full border border-slate-700 bg-slate-800 p-3 text-slate-200 outline-none transition-colors focus:border-purple-600'
                    />
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='mb-2 block font-mono text-sm text-slate-400'>
                        TECH_STACK
                      </label>
                      <input
                        type='text'
                        name='language'
                        value={editingRepo.language}
                        onChange={handleInputChange}
                        className='w-full border border-slate-700 bg-slate-800 p-3 text-slate-200 outline-none transition-colors focus:border-purple-600'
                      />
                    </div>
                    <div>
                      <label className='mb-2 block font-mono text-sm text-slate-400'>
                        PROJECT_LEVEL
                      </label>
                      <input
                        type='text'
                        name='level'
                        defaultValue={
                          editingRepo.level ||
                          `LVL ${Math.floor(Math.random() * 30) + 70}`
                        }
                        className='w-full border border-slate-700 bg-slate-800 p-3 text-slate-200 outline-none transition-colors focus:border-purple-600'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='mb-2 block font-mono text-sm text-slate-400'>
                        PROJECT_STATUS
                      </label>
                      <select
                        name='status'
                        defaultValue={editingRepo.status || 'ONLINE'}
                        className='w-full border border-slate-700 bg-slate-800 p-3 text-slate-200 outline-none transition-colors focus:border-purple-600'
                      >
                        <option value='ONLINE'>ONLINE</option>
                        <option value='STABLE'>STABLE</option>
                        <option value='SECURE'>SECURE</option>
                        <option value='ACTIVE'>ACTIVE</option>
                        <option value='DEPLOYED'>DEPLOYED</option>
                      </select>
                    </div>
                    <div>
                      <label className='mb-2 block font-mono text-sm text-slate-400'>
                        GITHUB_URL
                      </label>
                      <input
                        type='text'
                        name='githubUrl'
                        defaultValue={`https://github.com/janedeveloper/${editingRepo.name}`}
                        className='w-full border border-slate-700 bg-slate-800 p-3 text-slate-200 outline-none transition-colors focus:border-purple-600'
                      />
                    </div>
                  </div>

                  <div className='flex justify-end gap-4'>
                    <Button variant='outline' onClick={onClose}>
                      CANCEL
                    </Button>
                    <Button
                      onClick={saveChanges}
                      variant='secondary'
                      isLoading={isSaving}
                      loadingText='SAVING...'
                      leftIcon={<Save size={16} />}
                    >
                      SAVE_CHANGES
                    </Button>
                  </div>
                </div>
              </CyberCardContent>
            </CyberCard>
          </div>
        </div>
      </div>

      {/* Add inline keyframe animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: translate(-50%, -50%) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
