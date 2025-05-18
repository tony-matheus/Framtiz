'use client';

import { Blog } from '@/lib/services/blog-service';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useState,
} from 'react';

type State = {
  blogs: Blog[];
  loading: boolean;
  totalPages: number;
};

interface BlogContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

type Action =
  | { type: 'SET_BLOGS'; blogs: Blog[] }
  | { type: 'ADD_BLOG'; blog: Blog }
  | { type: 'UPDATE_BLOG'; blog: Blog }
  | { type: 'DELETE_BLOG'; blogId: number };

const blogReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_BLOGS':
      return { ...state, blogs: action.blogs };
    case 'ADD_BLOG':
      return { ...state, blogs: [...state.blogs, action.blog] };
    case 'UPDATE_BLOG':
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog.id === action.blog.id ? action.blog : blog
        ),
      };
    case 'DELETE_BLOG':
      return {
        ...state,
        blogs: state.blogs.filter((project) => project.id !== action.blogId),
      };
    default:
      return state;
  }
};

const BlogContext = createContext<BlogContextProps | undefined>(undefined);

export const useBlogContext = (): BlogContextProps => {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error('useBlogContext must be used within BlogProvider');
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
  initialblogs: Blog[];
  totalPages: number;
}

export function BlogProvider({
  children,
  initialblogs,
  totalPages,
}: BlogProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  const [state, dispatch] = useReducer(blogReducer, {
    blogs: initialblogs,
    loading: false,
    totalPages,
  });

  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </BlogContext.Provider>
  );
}
