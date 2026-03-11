"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedDivider({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`h-px bg-white/15 origin-left ${className || ""}`}
    />
  );
}
