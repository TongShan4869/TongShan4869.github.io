import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export async function getAllProjects() {
  const slugs = await reader.collections.projects.list();
  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const project = await reader.collections.projects.read(slug);
      return { slug, ...project };
    })
  );
  return projects
    .filter((p) => p !== null)
    .sort(
      (a, b) =>
        new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
    );
}

export async function getFeaturedProjects() {
  const all = await getAllProjects();
  return all.filter((p) => p.featured);
}

export async function getProject(slug: string) {
  return reader.collections.projects.read(slug);
}

export async function getAllProjectTags() {
  const projects = await getAllProjects();
  const tags = new Set<string>();
  projects.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

export async function getAllPosts() {
  const slugs = await reader.collections.posts.list();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await reader.collections.posts.read(slug);
      return { slug, ...post };
    })
  );
  return posts
    .filter((p) => p !== null)
    .sort(
      (a, b) =>
        new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
    );
}

export async function getPost(slug: string) {
  return reader.collections.posts.read(slug);
}

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------

export async function getAllNews() {
  const slugs = await reader.collections.news.list();
  const items = await Promise.all(
    slugs.map(async (slug) => {
      const item = await reader.collections.news.read(slug);
      return { slug, ...item };
    })
  );
  return items
    .filter((n) => n !== null)
    .sort(
      (a, b) =>
        new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
    );
}

// ---------------------------------------------------------------------------
// Singletons
// ---------------------------------------------------------------------------

export async function getAbout() {
  return reader.singletons.about.read();
}

export async function getCV() {
  return reader.singletons.cv.read();
}

export async function getSiteSettings() {
  return reader.singletons.site.read();
}
