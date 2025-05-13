'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, GitBranch, Clock, Plus, Check } from 'lucide-react';

// Mock GitHub repositories data
const mockRepos = [
  {
    id: 1,
    name: 'neural-net',
    full_name: 'janedeveloper/neural-net',
    description:
      'AI-powered content generation platform with advanced language models',
    language: 'TypeScript',
    stargazers_count: 124,
    forks_count: 18,
    updated_at: '2025-04-28T14:32:18Z',
  },
  {
    id: 2,
    name: 'crypto-vault',
    full_name: 'janedeveloper/crypto-vault',
    description: 'Secure blockchain wallet with multi-signature authentication',
    language: 'JavaScript',
    stargazers_count: 87,
    forks_count: 12,
    updated_at: '2025-05-02T09:15:42Z',
  },
  {
    id: 3,
    name: 'shadow-proxy',
    full_name: 'janedeveloper/shadow-proxy',
    description: 'Advanced VPN service with encrypted traffic routing',
    language: 'Rust',
    stargazers_count: 215,
    forks_count: 34,
    updated_at: '2025-05-08T16:47:23Z',
  },
  {
    id: 4,
    name: 'pulse-monitor',
    full_name: 'janedeveloper/pulse-monitor',
    description: 'Real-time system monitoring dashboard with predictive alerts',
    language: 'Vue',
    stargazers_count: 56,
    forks_count: 8,
    updated_at: '2025-04-15T11:22:05Z',
  },
  {
    id: 5,
    name: 'nexus-link',
    full_name: 'janedeveloper/nexus-link',
    description: 'IoT device management platform with mesh networking',
    language: 'React',
    stargazers_count: 142,
    forks_count: 21,
    updated_at: '2025-05-10T08:33:17Z',
  },
  {
    id: 6,
    name: 'quantum-forge',
    full_name: 'janedeveloper/quantum-forge',
    description: 'Cloud-based development environment with integrated CI/CD',
    language: 'TypeScript',
    stargazers_count: 98,
    forks_count: 14,
    updated_at: '2025-04-22T13:45:29Z',
  },
  {
    id: 7,
    name: 'data-nexus',
    full_name: 'janedeveloper/data-nexus',
    description: 'Big data processing pipeline with real-time analytics',
    language: 'Python',
    stargazers_count: 167,
    forks_count: 25,
    updated_at: '2025-05-07T10:12:38Z',
  },
  {
    id: 8,
    name: 'cyber-shield',
    full_name: 'janedeveloper/cyber-shield',
    description: 'Cybersecurity toolkit for threat detection and prevention',
    language: 'Go',
    stargazers_count: 203,
    forks_count: 31,
    updated_at: '2025-05-09T15:28:54Z',
  },
  {
    id: 9,
    name: 'cloud-matrix',
    full_name: 'janedeveloper/cloud-matrix',
    description: 'Multi-cloud management platform with cost optimization',
    language: 'TypeScript',
    stargazers_count: 76,
    forks_count: 11,
    updated_at: '2025-04-18T09:54:12Z',
  },
  {
    id: 10,
    name: 'neural-forge',
    full_name: 'janedeveloper/neural-forge',
    description: 'Machine learning model training and deployment platform',
    language: 'Python',
    stargazers_count: 189,
    forks_count: 27,
    updated_at: '2025-05-05T14:17:33Z',
  },
];

interface RepoSelectorProps {
  selectedRepos: any[];
  setSelectedRepos: (repos: any[]) => void;
}

export default function RepoSelector({
  selectedRepos,
  setSelectedRepos,
}: RepoSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [repos, setRepos] = useState(mockRepos);
  const [filteredRepos, setFilteredRepos] = useState(mockRepos);

  // Filter repos based on search term
  useEffect(() => {
    const filtered = repos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRepos(filtered);
  }, [searchTerm, repos]);

  // Toggle repo selection
  const toggleRepoSelection = (repo: any) => {
    if (selectedRepos.some((r) => r.id === repo.id)) {
      setSelectedRepos(selectedRepos.filter((r) => r.id !== repo.id));
    } else {
      if (selectedRepos.length < 8) {
        setSelectedRepos([...selectedRepos, repo]);
      }
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className='mb-8'>
      {/* Search and filters */}
      <div className='mb-4 flex flex-col md:flex-row gap-4'>
        <div className='relative flex-1'>
          <div className='absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r border-slate-700'>
            <Search size={16} className='text-slate-500' />
          </div>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full bg-slate-800 border border-slate-700 p-3 pl-12 text-slate-200 focus:border-purple-600 outline-none transition-colors'
            placeholder='Search repositories...'
          />
        </div>
        <div className='flex items-center text-sm text-slate-300'>
          <span className='font-mono mr-2'>SELECTED:</span>
          <span className='px-2 py-1 bg-purple-900/30 border border-purple-600 font-mono'>
            {selectedRepos.length}/8
          </span>
        </div>
      </div>

      {/* Repository list */}
      <div className='bg-slate-900 border border-slate-800'>
        <div className='grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 p-3 border-b border-slate-800 text-xs text-slate-400 font-mono'>
          <div>SELECT</div>
          <div>REPOSITORY</div>
          <div className='text-center'>STARS</div>
          <div className='text-center'>FORKS</div>
          <div>UPDATED</div>
        </div>

        {filteredRepos.length === 0 ? (
          <div className='p-6 text-center text-slate-400'>
            No repositories found matching your search criteria.
          </div>
        ) : (
          filteredRepos.map((repo) => {
            const isSelected = selectedRepos.some((r) => r.id === repo.id);
            const isDisabled = selectedRepos.length >= 8 && !isSelected;

            return (
              <motion.div
                key={repo.id}
                className={`grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 p-3 border-b border-slate-800 items-center ${
                  isSelected ? 'bg-purple-900/10' : ''
                } ${isDisabled ? 'opacity-50' : 'hover:bg-slate-800/50'}`}
                whileHover={{
                  backgroundColor: isDisabled ? '' : 'rgba(30, 41, 59, 0.5)',
                }}
              >
                <div>
                  <button
                    onClick={() => toggleRepoSelection(repo)}
                    disabled={isDisabled}
                    className={`w-8 h-8 flex items-center justify-center ${
                      isSelected
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:border-purple-600 border border-slate-700'
                    }`}
                  >
                    {isSelected ? <Check size={16} /> : <Plus size={16} />}
                  </button>
                </div>
                <div>
                  <div className='font-mono text-sm text-slate-200'>
                    {repo.name}
                  </div>
                  <div className='text-xs text-slate-400 mt-1'>
                    {repo.description}
                  </div>
                  <div
                    className='mt-2 inline-block px-2 py-0.5 bg-slate-800 text-xs'
                    style={{ color: getLanguageColor(repo.language) }}
                  >
                    {repo.language}
                  </div>
                </div>
                <div className='flex items-center justify-center text-slate-300'>
                  <Star size={14} className='mr-1 text-yellow-500' />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className='flex items-center justify-center text-slate-300'>
                  <GitBranch size={14} className='mr-1 text-purple-400' />
                  <span>{repo.forks_count}</span>
                </div>
                <div className='flex items-center text-slate-300 text-xs'>
                  <Clock size={14} className='mr-1 text-green-400' />
                  <span>{formatDate(repo.updated_at)}</span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}

// Helper function to get language color
function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f7df1e',
    Python: '#3572A5',
    Rust: '#dea584',
    Go: '#00ADD8',
    Vue: '#41b883',
    React: '#61dafb',
  };

  return colors[language] || '#8b5cf6';
}
