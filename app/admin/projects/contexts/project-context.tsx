'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useState,
} from 'react';

import { Project } from '@/lib/services/project-service';

type State = {
  projects: Project[];
  loading: boolean;
};

interface ProjectContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

type Action =
  | { type: 'SET_PROJECTS'; projects: Project[] }
  | { type: 'ADD_PROJECT'; project: Project }
  | { type: 'UPDATE_PROJECT'; project: Project }
  | { type: 'DELETE_PROJECT'; projectId: number };

const projectReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return { ...state, projects: action.projects };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.project] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.project.id ? action.project : project
        ),
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.projectId
        ),
      };
    default:
      return state;
  }
};

const ProjectContext = createContext<ProjectContextProps | undefined>(
  undefined
);

export const useProjectContext = (): ProjectContextProps => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('useProjectContext must be used within ProjectProvider');
  }
  return context;
};

export function ProjectProvider({
  children,
  initialProjects,
}: {
  children: ReactNode;
  initialProjects: Project[];
}) {
  const [queryClient] = useState(() => new QueryClient());

  const [state, dispatch] = useReducer(projectReducer, {
    projects: initialProjects,
    loading: false,
  });

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ProjectContext.Provider>
  );
}
