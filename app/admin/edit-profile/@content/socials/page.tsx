'use client';

import type React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, ExternalLink, Eye, EyeOff } from 'lucide-react';
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Twitch,
  MessageCircle,
  Dribbble,
  Figma,
  BookOpen,
  Code,
  HelpCircle,
} from 'lucide-react';
import { CyberCard, CyberCardContent } from '@/components/ui-custom/cyber-card';
import { Button } from '@/components/ui/button';
import { CyberFormField } from '@/components/ui-custom/cyber-form-field';
import { CyberStatusBadge } from '@/components/ui-custom/cyber-status-badge';

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  baseUrl: string;
  placeholder: string;
}

interface UserSocial {
  id: string;
  platformId: string;
  username: string;
  isActive: boolean;
}

const AVAILABLE_PLATFORMS: SocialPlatform[] = [
  {
    id: 'github',
    name: 'GitHub',
    icon: <Github size={20} />,
    baseUrl: 'https://github.com/',
    placeholder: 'username',
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: <Twitter size={20} />,
    baseUrl: 'https://twitter.com/',
    placeholder: 'username',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: <Linkedin size={20} />,
    baseUrl: 'https://linkedin.com/in/',
    placeholder: 'username',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: <Instagram size={20} />,
    baseUrl: 'https://instagram.com/',
    placeholder: 'username',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: <Youtube size={20} />,
    baseUrl: 'https://youtube.com/@',
    placeholder: 'channelname',
  },
  {
    id: 'twitch',
    name: 'Twitch',
    icon: <Twitch size={20} />,
    baseUrl: 'https://twitch.tv/',
    placeholder: 'username',
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: <MessageCircle size={20} />,
    baseUrl: 'https://discord.com/users/',
    placeholder: 'userid',
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    icon: <Dribbble size={20} />,
    baseUrl: 'https://dribbble.com/',
    placeholder: 'username',
  },
  {
    id: 'behance',
    name: 'Behance',
    icon: <Figma size={20} />,
    baseUrl: 'https://behance.net/',
    placeholder: 'username',
  },
  {
    id: 'medium',
    name: 'Medium',
    icon: <BookOpen size={20} />,
    baseUrl: 'https://medium.com/@',
    placeholder: 'username',
  },
  {
    id: 'devto',
    name: 'Dev.to',
    icon: <Code size={20} />,
    baseUrl: 'https://dev.to/',
    placeholder: 'username',
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    icon: <HelpCircle size={20} />,
    baseUrl: 'https://stackoverflow.com/users/',
    placeholder: 'userid',
  },
];

export default function SocialsTab() {
  const [userSocials, setUserSocials] = useState<UserSocial[]>([
    {
      id: '1',
      platformId: 'github',
      username: 'janedeveloper',
      isActive: true,
    },
    {
      id: '2',
      platformId: 'twitter',
      username: 'jane_developer',
      isActive: true,
    },
    {
      id: '3',
      platformId: 'linkedin',
      username: 'jane-developer',
      isActive: false,
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUsername, setEditUsername] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSocial, setNewSocial] = useState({ platformId: '', username: '' });

  const availablePlatforms = AVAILABLE_PLATFORMS.filter(
    (platform) =>
      !userSocials.some((social) => social.platformId === platform.id)
  );

  const getPlatform = (platformId: string) =>
    AVAILABLE_PLATFORMS.find((p) => p.id === platformId);

  const handleEdit = (social: UserSocial) => {
    setEditingId(social.id);
    setEditUsername(social.username);
  };

  const handleSaveEdit = (socialId: string) => {
    setUserSocials((prev) =>
      prev.map((social) =>
        social.id === socialId ? { ...social, username: editUsername } : social
      )
    );
    setEditingId(null);
    setEditUsername('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditUsername('');
  };

  const handleToggleActive = (socialId: string) => {
    setUserSocials((prev) =>
      prev.map((social) =>
        social.id === socialId
          ? { ...social, isActive: !social.isActive }
          : social
      )
    );
  };

  const handleDelete = (socialId: string) => {
    setUserSocials((prev) => prev.filter((social) => social.id !== socialId));
  };

  const handleAddSocial = () => {
    if (newSocial.platformId && newSocial.username) {
      const newId = Date.now().toString();
      setUserSocials((prev) => [
        ...prev,
        {
          id: newId,
          platformId: newSocial.platformId,
          username: newSocial.username,
          isActive: true,
        },
      ]);
      setNewSocial({ platformId: '', username: '' });
      setShowAddForm(false);
    }
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
            SOCIAL_NETWORKS
          </h3>
          <p className='mt-1 font-mono text-sm text-slate-400'>
            Manage your social media presence and professional networks.
          </p>
        </div>
        <Button
          variant='secondary'
          leftIcon={<Plus size={16} />}
          onClick={() => setShowAddForm(true)}
          disabled={availablePlatforms.length === 0}
        >
          ADD_SOCIAL
        </Button>
      </div>

      {/* Add Social Form */}
      {showAddForm && (
        <CyberCard>
          <CyberCardContent className='p-6'>
            <h4 className='mb-4 flex items-center font-mono text-sm text-slate-300'>
              <div className='mr-2 size-1 bg-green-400'></div>
              ADD_NEW_SOCIAL
            </h4>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <label className='mb-2 block font-mono text-xs text-slate-400'>
                  PLATFORM
                </label>
                <select
                  value={newSocial.platformId}
                  onChange={(e) =>
                    setNewSocial((prev) => ({
                      ...prev,
                      platformId: e.target.value,
                    }))
                  }
                  className='w-full border border-slate-700 bg-slate-900 p-3 font-mono text-sm text-slate-200 focus:border-purple-500 focus:outline-none'
                >
                  <option value=''>SELECT_PLATFORM</option>
                  {availablePlatforms.map((platform) => (
                    <option key={platform.id} value={platform.id}>
                      {platform.name}
                    </option>
                  ))}
                </select>
              </div>
              <CyberFormField
                label='USERNAME'
                name='username'
                value={newSocial.username}
                onChange={(e) =>
                  setNewSocial((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                placeholder={
                  getPlatform(newSocial.platformId)?.placeholder || 'username'
                }
              />
            </div>
            <div className='mt-4 flex gap-2'>
              <Button
                variant='secondary'
                onClick={handleAddSocial}
                disabled={!newSocial.platformId || !newSocial.username}
              >
                ADD_SOCIAL
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  setShowAddForm(false);
                  setNewSocial({ platformId: '', username: '' });
                }}
              >
                CANCEL
              </Button>
            </div>
          </CyberCardContent>
        </CyberCard>
      )}

      {/* Social Networks List */}
      <div className='grid gap-4'>
        {userSocials.length === 0 ? (
          <CyberCard>
            <CyberCardContent className='p-8 text-center'>
              <div className='font-mono text-slate-500'>
                NO_SOCIAL_NETWORKS_CONFIGURED
              </div>
              <p className='mt-2 text-sm text-slate-600'>
                Add your social media profiles to showcase your online presence.
              </p>
            </CyberCardContent>
          </CyberCard>
        ) : (
          userSocials.map((social) => {
            const platform = getPlatform(social.platformId);
            if (!platform) return null;

            const fullUrl = `${platform.baseUrl}${social.username}`;

            return (
              <CyberCard key={social.id}>
                <CyberCardContent className='p-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                      <div className='text-purple-400'>{platform.icon}</div>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2'>
                          <span className='font-mono text-slate-200'>
                            {platform.name}
                          </span>
                          <CyberStatusBadge
                            status={social.isActive ? 'online' : 'offline'}
                          >
                            {social.isActive ? 'ACTIVE' : 'INACTIVE'}
                          </CyberStatusBadge>
                        </div>
                        {editingId === social.id ? (
                          <div className='mt-2 flex items-center gap-2'>
                            <input
                              type='text'
                              value={editUsername}
                              onChange={(e) => setEditUsername(e.target.value)}
                              className='flex-1 border border-slate-700 bg-slate-900 p-2 font-mono text-sm text-slate-200 focus:border-purple-500 focus:outline-none'
                              placeholder={platform.placeholder}
                            />
                            <Button
                              size='sm'
                              onClick={() => handleSaveEdit(social.id)}
                            >
                              SAVE
                            </Button>
                            <Button
                              size='sm'
                              variant='outline'
                              onClick={handleCancelEdit}
                            >
                              CANCEL
                            </Button>
                          </div>
                        ) : (
                          <div className='mt-1 flex items-center gap-2'>
                            <span className='font-mono text-sm text-slate-400'>
                              {platform.baseUrl}
                            </span>
                            <span className='font-mono text-sm text-slate-300'>
                              {social.username}
                            </span>
                            <a
                              href={fullUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-purple-400 transition-colors hover:text-purple-300'
                            >
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleToggleActive(social.id)}
                        leftIcon={
                          social.isActive ? (
                            <EyeOff size={14} />
                          ) : (
                            <Eye size={14} />
                          )
                        }
                      >
                        {social.isActive ? 'HIDE' : 'SHOW'}
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleEdit(social)}
                        leftIcon={<Edit2 size={14} />}
                      >
                        EDIT
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleDelete(social.id)}
                        leftIcon={<Trash2 size={14} />}
                        className='border-red-800 text-red-400 hover:bg-red-900/20'
                      >
                        DELETE
                      </Button>
                    </div>
                  </div>
                </CyberCardContent>
              </CyberCard>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
