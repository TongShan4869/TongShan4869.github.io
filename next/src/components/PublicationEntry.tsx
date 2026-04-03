"use client";

import AnimateOnScroll from "./AnimateOnScroll";
import type { Publication } from "@/lib/publications";

interface Props {
  publication: Publication;
  delay?: number;
  hover?: boolean;
}

function highlightShan(authors: string[]) {
  return authors.map((author, i) => {
    const isShan = /\bShan\b/i.test(author);
    return (
      <span key={i}>
        {i > 0 && ", "}
        {isShan ? (
          <span className="text-accent font-medium">{author}</span>
        ) : (
          author
        )}
      </span>
    );
  });
}

export default function PublicationEntry({ publication: pub, delay = 0, hover = true }: Props) {
  const href = pub.doi ? `https://doi.org/${pub.doi}` : pub.html ?? pub.url ?? "#";

  if (!hover) {
    return (
      <AnimateOnScroll delay={delay}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-8 py-6 cursor-pointer"
          data-cursor="view"
        >
          <h3 className="text-white font-display font-bold text-lg md:text-xl tracking-tight leading-snug">
            {pub.title}
          </h3>
          <p className="text-white text-sm mt-1">
            {highlightShan(pub.authors)}
          </p>
          <p className="text-white/70 text-sm mt-1 italic">
            {pub.journal}
            {pub.journal && pub.year ? ", " : ""}
            {pub.year > 0 ? pub.year : ""}
          </p>
        </a>
      </AnimateOnScroll>
    );
  }

  return (
    <AnimateOnScroll delay={delay}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-white/5 hover:bg-white rounded-2xl px-8 py-6 cursor-pointer hover:scale-[1.02] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
        data-cursor="view"
      >
        <div className="flex items-start gap-6">
          <div className="flex-1 min-w-0">
            <h3 className="text-white group-hover:text-black font-display font-bold text-base md:text-lg tracking-tight leading-snug transition-colors duration-700">
              {pub.title}
            </h3>
            <p className="text-white/50 group-hover:text-black/50 text-sm mt-1 transition-colors duration-700">
              {highlightShan(pub.authors)}
            </p>
          </div>
          <div className="hidden md:block text-right flex-shrink-0 pt-1">
            <p className="text-white/50 group-hover:text-black/60 text-sm font-medium transition-colors duration-700">
              {pub.journal}
            </p>
            <p className="text-white/30 group-hover:text-black/40 text-sm transition-colors duration-700">
              {pub.year > 0 ? pub.year : ""}
            </p>
          </div>
        </div>
      </a>
    </AnimateOnScroll>
  );
}
