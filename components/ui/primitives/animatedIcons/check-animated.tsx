"use client"

import type { Variants } from "framer-motion"
import { motion, useAnimation } from "framer-motion"
import type { HTMLAttributes } from "react"
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react"

import { cn } from "@/lib/utils"

export interface CheckAnimatedHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

interface CheckAnimatedProps extends HTMLAttributes<HTMLDivElement> {
  size?: number
  animateOnHover?: boolean
  animateOnEnter?: boolean
}

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    scale: [0.5, 1],
    transition: {
      duration: 0.2,
      opacity: { duration: 0.1 },
      ease: "easeOut",
    },
  },
}

const CheckAnimated = forwardRef<CheckAnimatedHandle, CheckAnimatedProps>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      animateOnHover = false,
      animateOnEnter = false,
      size = 28,
      ...props
    },
    ref,
  ) => {
    const controls = useAnimation()
    const isControlledRef = useRef(false)

    useImperativeHandle(ref, () => {
      isControlledRef.current = true

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      }
    })

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e)
        } else if (animateOnHover) {
          controls.start("animate")
        }
      },
      [controls, onMouseEnter, animateOnHover],
    )

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e)
        } else if (animateOnHover) {
          controls.start("normal")
        }
      },
      [controls, onMouseLeave, animateOnHover],
    )

    useEffect(() => {
      if (animateOnEnter) {
        controls.start("animate")
      }
    }, [animateOnEnter, controls])

    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
          className={cn(className)}
        >
          <motion.path
            animate={controls}
            d="M4 12 9 17L20 6"
            initial="normal"
            variants={PATH_VARIANTS}
          />
        </svg>
      </div>
    )
  },
)

CheckAnimated.displayName = "CheckAnimated"

export { CheckAnimated }
