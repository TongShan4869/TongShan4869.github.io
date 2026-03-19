"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollingMarquee({ text = "Featured Music Works" }: { text?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scroll-driven fade + slide up for the reveal
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [80, 0]);

  const chunk = `${text} \u00B7 `;
  // Repeat enough to fill any screen width twice (for seamless loop)
  const repeated = chunk.repeat(8);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="overflow-hidden py-12 md:py-16 -mt-12 md:-mt-16 lg:-mt-24 border-y border-white/10"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap">
        <span className="flex-shrink-0 text-[clamp(5rem,15vw,16rem)] font-display font-bold tracking-tightest leading-none">
          {repeated}
        </span>
        <span className="flex-shrink-0 text-[clamp(5rem,15vw,16rem)] font-display font-bold tracking-tightest leading-none" aria-hidden>
          {repeated}
        </span>
      </div>
    </motion.div>
  );
}
