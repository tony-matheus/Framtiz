'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { Save, Sparkles, RefreshCw, X } from 'lucide-react';
import { CyberButton } from '@/components/ui-custom/cyber-button';
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
        className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50'
        onClick={onClose}
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      />

      {/* Modal */}
      <div
        className={`fixed z-50 bg-slate-900 border-2 border-slate-800 w-[95%] max-w-4xl max-h-[90vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col ${className}`}
        style={{
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
          animation: 'scaleIn 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative elements */}
        <div className='absolute -top-1 -left-1 w-3 h-3 bg-purple-600'></div>
        <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-400'></div>
        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-transparent'></div>
        <div className='absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-green-400 to-transparent'></div>

        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900 z-10'>
          <h2 className='text-xl font-bold text-slate-200 font-mono flex items-center'>
            <div className='w-2 h-2 bg-green-400 mr-2 animate-pulse'></div>
            EDITING: {editingRepo.title.toUpperCase()}
          </h2>
          <CyberButton variant='outline' size='icon' onClick={onClose}>
            <X size={18} />
          </CyberButton>
        </div>

        {/* Content - scrollable area */}
        <div
          className='p-4 flex-1 overflow-y-auto'
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#8b5cf6 #1e293b' }}
        >
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Preview panel */}
            <CyberCard className='lg:col-span-1 h-fit'>
              <CyberCardContent>
                <h3 className='text-lg font-mono text-slate-200 mb-4 flex items-center'>
                  <div className='w-2 h-2 bg-purple-400 mr-2'></div>
                  PROJECT_PREVIEW
                </h3>
                <div className='aspect-video bg-slate-800 border border-slate-700 mb-4 flex items-center justify-center text-slate-500'>
                  {editingRepo.image_url ? (
                    <img
                      src={editingRepo.image_url || '/placeholder.svg'}
                      alt={editingRepo.title}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <span>No Preview Available</span>
                  )}
                </div>
                <div className='space-y-2'>
                  <div className='text-lg text-slate-200 font-mono'>
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
                    <label className='block text-slate-400 text-sm font-mono mb-2'>
                      PROJECT_TITLE
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={editingRepo.name}
                      onChange={handleInputChange}
                      className='w-full bg-slate-800 border border-slate-700 p-3 text-slate-200 focus:border-purple-600 outline-none transition-colors'
                    />
                  </div>

                  <div>
                    <div className='flex justify-between items-center mb-2'>
                      <label className='block text-slate-400 text-sm font-mono'>
                        PROJECT_DESCRIPTION
                      </label>
                      <button
                        onClick={generateDescription}
                        disabled={isGeneratingDescription}
                        className='flex items-center text-xs text-purple-300 hover:text-green-400 transition-colors'
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
                      value={editingRepo.description}
                      onChange={handleInputChange}
                      rows={4}
                      className='w-full bg-slate-800 border border-slate-700 p-3 text-slate-200 focus:border-purple-600 outline-none transition-colors'
                    />
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-slate-400 text-sm font-mono mb-2'>
                        TECH_STACK
                      </label>
                      <input
                        type='text'
                        name='language'
                        value={editingRepo.language}
                        onChange={handleInputChange}
                        className='w-full bg-slate-800 border border-slate-700 p-3 text-slate-200 focus:border-purple-600 outline-none transition-colors'
                      />
                    </div>
                    <div>
                      <label className='block text-slate-400 text-sm font-mono mb-2'>
                        PROJECT_LEVEL
                      </label>
                      <input
                        type='text'
                        name='level'
                        defaultValue={
                          editingRepo.level ||
                          `LVL ${Math.floor(Math.random() * 30) + 70}`
                        }
                        className='w-full bg-slate-800 border border-slate-700 p-3 text-slate-200 focus:border-purple-600 outline-none transition-colors'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-slate-400 text-sm font-mono mb-2'>
                        PROJECT_STATUS
                      </label>
                      <select
                        name='status'
                        defaultValue={editingRepo.status || 'ONLINE'}
                        className='w-full bg-slate-800 border border-slate-700 p-3 text-slate-200 focus:border-purple-600 outline-none transition-colors'
                      >
                        <option value='ONLINE'>ONLINE</option>
                        <option value='STABLE'>STABLE</option>
                        <option value='SECURE'>SECURE</option>
                        <option value='ACTIVE'>ACTIVE</option>
                        <option value='DEPLOYED'>DEPLOYED</option>
                      </select>
                    </div>
                    <div>
                      <label className='block text-slate-400 text-sm font-mono mb-2'>
                        GITHUB_URL
                      </label>
                      <input
                        type='text'
                        name='githubUrl'
                        defaultValue={`https://github.com/janedeveloper/${editingRepo.name}`}
                        className='w-full bg-slate-800 border border-slate-700 p-3 text-slate-200 focus:border-purple-600 outline-none transition-colors'
                      />
                    </div>
                  </div>

                  <div className='flex justify-end gap-4'>
                    <CyberButton variant='outline' onClick={onClose}>
                      CANCEL
                    </CyberButton>
                    <CyberButton
                      onClick={saveChanges}
                      variant='secondary'
                      isLoading={isSaving}
                      loadingText='SAVING...'
                      leftIcon={<Save size={16} />}
                    >
                      SAVE_CHANGES
                    </CyberButton>
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
