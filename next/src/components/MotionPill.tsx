"use client";

import { motion, useReducedMotion } from "framer-motion";
import { transitions } from "@/lib/transitions";
import { ReactNode } from "react";

interface MotionPillProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "span";
}

export default function MotionPill({ children, className, as = "div" }: MotionPillProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = as === "span" ? motion.span : motion.div;

  return (
    <Component
      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      transition={transitions.spring}
      className={className}
    >
      {children}
    </Component>
  );
}
