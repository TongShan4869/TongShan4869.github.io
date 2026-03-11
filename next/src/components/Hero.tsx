"use client";

import { motion, useReducedMotion } from "framer-motion";
import { transitions, variants } from "@/lib/transitions";
import MotionPill from "@/components/MotionPill";
import HeroWaveform from "@/components/HeroWaveform";

const PILLS = ["Researcher", "Engineer", "Creator"] as const;

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const animate = shouldReduceMotion
    ? {}
    : { opacity: 1, y: 0 };
  const initial = shouldReduceMotion
    ? {}
    : { opacity: 0, y: 30 };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Waveform background */}
      <div className="absolute inset-0 z-0">
        <HeroWaveform />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 text-center">
        {/* Name */}
        <motion.h1
          initial={initial}
          animate={animate}
          transition={shouldReduceMotion ? undefined : { ...transitions.spring, delay: 0 }}
          className="text-[clamp(3rem,8vw,7rem)] font-display font-bold tracking-tightest leading-[0.95] mb-6"
        >
          Tong Shan
        </motion.h1>

        {/* Tagline pills */}
        <motion.div
          initial={shouldReduceMotion ? {} : variants.staggerContainer.hidden}
          animate={shouldReduceMotion ? {} : variants.staggerContainer.visible}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          {PILLS.map((label, i) => (
            <motion.div
              key={label}
              initial={initial}
              animate={animate}
              transition={
                shouldReduceMotion
                  ? undefined
                  : { ...transitions.spring, delay: 0.1 + i * 0.1 }
              }
            >
              <MotionPill
                as="span"
                className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
              >
                {label}
              </MotionPill>
            </motion.div>
          ))}
        </motion.div>

        {/* One-liner */}
        <motion.p
          initial={initial}
          animate={animate}
          transition={shouldReduceMotion ? undefined : { ...transitions.spring, delay: 0.4 }}
          className="text-secondary text-base md:text-lg tracking-tight"
        >
          Auditory Neuroscience &middot; Hearing Science &middot; Music
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={shouldReduceMotion ? {} : { opacity: 1 }}
        transition={shouldReduceMotion ? undefined : { delay: 0.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.svg
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-secondary/60"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
