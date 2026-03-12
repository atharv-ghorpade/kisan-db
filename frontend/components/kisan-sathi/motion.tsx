"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { forwardRef, ReactNode } from "react"

// Reusable animation variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

// Card hover animation for scheme cards, stat cards, etc.
export const cardHover = {
  rest: {
    scale: 1,
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
  tap: {
    scale: 0.98,
  },
}

// Button hover animation
export const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    },
  },
  tap: {
    scale: 0.97,
  },
}

// Stagger children animation
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
}

// Progress bar animation
export const progressBar = (width: number) => ({
  initial: { width: 0 },
  animate: {
    width: `${width}%`,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
})

// Count up animation hook
export const countUp = (target: number) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
})

// Badge pulse animation
export const badgePulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

// Tab underline animation
export const tabUnderline = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
}

// Upload area pulse
export const uploadPulse = {
  rest: { scale: 1, borderColor: "#E5E7EB" },
  hover: {
    scale: 1.01,
    borderColor: "#2E7D32",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  drag: {
    scale: 1.02,
    borderColor: "#2E7D32",
    backgroundColor: "rgba(46, 125, 50, 0.05)",
  },
}

// Success checkmark animation
export const successCheck = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.5, ease: "easeInOut" },
      opacity: { duration: 0.2 },
    },
  },
}

// Modal animation
export const modalOverlay = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const modalContent = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.15,
    },
  },
}

// Motion Card Component
interface MotionCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
}

export const MotionCard = forwardRef<HTMLDivElement, MotionCardProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={cardHover}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
MotionCard.displayName = "MotionCard"

// Motion Button Component
interface MotionButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode
  className?: string
}

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={buttonHover}
        className={className}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)
MotionButton.displayName = "MotionButton"

// Animated number component
interface AnimatedNumberProps {
  value: number
  className?: string
  prefix?: string
  suffix?: string
}

export function AnimatedNumber({ value, className = "", prefix = "", suffix = "" }: AnimatedNumberProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {prefix}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {value}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {suffix}
      </motion.span>
    </motion.span>
  )
}

// Export motion for direct use
export { motion }
