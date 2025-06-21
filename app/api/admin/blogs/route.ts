import { BlogInputSchema } from '@/lib/schemas/blog-schemas';
import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import { serverBlogService } from '@/lib/services/blog-service/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const options = {
      title: searchParams.get('title') || undefined,
      published: searchParams.get('published')
        ? Boolean(searchParams.get('published'))
        : null,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    };

    const { blogs, totalPages: totalPages } =
      await serverBlogService.getAllBlogs(options);

    const response = NextResponse.json(blogs, { status: 200 });
    response.headers.set('x-page', options.page.toString());
    response.headers.set('x-total-pages', totalPages.toString());

    return response;
  } catch (err) {
    console.error('Error fetching blogs:', err);

    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : 'Unexpected error occurred',
      },
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

    const data = await request.json();

    const parsedData = BlogInputSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Invalid input data', details: parsedData.error.errors },
        { status: 400 }
      );
    }

    const blog = await serverBlogService.createBlog(parsedData.data);

    return NextResponse.json(blog);
  } catch (err) {
    console.error('Error in /blogs route:', err);

    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : 'Unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
