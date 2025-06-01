import BlogPosts from '@/components/home/blog-posts';
import ExperienceTimeline from '@/components/home/experience-timeline';
import FeaturedProjects from '@/components/home/featured-projects';
import FloatingNav from '@/components/home/floating-nav/floating-nav';
import Footer from '@/components/home/footer';
import Hero, { Profile } from '@/components/home/hero';

import ScrollProgress from '@/components/home/scroll-progress';
import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import { serverProjectService } from '@/lib/services/project-service';
import { serverBlogService } from '@/lib/services/blog-service';

export default async function Home() {
  const { projects } = await serverProjectService.getAllProjects();
  const { blogs } = await serverBlogService.getAllBlogs();
  const user = await serverAuthService.getCurrentUser();

  return (
    <main className='min-h-screen bg-slate-950 text-slate-50'>
      <ScrollProgress />
      <FloatingNav />
      <Hero
        profile={
          {
            id: 1,
            name: user?.username ?? 'William Frantz',
            description: 'Senior Anti-cheat engineer at Riot Games',
            github_url: user?.githubUsername
              ? `https://github.com/${user?.githubUsername}`
              : null,
          } as Profile
        }
      />
      <FeaturedProjects projects={projects} />
      <BlogPosts blogs={blogs} />
      <ExperienceTimeline />
      <Footer />
    </main>
  );
}
