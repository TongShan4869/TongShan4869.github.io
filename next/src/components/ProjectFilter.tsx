"use client";

import { useState } from "react";
import MotionPill from "@/components/MotionPill";
import ProjectCard from "@/components/ProjectCard";
import { StaggeredGrid, StaggeredGridItem } from "@/components/StaggeredGrid";

interface Project {
  slug: string;
  title: string;
  description?: string | null;
  cover?: string | null;
  tags?: readonly string[];
}

interface ProjectFilterProps {
  allTags: string[];
  projects: Project[];
}

export default function ProjectFilter({ allTags, projects }: ProjectFilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearTags = () => setSelectedTags([]);

  const filtered =
    selectedTags.length === 0
      ? projects
      : projects.filter((p) =>
          p.tags?.some((t) => selectedTags.includes(t))
        );

  return (
    <>
      {/* Tag filter pills */}
      <div className="flex flex-wrap gap-2 mb-12">
        <MotionPill>
          <button
            onClick={clearTags}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide transition-colors ${
              selectedTags.length === 0
                ? "bg-accent text-black"
                : "bg-white/10 text-secondary hover:text-white"
            }`}
          >
            All
          </button>
        </MotionPill>
        {allTags.map((tag) => (
          <MotionPill key={tag}>
            <button
              onClick={() => toggleTag(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-accent text-black"
                  : "bg-white/10 text-secondary hover:text-white"
              }`}
            >
              {tag}
            </button>
          </MotionPill>
        ))}
      </div>

      {/* Project grid */}
      <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project, i) => (
          <StaggeredGridItem key={project.slug}>
            <ProjectCard
              slug={project.slug}
              title={project.title}
              description={project.description}
              cover={project.cover}
              tags={project.tags}
              index={i}
            />
          </StaggeredGridItem>
        ))}
      </StaggeredGrid>

      {filtered.length === 0 && (
        <p className="text-secondary text-center py-20">
          No projects match the selected tags.
        </p>
      )}
    </>
  );
}
