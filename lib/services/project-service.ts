import { createServerSupabaseClient } from '../supabase/server';
import { getSupabaseClient } from '../supabase/client';

export type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  live_url?: string;
  image_url: string;
  level: string;
  status: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectInput = Omit<Project, 'id' | 'created_at' | 'updated_at'>;

// Server-side functions
export const serverProjectService = {
  async getAllProjects(): Promise<Project[]> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data as Project[];
  },

  async getFeaturedProjects(): Promise<Project[]> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching featured projects:', error);
      return [];
    }

    return data as Project[];
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching project with slug ${slug}:`, error);
      return null;
    }

    return data as Project;
  },
};

// Client-side functions
export const clientProjectService = {
  async createProject(project: ProjectInput): Promise<Project | null> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return null;
    }

    return data as Project;
  },

  async updateProject(
    id: number,
    project: Partial<ProjectInput>
  ): Promise<Project | null> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('projects')
      .update({
        ...project,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`Error updating project with id ${id}:`, error);
      return null;
    }

    return data as Project;
  },

  async deleteProject(id: number): Promise<boolean> {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
      console.error(`Error deleting project with id ${id}:`, error);
      return false;
    }

    return true;
  },

  async getAllProjects(): Promise<Project[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data as Project[];
  },
};
