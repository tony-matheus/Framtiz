import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui-custom/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: 'Willian "rubyeex" Frantz | Anti-Cheat Engineer, Portfolio & Blog',
  description:
    "Explore Willian Frantz's portfolio, CV, and blog. Anti-Cheat Engineer passionate about software security, reverse engineering, and scalable systems.",
  keywords:
    "Willian Frantz, rubyeex, Anti-Cheat Engineer, Software Engineer, Portfolio, Blog, Reverse Engineering, Security",
  creator: "Willian Frantz",
  metadataBase: new URL("https://rubyeex.dev"),

  openGraph: {
    title: 'Willian "rubyeex" Frantz | Anti-Cheat Engineer, Portfolio & Blog',
    description:
      "Explore Willian Frantz's portfolio, CV, and blog. Anti-Cheat Engineer passionate about software security, reverse engineering, and scalable systems.",
    url: "https://rubyeex.dev",
    siteName: "rubyeex.dev",
    images: [
      {
        url: "https://rubyeex.dev/will.jpg",
        width: 1200,
        height: 630,
        alt: "Willian Frantz Profile Picture",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@frantz_willian",
    creator: "@frantz_willian",
    title: 'Willian "rubyeex" Frantz | Anti-Cheat Engineer, Portfolio & Blog',
    description:
      "Explore Willian Frantz's portfolio, CV, and blog. Anti-Cheat Engineer passionate about software security, reverse engineering, and scalable systems.",
    images: ["https://rubyeex.dev/will.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
