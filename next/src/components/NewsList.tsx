"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnimateOnScroll from "./AnimateOnScroll";
import { formatMonthYear, CATEGORY_LABELS } from "@/lib/date";

export interface NewsListItem {
  slug: string;
  title?: string | null;
  date?: string | null;
  category?: string | null;
  location?: string | null;
  description?: string | null;
  link?: string | null;
}

const FILTER_ORDER: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "talk", label: "Invited Talks" },
  { value: "event", label: "Events" },
  { value: "press", label: "Press" },
];

export default function NewsList({ news }: { news: NewsListItem[] }) {
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState("all");

  // Only offer filters for categories that actually have items.
  const filters = useMemo(() => {
    const present = new Set(news.map((n) => n.category ?? "talk"));
    return FILTER_ORDER.filter((f) => f.value === "all" || present.has(f.value));
  }, [news]);

  const filtered = useMemo(
    () =>
      active === "all"
        ? news
        : news.filter((n) => (n.category ?? "talk") === active),
    [news, active]
  );

  if (news.length === 0) {
    return (
      <section className="py-16 md:py-24 px-8 md:px-16 lg:px-16">
        <div className="text-center py-20 md:py-32">
          <p className="text-4xl md:text-5xl font-display font-bold tracking-tightest text-white/20">
            No news yet
          </p>
          <p className="text-secondary mt-4 text-lg">Check back soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 md:px-16 lg:px-16 pb-24">
      {filters.length > 2 && (
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-4 py-2 rounded-full border text-sm transition-colors duration-300 ${
                active === f.value
                  ? "bg-accent border-accent text-black"
                  : "border-white/15 text-white hover:border-accent hover:text-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col">
        {filtered.map((item, i) => (
          <AnimateOnScroll key={item.slug} delay={i * 0.06}>
            <motion.div
              whileHover={
                shouldReduceMotion
                  ? {}
                  : { backgroundColor: "rgba(255,255,255,0.05)" }
              }
              initial={{ backgroundColor: "rgba(255,255,255,0)" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-2 md:gap-8 py-6 px-4 -mx-4 rounded-lg border-b border-white/10 last:border-b-0"
            >
              <time className="text-sm text-accent font-mono pt-1 shrink-0 tabular-nums">
                {formatMonthYear(item.date)}
              </time>
              <div className="min-w-0">
                <span className="inline-block text-xs uppercase tracking-wider text-accent border border-accent/40 rounded-full px-2.5 py-0.5 mb-2">
                  {CATEGORY_LABELS[item.category ?? "talk"] ?? "News"}
                </span>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg md:text-xl font-display tracking-tight text-white hover:text-accent transition-colors"
                  >
                    {item.title}
                  </a>
                ) : (
                  <p className="text-lg md:text-xl font-display tracking-tight text-white">
                    {item.title}
                  </p>
                )}
                {item.location && (
                  <p className="text-sm text-secondary mt-1">{item.location}</p>
                )}
                {item.description && (
                  <p className="text-sm text-secondary/70 mt-2 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
