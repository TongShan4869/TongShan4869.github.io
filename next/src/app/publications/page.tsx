import { Metadata } from "next";
import ScrollingMarquee from "@/components/ScrollingMarquee";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import PublicationEntry from "@/components/PublicationEntry";
import { getPublicationsByYear } from "@/lib/publications";

export const metadata: Metadata = {
  title: "Publications",
  description: "Academic publications and conference presentations by Tong Shan.",
};

const CONFERENCE_PRESENTATIONS = [
  "ARO Mid-Winter Meeting 2024",
  "ARO Mid-Winter Meeting 2023",
  "ARO Mid-Winter Meeting 2022",
  "ARO Mid-Winter Meeting 2021",
  "ARO Mid-Winter Meeting 2020",
  "ARO Mid-Winter Meeting 2019",
  "Auditory System Gordon Research Conference/Seminar 2022",
  "Organization for Human Brain Mapping Conference 2017",
];

export default function PublicationsPage() {
  const pubsByYear = getPublicationsByYear();
  const years = Array.from(pubsByYear.keys()).sort((a, b) => b - a);

  return (
    <main>
      <section className="pt-32 md:pt-40">
        <ScrollingMarquee text="PUBLICATIONS" />
      </section>

      <section className="py-16 md:py-24 px-8 md:px-16 lg:px-24 max-w-6xl mx-auto">
        {years.map((year) => {
          const pubs = pubsByYear.get(year)!;
          return (
            <AnimateOnScroll key={year} className="mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tightest text-white mb-4 border-b border-white/10 pb-3">
                {year}
              </h2>
              <div className="divide-y divide-white/5">
                {pubs.map((pub, i) => (
                  <PublicationEntry
                    key={pub.key}
                    publication={pub}
                    delay={i * 0.08}
                  />
                ))}
              </div>
            </AnimateOnScroll>
          );
        })}
      </section>

      <section className="py-16 md:py-24 px-8 md:px-16 lg:px-24 max-w-6xl mx-auto border-t border-white/10">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tightest text-white mb-8">
            Conference Presentations
          </h2>
          <ul className="space-y-3">
            {CONFERENCE_PRESENTATIONS.map((item, i) => (
              <li
                key={i}
                className="text-secondary text-base md:text-lg pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-2 before:h-2 before:rounded-full before:bg-accent/40"
              >
                {item}
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
      </section>
    </main>
  );
}
