import AboutHeader from "@/components/about/about-header"
import ProfilePic from "@/components/home/experiments/hero-motion/profile-pic"

export default function AboutPage() {
  return (
    // Lock layout to viewport; prevent page scroll
    <div
      className="container mx-auto flex h-screen flex-col overflow-hidden bg-none bg-contain bg-[-190px] bg-no-repeat lg:bg-[url(/will-palestrante-transparent.png)]
"
    >
      {/* Make sure header doesn’t collapse or grow oddly */}
      <div className="shrink-0">
        <AboutHeader />
      </div>

      {/* Main content area can shrink so inner columns can scroll */}
      <div className="block min-h-0 flex-1 gap-4 lg:flex">
        {/* Left side */}
        <div className="hidden min-h-0 flex-1 lg:block" />

        {/* Right side - ONLY scrollable area */}
        <div className="min-h-0 flex-1">
          <div className="flex justify-center lg:hidden">
            <ProfilePic size="lg" />
          </div>
          {/* Fill remaining height and scroll here */}
          <div className="h-full space-y-4 overflow-y-auto p-4">
            <p className="mx-auto max-w-[60ch] font-mono text-slate-200">
              Game developer by heart, systems programmer by nature, and Elixir
              specialist by trade. I design backends that scale, engines that
              perform, and occasionally break things just to understand how they
              work.
            </p>

            <p className="mx-auto max-w-[60ch] font-mono text-slate-200">
              From building anti-cheat pipelines for{" "}
              <strong>Riot&apos;s&nbsp;Vanguard</strong> to reverse-engineering
              old consoles for fun, I thrive at the intersection of curiosity
              and control. I&apos;m passionate about gameplay systems, rendering
              pipelines, AI behavior, and how every byte and tick shapes the
              player experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
