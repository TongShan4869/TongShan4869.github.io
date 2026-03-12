import { getAllProjects, getAllProjectTags } from "@/lib/content";
import ScrollingMarquee from "@/components/ScrollingMarquee";
import ProjectFilter from "@/components/ProjectFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  const [projects, allTags] = await Promise.all([
    getAllProjects(),
    getAllProjectTags(),
  ]);

  // Serialize projects to plain props for the client component
  const serialized = projects.map((p) => ({
    slug: p.slug,
    title: typeof p.title === "string" ? p.title : p.slug,
    description: p.description ?? null,
    cover: p.cover ?? null,
    tags: p.tags ? [...p.tags] : [],
  }));

  return (
    <>
      <ScrollingMarquee text="PROJECTS" />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <ProjectFilter allTags={allTags} projects={serialized} />
      </section>
    </>
  );
}
