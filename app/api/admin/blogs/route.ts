import { BlogInputSchema } from '@/lib/schemas/blog-schemas';
import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import { serverBlogService } from '@/lib/services/blog-service';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const options = {
      title: searchParams.get('title') || undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
    };

    const { blogs, totalPages: totalPages } =
      await serverBlogService.getAllBlogs(options);

    // const simpleResponse = searchParams.get('simple_response') === 'true';

    // const result = simpleResponse
    //   ? blogs.map(({ content, ...rest }) => rest) // remove `content` field
    //   : blogs;

    const response = NextResponse.json(blogs, { status: 200 });
    response.headers.set('x-page', options.page.toString());
    response.headers.set('x-total-pages', totalPages.toString());

    return response;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: error || 'Internal server error' },
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
  } catch (error) {
    return NextResponse.json(
      { error: error ?? 'Internal server error' },
      { status: 500 }
    );
  }
}
