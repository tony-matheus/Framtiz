"use client"

import AboutHeader from "@/components/about/about-header"
import ProfilePic from "@/components/home/experiments/hero-motion/profile-pic"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"

export default function AboutPage() {
  // Mouse position tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animations
  const springConfig = { damping: 25, stiffness: 150 }

  // Profile pic transforms (foreground)
  const x = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-20, 20]),
    springConfig,
  )
  const y = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-20, 20]),
    springConfig,
  )
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    springConfig,
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    springConfig,
  )

  // Background image transforms (slower for depth effect)
  const bgX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-30, 30]),
    springConfig,
  )
  const bgY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-30, 30]),
    springConfig,
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate normalized position (-0.5 to 0.5)
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    // Lock layout to viewport; prevent page scroll
    <div
      className="container relative mx-auto flex h-screen flex-col overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Parallax background image */}
      <motion.div
        className="pointer-events-none absolute left-[-190px] top-0 hidden h-full w-auto lg:block"
        style={{
          x: bgX,
          y: bgY,
        }}
      >
        <Image
          src="/will-palestrante-transparent.png"
          alt=""
          width={800}
          height={1000}
          className="h-full w-auto object-contain"
          priority
        />
      </motion.div>

      {/* Make sure header doesn't collapse or grow oddly */}
      <div className="relative z-10 shrink-0">
        <AboutHeader />
      </div>

      {/* Main content area can shrink so inner columns can scroll */}
      <div className="relative z-10 block min-h-0 flex-1 gap-4 lg:flex">
        {/* Left side */}
        <div className="hidden min-h-0 flex-1 lg:block" />

        {/* Right side - ONLY scrollable area */}
        <div className="min-h-0 flex-1">
          <div className="flex justify-center lg:hidden">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                x,
                y,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
            >
              <ProfilePic size="lg" />
            </motion.div>
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
