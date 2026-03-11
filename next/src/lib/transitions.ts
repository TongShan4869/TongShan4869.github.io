import type { Transition } from "framer-motion";

export const transitions = {
  spring: { type: "spring", stiffness: 300, damping: 24 } as Transition,
  springBouncy: { type: "spring", stiffness: 500, damping: 15 } as Transition,
  springStiff: { type: "spring", stiffness: 700, damping: 30 } as Transition,
  smooth: { type: "tween", duration: 0.3, ease: "easeInOut" } as Transition,
  snappy: { type: "tween", duration: 0.15, ease: [0.25, 0.1, 0.25, 1] } as Transition,
} as const;

export const variants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  },
} as const;
