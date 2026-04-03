"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

export default function SectionHeading({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.h2
      ref={ref}
      style={{ opacity, y, color: "#ffffff" }}
      className="text-5xl md:text-7xl font-display font-bold tracking-tightest mb-12"
    >
      {children}
    </motion.h2>
  );
}
