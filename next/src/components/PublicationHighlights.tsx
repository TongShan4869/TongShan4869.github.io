import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";
import AnimatedDivider from "./AnimatedDivider";
import type { Publication } from "@/lib/publications";

export default function PublicationHighlights({
  publications,
}: {
  publications: Publication[];
}) {
  if (publications.length === 0) return null;

  const items = publications.slice(0, 3);

  return (
    <section className="py-20 md:py-32 px-8 md:px-16 lg:px-24">
      <AnimateOnScroll>
        <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tightest mb-12">
          PUBLICATIONS
        </h2>
      </AnimateOnScroll>

      <div className="max-w-3xl">
        {items.map((pub, i) => (
          <div key={pub.key}>
            {i > 0 && <AnimatedDivider className="my-8" />}
            <AnimateOnScroll delay={i * 0.15}>
              <article>
                <h3 className="text-white font-display font-bold text-lg tracking-tight leading-snug">
                  {pub.title}
                </h3>
                <p className="text-secondary text-sm mt-2">
                  {pub.authors.join(", ")}
                </p>
                <p className="text-secondary text-sm mt-1">
                  {pub.journal}
                  {pub.journal && pub.year ? ", " : ""}
                  {pub.year > 0 ? pub.year : ""}
                </p>
                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent text-sm mt-2 inline-block hover:underline"
                  >
                    DOI: {pub.doi}
                  </a>
                )}
                {!pub.doi && pub.html && (
                  <a
                    href={pub.html}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent text-sm mt-2 inline-block hover:underline"
                  >
                    View Publication
                  </a>
                )}
              </article>
            </AnimateOnScroll>
          </div>
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
