import { getAllProjects, getProject } from "@/lib/content";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import MotionPill from "@/components/MotionPill";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: typeof project.title === "string" ? project.title : slug,
    description: project.description ?? undefined,
  };
}

// ---------------------------------------------------------------------------
// Link config
// ---------------------------------------------------------------------------

const linkMeta: {
  key: keyof NonNullable<Awaited<ReturnType<typeof getProject>>>["links"];
  label: string;
}[] = [
  { key: "github", label: "GitHub" },
  { key: "paper", label: "Paper" },
  { key: "demo", label: "Demo" },
  { key: "dataset", label: "Dataset" },
  { key: "poster", label: "Poster" },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const title =
    typeof project.title === "string" ? project.title : slug;
  const bodyContent = await project.body();

  return (
    <article className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      {/* Cover image */}
      {project.cover && (
        <AnimateOnScroll>
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-10">
            <Image
              src={project.cover}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </AnimateOnScroll>
      )}

      {/* Title */}
      <AnimateOnScroll delay={0.1}>
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white mb-6">
          {title}
        </h1>
      </AnimateOnScroll>

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <AnimateOnScroll delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <MotionPill key={tag} as="span">
                <span className="inline-block bg-white/10 text-secondary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              </MotionPill>
            ))}
          </div>
        </AnimateOnScroll>
      )}

      {/* Date */}
      {project.date && (
        <AnimateOnScroll delay={0.2}>
          <p className="text-secondary text-sm mb-8">
            {new Date(project.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </p>
        </AnimateOnScroll>
      )}

      {/* Links */}
      {project.links && (
        <AnimateOnScroll delay={0.25}>
          <div className="flex flex-wrap gap-2 mb-12">
            {linkMeta.map(({ key, label }) => {
              const url = project.links?.[key];
              if (!url) return null;
              return (
                <MotionPill key={key} as="span">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-accent text-black text-sm font-semibold px-4 py-1.5 rounded-full hover:brightness-110 transition-all"
                  >
                    {label}
                  </a>
                </MotionPill>
              );
            })}
          </div>
        </AnimateOnScroll>
      )}

      {/* Body */}
      <AnimateOnScroll delay={0.3}>
        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{
            __html: Markdoc.renderers.html(
              Markdoc.transform(bodyContent.node)
            ),
          }}
        />
      </AnimateOnScroll>

      {/* Back link */}
      <AnimateOnScroll delay={0.1}>
        <div className="mt-16 pt-8 border-t border-white/10">
          <Link
            href="/projects"
            className="text-accent hover:underline font-semibold"
          >
            &larr; Back to Projects
          </Link>
        </div>
      </AnimateOnScroll>
    </article>
  );
}
