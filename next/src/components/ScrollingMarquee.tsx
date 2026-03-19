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

  const chunk = `${text} \u00A9 `;
  // Repeat enough to fill any screen width twice (for seamless loop)
  const repeated = chunk.repeat(8);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="overflow-hidden py-12 md:py-16 -mt-12 md:-mt-16 lg:-mt-24 border-y border-white/10"
    >
      <div className="marquee-track whitespace-nowrap">
        <span className="marquee-content text-[clamp(5rem,15vw,16rem)] font-display font-bold tracking-tightest leading-none">
          {repeated}
        </span>
        <span className="marquee-content text-[clamp(5rem,15vw,16rem)] font-display font-bold tracking-tightest leading-none" aria-hidden>
          {repeated}
        </span>
      </div>

      <style jsx>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 240s linear infinite;
          will-change: transform;
        }
        .marquee-content {
          flex-shrink: 0;
        }
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </motion.div>
  );
}
