import Link from "next/link";
import ProjectCard from "./ProjectCard";
import ScrollingMarquee from "./ScrollingMarquee";

interface Project {
  slug: string;
  title?: string;
  description?: string | null;
  cover?: string | null;
  tags?: readonly string[];
}

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  const items = projects.slice(0, 6);

  // Build staggered rows: alternate 3fr/2fr and 2fr/3fr
  const rows: { left: Project; right?: Project; flip: boolean }[] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push({
      left: items[i],
      right: items[i + 1],
      flip: (i / 2) % 2 === 1,
    });
  }

  return (
    <section className="pt-8 md:pt-12 pb-20 md:pb-32">
      <ScrollingMarquee text="PROJECTS" />

      <div className="px-8 md:px-16 lg:px-24 mt-16 md:mt-24 flex flex-col gap-16 md:gap-24">
        {rows.map((row, rowIndex) => {
          if (!row.right) {
            return (
              <div key={row.left.slug} className="max-w-[50%]">
                <ProjectCard
                  slug={row.left.slug}
                  title={row.left.title ?? row.left.slug}
                  description={row.left.description}
                  cover={row.left.cover}
                  tags={row.left.tags}
                  index={0}
                />
              </div>
            );
          }

          return (
            <div
              key={row.left.slug}
              className={`grid grid-cols-1 ${
                row.flip
                  ? "md:grid-cols-[2fr_3fr]"
                  : "md:grid-cols-[3fr_2fr]"
              } gap-12 md:gap-20 items-end`}
            >
              <ProjectCard
                slug={row.left.slug}
                title={row.left.title ?? row.left.slug}
                description={row.left.description}
                cover={row.left.cover}
                tags={row.left.tags}
                index={rowIndex * 2}
              />
              <ProjectCard
                slug={row.right.slug}
                title={row.right.title ?? row.right.slug}
                description={row.right.description}
                cover={row.right.cover}
                tags={row.right.tags}
                index={rowIndex * 2 + 1}
              />
            </div>
          );
        })}

        <div className="flex justify-center mt-8">
          <Link
            href="/projects"
            className="inline-block border border-white/30 text-white text-base font-bold px-10 py-3.5 rounded-full hover:bg-accent hover:border-accent hover:text-black transition-all duration-300"
          >
            View All Projects &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
