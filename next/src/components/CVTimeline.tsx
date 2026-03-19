"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export interface CVTimelineEntry {
  title: string;
  institution: string;
  year: string;
  description: string;
}

export default function CVTimeline({ entries }: { entries: CVTimelineEntry[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col">
      {entries.map((entry, i) => (
        <AnimateOnScroll key={`${entry.year}-${entry.title}`} delay={i * 0.08}>
          <motion.div
            whileHover={
              shouldReduceMotion
                ? {}
                : { backgroundColor: "rgba(255,255,255,0.05)", scale: 1.01 }
            }
            initial={{ backgroundColor: "rgba(255,255,255,0)", scale: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid grid-cols-[6rem_1fr] md:grid-cols-[10rem_1fr] gap-4 md:gap-8 py-5 px-4 -mx-4 rounded-lg border-b border-white/10 last:border-b-0"
          >
            <span className="text-sm text-secondary font-mono pt-0.5 shrink-0">
              {entry.year}
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-white">
                {entry.title}
              </h3>
              <p className="text-sm text-secondary mt-0.5">{entry.institution}</p>
              {entry.description && (
                <p className="text-sm text-secondary/70 mt-2 leading-relaxed">
                  {entry.description}
                </p>
              )}
            </div>
          </motion.div>
        </AnimateOnScroll>
      ))}
    </div>
  );
}
