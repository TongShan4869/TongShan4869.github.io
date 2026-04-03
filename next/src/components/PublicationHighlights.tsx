import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";
import AnimatedDivider from "./AnimatedDivider";
import SectionHeading from "./SectionHeading";
import type { Publication } from "@/lib/publications";

export default function PublicationHighlights({
  publications,
}: {
  publications: Publication[];
}) {
  if (publications.length === 0) return null;

  const items = publications.slice(0, 4);

  return (
    <section className="py-20 md:py-32 px-8 md:px-16 lg:px-24">
      <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tightest mb-12" style={{ color: "#ffffff" }}>
        PUBLICATIONS
      </h2>

      <div className="relative z-10">
        {items.map((pub, i) => (
          <AnimateOnScroll key={pub.key} delay={i * 0.15}>
            <a
              href={pub.doi ? `https://doi.org/${pub.doi}` : pub.html ?? pub.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center bg-transparent hover:bg-white rounded-xl px-6 min-h-[120px] transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer hover:scale-[1.01]"
              data-cursor="view"
            >
              <div className="flex items-center justify-between gap-6 w-full">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white group-hover:text-black font-display font-bold text-lg md:text-xl tracking-tight leading-snug transition-colors duration-1000">
                    {pub.title}
                  </h3>
                  <p className="text-base mt-1 transition-colors duration-1000">
                    {pub.authors.map((author, j) => (
                      <span key={j}>
                        {j > 0 && ", "}
                        <span className={/\bShan\b/i.test(author) ? "text-accent group-hover:text-black font-medium" : "text-white group-hover:text-black/50"}>
                          {author}
                        </span>
                      </span>
                    ))}
                  </p>
                </div>
                <div className="hidden md:block text-right flex-shrink-0 ml-auto">
                  <p className="text-white/50 group-hover:text-black/60 text-base font-medium transition-colors duration-1000">
                    {pub.journal}
                  </p>
                  <p className="text-white/30 group-hover:text-black/40 text-base transition-colors duration-1000">
                    {pub.year > 0 ? pub.year : ""}
                  </p>
                </div>
              </div>
            </a>
          </AnimateOnScroll>
        ))}
      </div>

      <AnimateOnScroll delay={0.3} className="mt-12">
        <Link
          href="/publications"
          className="inline-block border border-white/30 text-white text-base font-bold px-10 py-3.5 rounded-full hover:bg-accent hover:border-accent hover:text-black transition-all duration-300"
        >
          View All Publications &rarr;
        </Link>
      </AnimateOnScroll>
    </section>
  );
}
