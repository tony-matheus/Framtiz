import { createServerSupabaseClient } from '@/lib/supabase/server';
import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import { NextResponse } from 'next/server';
import { ProjectInputSchema } from '@/lib/schemas/project-schemas';
import { serverProjectService } from '@/lib/services/project-service';

export async function GET(request: Request) {
  try {
    const isAdmin = await serverAuthService.isAdmin();

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);

    const options = {
      title: searchParams.get('title') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    };

    const { projects, totalPages } = await serverProjectService.getAllProjects(
      options
    );

    const response = NextResponse.json(projects, { status: 200 });
    response.headers.set('x-page', options.page.toString());
    response.headers.set('x-total-pages', totalPages.toString());

    return response;
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
    const isAdmin = await serverAuthService.isAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projectData = await request.json();
    const parsedData = ProjectInputSchema.safeParse(projectData);

    if (!parsedData.success) {
      const errorMessages = parsedData.error.errors
        .map((err) => err.message)
        .join(', ');
      return NextResponse.json(
        { error: `Validation failed: ${errorMessages}` },
        { status: 400 }
      );
    }

    const { title, slug, github_url } = parsedData.data;

    const supabase = await createServerSupabaseClient();

    // Check if the slug is unique
    const { data: existingProject } = await supabase
      .from('projects')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingProject) {
      return NextResponse.json(
        { error: 'Slug must be unique' },
        { status: 400 }
      );
    }

    // Insert the new project data into the database
    const { data, error } = await supabase
      .from('projects')
      .insert({ title, slug, github_url })
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
