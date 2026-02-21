"use client"

import { useState, useEffect, Fragment, useLayoutEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Terminal, Newspaper } from "lucide-react"
import NavItem, { NavItemsProps } from "./nav-item"
import PowerStatus from "./power-status"
import { clientAuthService } from "@/lib/services/auth/client-auth-service"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { redirect, usePathname } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"

const LOGOUT_NAV_ITEMS = [
  {
    icon: <Home size={18} />,
    label: "HOME",
    href: "/",
    status: "ACTIVE",
  },
  {
    icon: <Newspaper size={18} />,
    label: "BLOG",
    href: "/blog",
    status: "ACTIVE",
  },
  {
    icon: <User size={18} />,
    label: "ABOUT",
    href: "/about",
    status: "ACTIVE",
  },
  // {
  //   icon: <Mail size={18} />,
  //   label: 'CONTACT',
  //   href: '/',
  //   status: 'INACTIVE',
  // },
] satisfies NavItemsProps[]

const LOGGED_IN_NAV_ITEMS = [
  {
    icon: <Home size={18} />,
    label: "ADMIN",
    href: "/admin",
    status: "ACTIVE",
  },
  {
    icon: <User size={18} />,
    label: "LOGOUT",
    href: "/auth/logout",
    status: "ACTIVE",
  },
] satisfies NavItemsProps[]

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [percentage, setPercentage] = useState(50)
  const [loggedIn, setLoggedIn] = useState(false)
  const isMobile = useIsMobile()
  const pathname = usePathname()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogout = async () => {
    const supabase = getSupabaseClient()
    await supabase?.auth.signOut()
    redirect("/")
  }

  useEffect(() => {
    const checkAdmin = async () => {
      const user = await clientAuthService.getCurrentUser()
      setLoggedIn(!!user)
      setIsAdmin(!!user?.isAdmin)
    }

    checkAdmin()
  }, [])

  useEffect(() => {
    setIsOpen(!isMobile)
  }, [isMobile])

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitchActive(true)
        setPercentage((prev) => (prev - 15 <= 0 ? 0 : prev - 15))
        setTimeout(() => setGlitchActive(false), 200)
      }
    }, 8000)
    return () => clearInterval(glitchInterval)
  }, [])

  useEffect(() => {
    if (percentage <= 0) {
      setPercentage(100)
    }
  }, [percentage])

  useLayoutEffect(() => {
    setIsOpen(true)
  }, [])

  const getPowerStatus = () => {
    if (percentage < 20) {
      return "low"
    } else if (percentage < 40) {
      return "medium"
    }
    return "high"
  }

  return (
    <div
      className="fixed bottom-6 right-4 top-auto z-50"
      style={{ position: "fixed" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
        style={{ position: "relative" }}
      >
        {/* Toggle Button */}
        <motion.button
          className={`size-14 border-2 bg-slate-900 ${
            glitchActive ? "border-red-500" : "border-purple-600"
          } relative z-10 flex items-center justify-center text-white`}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ borderColor: "#10b981" }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "relative" }}
          >
            <Terminal
              size={24}
              className={glitchActive ? "text-red-500" : "text-purple-400"}
            />
          </motion.div>
        </motion.button>

        {/* Nav Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 80, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: 80, x: 20, scale: 0.9 }}
              transition={{
                duration: 0.18,
                ease: "easeOut",
              }}
              className={cn(
                `absolute right-0 border-2 bg-slate-900 top-auto bottom-16 w-[calc(100vw-32px)] md:w-auto md:min-w-[280px] overflow-hidden`,
                glitchActive ? "border-red-500" : "border-purple-600",
              )}
            >
              {/* Header */}
              <div className="border-b border-slate-800 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 size-2 animate-pulse bg-green-400"></div>
                    <div className="font-mono text-xs text-green-400">
                      SYSTEM_TERMINAL
                    </div>
                  </div>
                  <div className="font-mono text-xs text-slate-500">v1.0.0</div>
                </div>
              </div>

              {/* Navigation */}
              <div className="p-2">
                {LOGOUT_NAV_ITEMS.map((item, index) => {
                  const selected =
                    pathname === item.href ||
                    (pathname.startsWith(item.href) && item.href !== "/")

                  return (
                    <Fragment key={index}>
                      {/* Don't show admin link if not admin */}
                      {(item.label !== "USER_PROFILE" || isAdmin) && (
                        <NavItem
                          className="mb-2"
                          {...item}
                          status={glitchActive ? "INACTIVE" : item.status}
                          selected={selected}
                        />
                      )}
                    </Fragment>
                  )
                })}

                {loggedIn && (
                  <>
                    {LOGGED_IN_NAV_ITEMS.map((item, index) => {
                      const selected =
                        pathname === item.href || pathname.startsWith(item.href)
                      return (
                        <Fragment key={index}>
                          {/* Don't show admin link if not admin */}
                          {(item.label !== "USER_PROFILE" || isAdmin) && (
                            <NavItem
                              className="mb-2"
                              {...item}
                              status={glitchActive ? "INACTIVE" : item.status}
                              selected={selected}
                            />
                          )}
                        </Fragment>
                      )
                    })}
                  </>
                )}
              </div>

              {/* Power status */}
              <PowerStatus percentage={percentage} status={getPowerStatus()} />

              {/* Decorative elements */}
              <div className="absolute -left-1 -top-1 size-3 bg-purple-600"></div>
              <div className="absolute -bottom-1 -right-1 size-3 bg-green-400"></div>

              {/* Grid overlay for hacking aesthetic */}
              <div className="pointer-events-none absolute inset-0 z-[-1] bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)]"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
