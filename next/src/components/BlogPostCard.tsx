"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import AnimateOnScroll from "./AnimateOnScroll";

interface Props {
  title: string;
  slug: string;
  date: string;
  description?: string;
  tags?: string[];
  cover?: string | null;
  delay?: number;
}

export default function BlogPostCard({
  title,
  slug,
  date,
  description,
  tags,
  cover,
  delay = 0,
}: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimateOnScroll delay={delay}>
      <Link href={`/blog/${slug}`}>
        <motion.article
          whileHover={
            shouldReduceMotion
              ? {}
              : { scale: 1.02, opacity: 0.95 }
          }
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="group block rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20 transition-colors duration-300"
        >
          {cover && (
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <Image
                src={cover}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <div className="p-5 md:p-6">
            <time className="text-secondary text-xs uppercase tracking-wider">
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            <h3 className="text-white font-display font-bold text-lg md:text-xl tracking-tight mt-2 leading-snug">
              {title}
            </h3>

            {description && (
              <p className="text-secondary text-sm mt-2 line-clamp-3 leading-relaxed">
                {description}
              </p>
            )}

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.article>
      </Link>
    </AnimateOnScroll>
  );
}
