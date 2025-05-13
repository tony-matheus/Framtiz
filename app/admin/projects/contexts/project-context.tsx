// context/project-context.tsx
'use client';

import { Project } from '@/lib/services/project-service';
import { createContext, useContext } from 'react';

interface ProjectContextProps {
  projects: Project[];
  systemStatus: {
    security: string;
    connection: string;
    lastSync: string;
  };
}

const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined
);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within ProjectProvider');
  }
  return context;
};

export function ProjectProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ProjectContextProps;
}) {
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}
