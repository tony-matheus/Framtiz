import { MetadataRoute } from 'next';
import { serverBlogService } from '@/lib/services/blog-service/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rubyeex.dev';
  const currentDate = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  try {
    // Fetch published blog posts
    const { blogs } = await serverBlogService.getAllBlogs({
      published: true,
      limit: 100, // Adjust based on your needs
    });

    // Generate blog post URLs
    const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.id}`, // Assuming blog posts use ID as slug
      lastModified: blog.updated_at || blog.created_at || currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    return [...staticPages, ...blogPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static pages if blog fetching fails
    return staticPages;
  }
}
