"use client";

import { motion, useScroll, useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[60]"
    />
  );
}
