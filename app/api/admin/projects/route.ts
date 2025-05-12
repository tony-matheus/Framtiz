import { createServerSupabaseClient } from '@/lib/supabase/server';
import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import { NextResponse } from 'next/server';
import type { ProjectInput } from '@/lib/services/project-service';

export async function GET() {
  try {
    // Check if user is admin
    const isAdmin = await serverAuthService.isAdmin();

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check if user is admin
    const isAdmin = await serverAuthService.isAdmin();

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projectData: ProjectInput = await request.json();

    // Validate required fields
    if (
      !projectData.title ||
      !projectData.slug ||
      !projectData.description ||
      !projectData.github_url
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // Check if slug is unique
    const { data: existingProject } = await supabase
      .from('projects')
      .select('id')
      .eq('slug', projectData.slug)
      .single();

    if (existingProject) {
      return NextResponse.json(
        { error: 'Slug must be unique' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
