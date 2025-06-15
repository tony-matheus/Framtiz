import { serverBlogService } from '@/lib/services/blog-service/server';
import BlogPost from '@/components/blog/blog-post';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const blogId = Number(params.slug);

  if (isNaN(blogId)) {
    notFound();
  }

  try {
    const blog = await serverBlogService.getBlog(blogId);
    return <BlogPost blog={blog} />;
  } catch {
    notFound();
  }
}
