'use client';

import type React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  MapPin,
  Building,
  Briefcase,
} from 'lucide-react';
import { CyberButton } from '@/components/ui-custom/cyber-button';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { CyberFormField } from '@/components/ui-custom/cyber-form-field';
import { CyberStatusBadge } from '@/components/ui-custom/cyber-status-badge';
import ExperienceEmptyState from '@/components/admin/edit-profile/experiences/experience-empty-state';
import ExperienceCard from '@/components/admin/edit-profile/experiences/experience-card';
import ExperienceForm from '@/components/admin/edit-profile/experiences/experience-form';

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null; // null means current position
  description: string;
  employmentType:
    | 'full-time'
    | 'part-time'
    | 'contract'
    | 'internship'
    | 'freelance';
  isCurrentPosition: boolean;
}

const EMPLOYMENT_TYPES = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
  { value: 'freelance', label: 'Freelance' },
];

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      company: 'TechCorp Industries',
      position: 'Senior Full Stack Developer',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: null,
      description:
        'Leading development of scalable web applications using React, Next.js, and Node.js. Mentoring junior developers and architecting cloud-native solutions on AWS.',
      employmentType: 'full-time',
      isCurrentPosition: true,
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      location: 'Remote',
      startDate: '2020-06',
      endDate: '2022-02',
      description:
        'Developed responsive web applications using React and TypeScript. Collaborated with design team to implement pixel-perfect UI components and improved application performance by 40%.',
      employmentType: 'full-time',
      isCurrentPosition: false,
    },
    {
      id: '3',
      company: 'Freelance',
      position: 'Web Developer',
      location: 'Remote',
      startDate: '2019-01',
      endDate: '2020-05',
      description:
        'Built custom websites and web applications for various clients using modern web technologies. Managed full project lifecycle from requirements gathering to deployment.',
      employmentType: 'freelance',
      isCurrentPosition: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    employmentType: 'full-time',
    isCurrentPosition: false,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const calculateDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate + '-01');
    const end = endDate ? new Date(endDate + '-01') : new Date();

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${
        remainingMonths !== 1 ? 's' : ''
      }`;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'isCurrentPosition' && checked ? { endDate: '' } : {}),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      // Update existing experience
      setExperiences((prev) =>
        prev.map((exp) =>
          exp.id === editingId
            ? ({
                ...exp,
                ...formData,
                endDate: formData.isCurrentPosition
                  ? null
                  : formData.endDate || null,
              } as Experience)
            : exp
        )
      );
    } else {
      // Add new experience
      const newExperience: Experience = {
        id: Date.now().toString(),
        company: formData.company || '',
        position: formData.position || '',
        location: formData.location || '',
        startDate: formData.startDate || '',
        endDate: formData.isCurrentPosition ? null : formData.endDate || null,
        description: formData.description || '',
        employmentType: formData.employmentType || 'full-time',
        isCurrentPosition: formData.isCurrentPosition || false,
      };
      setExperiences((prev) => [newExperience, ...prev]);
    }

    // Reset form
    setFormData({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      employmentType: 'full-time',
      isCurrentPosition: false,
    });
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleEdit = (experience: Experience) => {
    setFormData(experience);
    setEditingId(experience.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleCancel = () => {
    setFormData({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      employmentType: 'full-time',
      isCurrentPosition: false,
    });
    setShowAddForm(false);
    setEditingId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='space-y-6'
    >
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center font-mono text-lg text-slate-200'>
            <div className='mr-2 size-2 bg-purple-400'></div>
            WORK_EXPERIENCE
          </h3>
          <p className='mt-1 font-mono text-sm text-slate-400'>
            Manage your professional work history and career progression.
          </p>
        </div>
        <CyberButton
          variant='secondary'
          leftIcon={<Plus size={16} />}
          onClick={() => setShowAddForm(true)}
        >
          ADD_EXPERIENCE
        </CyberButton>
      </div>

      {/* Add/Edit Experience Form */}
      {showAddForm && (
        <>
          <CyberCard>
            <CyberCardContent className='p-6'>
              <h4 className='mb-4 flex items-center font-mono text-sm text-slate-300'>
                <div className='mr-2 size-1 bg-green-400'></div>
                {editingId ? 'EDIT_EXPERIENCE' : 'ADD_NEW_EXPERIENCE'}
              </h4>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <CyberFormField
                    label='COMPANY'
                    name='company'
                    value={formData.company || ''}
                    onChange={handleInputChange}
                    required
                    icon={<Building size={16} className='text-slate-500' />}
                  />

                  <CyberFormField
                    label='POSITION'
                    name='position'
                    value={formData.position || ''}
                    onChange={handleInputChange}
                    required
                    icon={<Briefcase size={16} className='text-slate-500' />}
                  />

                  <CyberFormField
                    label='LOCATION'
                    name='location'
                    value={formData.location || ''}
                    onChange={handleInputChange}
                    required
                    icon={<MapPin size={16} className='text-slate-500' />}
                  />

                  <div>
                    <label className='mb-2 block font-mono text-xs text-slate-400'>
                      EMPLOYMENT_TYPE
                    </label>
                    <select
                      name='employmentType'
                      value={formData.employmentType || 'full-time'}
                      onChange={handleInputChange}
                      className='w-full border border-slate-700 bg-slate-900 p-3 font-mono text-sm text-slate-200 focus:border-purple-500 focus:outline-none'
                    >
                      {EMPLOYMENT_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <CyberFormField
                    label='START_DATE'
                    name='startDate'
                    type='month'
                    value={formData.startDate || ''}
                    onChange={handleInputChange}
                    required
                    icon={<Calendar size={16} className='text-slate-500' />}
                  />

                  <div>
                    <CyberFormField
                      label='END_DATE'
                      name='endDate'
                      type='month'
                      value={formData.endDate || ''}
                      onChange={handleInputChange}
                      disabled={formData.isCurrentPosition}
                      icon={<Calendar size={16} className='text-slate-500' />}
                    />
                    <div className='mt-2 flex items-center'>
                      <input
                        type='checkbox'
                        id='isCurrentPosition'
                        name='isCurrentPosition'
                        checked={formData.isCurrentPosition || false}
                        onChange={handleInputChange}
                        className='mr-2'
                      />
                      <label
                        htmlFor='isCurrentPosition'
                        className='font-mono text-xs text-slate-400'
                      >
                        CURRENT_POSITION
                      </label>
                    </div>
                  </div>
                </div>

                <CyberFormField
                  label='DESCRIPTION'
                  name='description'
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  required
                />

                <div className='flex gap-2'>
                  <CyberButton type='submit' variant='secondary'>
                    {editingId ? 'UPDATE_EXPERIENCE' : 'ADD_EXPERIENCE'}
                  </CyberButton>
                  <CyberButton
                    type='button'
                    variant='outline'
                    onClick={handleCancel}
                  >
                    CANCEL
                  </CyberButton>
                </div>
              </form>
            </CyberCardContent>
          </CyberCard>
          <ExperienceForm
            editingId={editingId}
            defaultValues={formData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </>
      )}

      {/* Experience List */}
      <div className='space-y-4'>
        {experiences.length === 0 ? (
          <ExperienceEmptyState />
        ) : (
          experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))
        )}
      </div>
    </motion.div>
  );
}
