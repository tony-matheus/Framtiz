import FloatingNav from "@/components/home/floating-nav/floating-nav"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Willian Frantz - Game Developer & Anti",
  description:
    "Game developer by heart, systems programmer by nature, and Elixir specialist by trade. I design backends that scale, engines that perform, and occasionally break things just to understand how they work.",
  keywords: [
    "Willian Frantz",
    "Game Developer",
    "Anti-cheat engineer",
    "Elixir Developer",
    "Backend Developer",
    "Game Engine",
    "Riot Vanguard",
    "Anti-cheat",
    "Rendering Pipeline",
    "AI Behavior",
    "Console Reverse Engineering",
  ],
  authors: [{ name: "Willian Frantz" }],
  creator: "Willian Frantz",
  publisher: "Willian Frantz",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    title: "About Willian Frantz - Game Developer & Anti",
    description:
      "Game developer by heart, systems programmer by nature, and Elixir specialist by trade. I design backends that scale, engines that perform.",
    url: "/about",
    siteName: "Willian Frantz Portfolio",
    images: [
      {
        url: "/will-palestrante.jpg",
        width: 1200,
        height: 630,
        alt: "Willian Frantz - Game Developer & Anti",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Willian Frantz - Game Developer & Anti",
    description:
      "Game developer by heart, systems programmer by nature, and Elixir specialist by trade.",
    images: ["/will-palestrante.jpg"],
    creator: "@willianfrantz",
  },
  alternates: {
    canonical: "/about",
  },
  category: "technology",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen bg-slate-950 text-slate-50">
      {children}
      <FloatingNav />
    </div>
  )
}
