import { getCV, getSiteSettings } from "@/lib/content";
import CVTimeline from "@/components/CVTimeline";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AnimatedDivider from "@/components/AnimatedDivider";
import MotionPill from "@/components/MotionPill";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
};

export default async function CVPage() {
  const [cv, site] = await Promise.all([getCV(), getSiteSettings()]);

  const education =
    cv?.education?.map((e) => ({
      title: e.degree,
      institution: e.institution,
      year: e.year,
      description: e.description,
    })) ?? [];

  const experience =
    cv?.experience?.map((e) => ({
      title: e.title,
      institution: e.institution,
      year: e.year,
      description: e.description,
    })) ?? [];

  const awards = cv?.awards ?? [];
  const skills = cv?.skills ?? [];
  const memberships = cv?.memberships ?? [];
  const cvPdfPath = site?.cvPdfPath ?? "/files/cv.pdf";

  return (
    <main className="pt-32 pb-24">
      {/* Page Heading + PDF Download */}
      <section className="px-8 md:px-16 lg:px-16 mb-8">
        <h1 className="text-7xl md:text-9xl font-display font-bold tracking-tightest mb-8" style={{ color: "#ffffff" }}>
          CV
        </h1>
        <AnimateOnScroll>
          <a
            href={cvPdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm border border-white/20 px-5 py-2.5 rounded-full hover:bg-accent hover:border-accent hover:text-black transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>
        </AnimateOnScroll>
      </section>

      {/* Education */}
      <section className="px-8 md:px-16 lg:px-16 py-16">
        <AnimateOnScroll><h2 className="text-3xl md:text-5xl font-display font-bold tracking-tightest mb-8" style={{ color: "#ffffff" }}>EDUCATION</h2></AnimateOnScroll>
        <CVTimeline entries={education} />
      </section>

      <AnimatedDivider className="mx-8 md:mx-16 lg:mx-16" />

      {/* Experience */}
      <section className="px-8 md:px-16 lg:px-16 py-16">
        <AnimateOnScroll><h2 className="text-3xl md:text-5xl font-display font-bold tracking-tightest mb-8" style={{ color: "#ffffff" }}>EXPERIENCE</h2></AnimateOnScroll>
        <CVTimeline entries={experience} />
      </section>

      <AnimatedDivider className="mx-8 md:mx-16 lg:mx-16" />

      {/* Awards */}
      <section className="px-8 md:px-16 lg:px-16 py-16">
        <AnimateOnScroll><h2 className="text-3xl md:text-5xl font-display font-bold tracking-tightest mb-8" style={{ color: "#ffffff" }}>AWARDS</h2></AnimateOnScroll>
        <div className="flex flex-col">
          {awards.map((award, i) => (
            <AnimateOnScroll key={`${award.year}-${award.title}`} delay={i * 0.08}>
              <div className="grid grid-cols-[6rem_1fr] md:grid-cols-[10rem_1fr] gap-4 md:gap-8 py-4 border-b border-white/10 last:border-b-0">
                <span className="text-sm text-secondary font-mono">
                  {award.year}
                </span>
                <p className="text-base text-white">{award.title}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <AnimatedDivider className="mx-8 md:mx-16 lg:mx-16" />

      {/* Skills */}
      <section className="px-8 md:px-16 lg:px-16 py-16">
        <AnimateOnScroll><h2 className="text-3xl md:text-5xl font-display font-bold tracking-tightest mb-8" style={{ color: "#ffffff" }}>SKILLS</h2></AnimateOnScroll>
        <AnimateOnScroll>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <MotionPill
                key={skill}
                className="px-4 py-2 rounded-full border border-white/15 text-sm text-white hover:border-accent hover:text-accent transition-colors"
              >
                {skill}
              </MotionPill>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      <AnimatedDivider className="mx-8 md:mx-16 lg:mx-16" />

      {/* Memberships */}
      <section className="px-8 md:px-16 lg:px-16 py-16">
        <AnimateOnScroll><h2 className="text-3xl md:text-5xl font-display font-bold tracking-tightest mb-8" style={{ color: "#ffffff" }}>MEMBERSHIPS</h2></AnimateOnScroll>
        <div className="flex flex-col gap-2">
          {memberships.map((m, i) => (
            <AnimateOnScroll key={m.name} delay={i * 0.08}>
              <div className="py-4 border-b border-white/10 last:border-b-0">
                <p className="text-base font-semibold text-white">{m.name}</p>
                {m.description && (
                  <p className="text-sm text-secondary mt-1">{m.description}</p>
                )}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>
    </main>
  );
}
