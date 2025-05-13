import FloatingNav from '@/components/floating-nav/floating-nav';
import Hero, { Profile } from '@/components/hero';
import ProjectShowcase from '@/components/project-showcase';
import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import { serverProjectService } from '@/lib/services/project-service';
// import ProjectShowcase from '@/components/project-showcase';
// import FloatingNav from '@/components/floating-nav';

// import { serverAnalyticsService } from "@/lib/services/analytics-service"

export default async function Home() {
  const projects = await serverProjectService.getAllProjects();
  const user = await serverAuthService.getCurrentUser();

  // Track page view
  // await serverAnalyticsService.trackPageView("/", new Request("https://example.com"))
  return (
    <main className='min-h-screen bg-slate-950 text-slate-50'>
      <Hero
        profile={
          {
            id: 1,
            name: user?.username ?? 'William Frantz',
            description: 'Senior Anti-cheat engineer at Riot Games',
            github_url: 'https://github.com/WLSF',
          } as Profile
        }
      />
      <ProjectShowcase projects={projects} />
      <FloatingNav />
    </main>
  );
}
