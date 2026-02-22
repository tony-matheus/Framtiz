import BlogPosts from "@/components/home/blog-posts"
import ContactSection from "@/components/home/contact-info"
import ExperienceTimeline from "@/components/home/experience-timeline"
import HeroMotion from "@/components/home/experiments/hero-motion/hero-motion"
import FloatingNav from "@/components/home/floating-nav/floating-nav"
import Footer from "@/components/home/footer"
import { Profile } from "@/components/home/hero"
import PageTracker from "@/components/analytics/page-tracker"

import ScrollProgress from "@/components/home/scroll-progress"
import { serverAuthService } from "@/lib/services/auth/server-auth-service"
import { serverBlogService } from "@/lib/services/blog-service/server"
import { serverExperienceService } from "@/lib/services/experience-service"
import ReactQueryProvider from "@/lib/contexts/react-query-provider"

export default async function Home() {
  const { blogs } = await serverBlogService.getAllBlogs({
    limit: 4,
    published: true,
    type: "blog",
  })
  const { experiences } = await serverExperienceService.getAll()

  const user = await serverAuthService.getCurrentUser()

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <ReactQueryProvider>
        <PageTracker user={user ?? undefined} />
        <ScrollProgress />
        <FloatingNav />
        <HeroMotion
          profile={
            {
              id: 1,
              name: "Willian Frantz",
              description: `Anti-cheat Engineer`,
              github_url: user?.githubUsername
                ? `https://github.com/${user?.githubUsername}`
                : null,
            } as Profile
          }
        />
        <BlogPosts blogs={blogs} />
        <ExperienceTimeline experiences={experiences} />
        <ContactSection />
        <Footer />
      </ReactQueryProvider>
    </main>
  )
}
