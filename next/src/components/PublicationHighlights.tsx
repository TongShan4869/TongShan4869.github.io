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

      <div className="space-y-4 relative z-10">
        {items.map((pub, i) => (
          <AnimateOnScroll key={pub.key} delay={i * 0.15}>
            <a
              href={pub.doi ? `https://doi.org/${pub.doi}` : pub.html ?? pub.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white/5 hover:bg-white rounded-2xl px-8 py-6 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer hover:scale-[1.02]"
            >
              <div className="flex items-start gap-6">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white group-hover:text-black font-display font-bold text-lg tracking-tight leading-snug transition-colors duration-700">
                    {pub.title}
                  </h3>
                  <p className="text-white/50 group-hover:text-black/50 text-sm mt-1 transition-colors duration-700">
                    {pub.authors.join(", ")}
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
