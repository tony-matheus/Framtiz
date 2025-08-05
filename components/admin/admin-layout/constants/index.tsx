import {
  ChartLineIcon,
  FileCode,
  Github,
  Newspaper,
  UserIcon,
  BarChart3,
} from 'lucide-react';

export const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'DASHBOARD',
    icon: <ChartLineIcon size={18} />,
    href: '/admin/dashboard',
  },
  {
    id: 'blog',
    label: 'BLOGS',
    icon: <Newspaper size={18} />,
    href: '/admin/blogs',
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    icon: <FileCode size={18} />,
    href: '/admin/projects',
  },
  {
    id: 'analytics',
    label: 'ANALYTICS',
    icon: <BarChart3 size={18} />,
    href: '/admin/analytics',
  },

  // hidden
  {
    id: 'profile',
    label: 'PROFILE',
    icon: <UserIcon size={18} />,
    href: '/admin/edit-profile/profile',
    removeFromSideBar: true,
  },
  {
    id: 'profile',
    label: 'GITHUB_REPOSITORY_SELECTOR',
    icon: <Github size={18} />,
    href: '/admin/project-select',
    removeFromSideBar: true,
  },
];
