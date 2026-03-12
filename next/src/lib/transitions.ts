import type { Transition } from "framer-motion";

export const transitions = {
  spring: { type: "spring", stiffness: 300, damping: 24 } as Transition,
} as const;

export const variants = {
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  },
} as const;
