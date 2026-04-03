import { getAllProjects, getAllProjectTags } from "@/lib/content";
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
      <section className="pt-32 md:pt-40 px-8 md:px-16 lg:px-16">
        <h1 className="text-7xl md:text-9xl font-display font-bold tracking-tightest" style={{ color: "#ffffff" }}>
          PROJECTS
        </h1>
      </section>

      <section className="px-8 md:px-16 lg:px-16 py-16 md:py-24">
        <ProjectFilter allTags={allTags} projects={serialized} />
      </section>
    </>
  );
}
