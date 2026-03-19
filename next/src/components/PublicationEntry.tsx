"use client";

import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";
import type { Publication } from "@/lib/publications";

interface Props {
  publication: Publication;
  delay?: number;
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

export default function PublicationEntry({ publication: pub, delay = 0 }: Props) {
  return (
    <AnimateOnScroll delay={delay}>
      <article className="flex gap-5 py-5">
        {pub.preview && (
          <div className="hidden sm:block flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden border border-white/10">
            <Image
              src={pub.preview}
              alt={pub.title}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-display font-bold text-base md:text-lg tracking-tight leading-snug">
            {pub.title}
          </h3>

          <p className="text-secondary text-sm mt-1.5 leading-relaxed">
            {highlightShan(pub.authors)}
          </p>

          <p className="text-secondary text-sm mt-1 italic">
            {pub.journal}
            {pub.volume ? `, ${pub.volume}` : ""}
            {pub.pages ? `, ${pub.pages}` : ""}
            {pub.year > 0 ? ` (${pub.year})` : ""}
          </p>

          <div className="flex flex-wrap gap-2 mt-2.5">
            {pub.doi && (
              <a
                href={`https://doi.org/${pub.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
              >
                DOI
              </a>
            )}
            {(pub.url || pub.html) && (
              <a
                href={pub.url ?? pub.html}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-white/70 hover:bg-white/10 transition-colors"
              >
                PDF
              </a>
            )}
          </div>
        </div>
      </article>
    </AnimateOnScroll>
  );
}
