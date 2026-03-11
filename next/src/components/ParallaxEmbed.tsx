"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";

export default function ParallaxEmbed({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.7]);

  return (
    <motion.div
      ref={ref}
      style={shouldReduceMotion ? {} : { y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
