# Website Rebuild Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild TongShan4869.github.io from Jekyll to Next.js, replicating the cuinmusic-web design with teal accent, academic+professional content, and mouse-reactive waveform hero.

**Architecture:** Next.js 16 static export hosted on GitHub Pages. Keystatic CMS for content (markdown format). BibTeX parser for publications. Framer Motion + Lenis for animations. All reusable components ported from cuinmusic-web at `/Users/tongshan/Documents/cuinmusic-web/src/`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lenis, Keystatic, bibtex-parse

**Reference codebase:** `/Users/tongshan/Documents/cuinmusic-web/` (music site to clone design from)

**Current site (content source):** `/Users/tongshan/Documents/TongShan4869.github.io/` (Jekyll site with content to migrate)

---

## Phase 1: Project Scaffolding

### Task 1: Initialize Next.js project

**Context:** We're rebuilding in-place. The old Jekyll files will be removed after the new site is working. For now, scaffold the Next.js project in a `next/` subdirectory to avoid conflicts, then swap at the end.

**Step 1:** Create Next.js project structure

```bash
cd /Users/tongshan/Documents/TongShan4869.github.io
mkdir -p next
cd next
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-turbopack --import-alias "@/*"
```

**Step 2:** Install dependencies

```bash
npm install framer-motion lenis @keystatic/core @keystatic/next bibtex-parse gray-matter remark remark-html remark-gfm katex remark-math rehype-katex
npm install -D @tailwindcss/postcss @types/node @types/react @types/react-dom
```

**Step 3:** Commit

```bash
git add next/
git commit -m "feat: scaffold Next.js project with dependencies"
```

---

### Task 2: Configure Tailwind, PostCSS, TypeScript

**Files:**
- Modify: `next/tailwind.config.ts`
- Modify: `next/postcss.config.mjs`
- Modify: `next/tsconfig.json`

**Step 1:** Replace `next/tailwind.config.ts` — clone from cuinmusic-web but change accent to teal:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: "#4EC5D4",
        secondary: "#888888",
      },
      fontFamily: {
        display: ['"Inter Display"', "Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      maxWidth: {
        site: "1480px",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tightest: "-0.06em",
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 2:** Replace `next/postcss.config.mjs` — same as cuinmusic-web:

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

**Step 3:** Ensure `next/tsconfig.json` has path alias `@/*` → `./src/*` (should already be set by create-next-app).

**Step 4:** Commit

```bash
git add next/tailwind.config.ts next/postcss.config.mjs next/tsconfig.json
git commit -m "feat: configure Tailwind with teal accent, PostCSS, TypeScript"
```

---

### Task 3: Set up globals.css and root layout

**Files:**
- Modify: `next/src/app/globals.css`
- Modify: `next/src/app/layout.tsx`
- Create: `next/src/app/template.tsx`

**Step 1:** Replace `next/src/app/globals.css` — clone from cuinmusic-web, change accent color:

```css
@import "tailwindcss";

@theme inline {
  --color-accent: #4EC5D4;
  --color-secondary: #888888;
  --font-display: "Inter Display", "Inter", sans-serif;
  --font-body: "Inter", sans-serif;
  --max-width-site: 1480px;
  --letter-spacing-tighter: -0.04em;
  --letter-spacing-tightest: -0.06em;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #000;
  color: #fff;
  font-family: 'Inter', sans-serif;
}

::selection {
  background: #4EC5D4;
  color: #000;
}

@media (pointer: fine) {
  * {
    cursor: none !important;
  }
}

@utility marquee-on-repeat {
  display: flex;
  width: max-content;
  animation: marquee-on-repeat 120s linear infinite;
  will-change: transform;
}
@utility marquee-on-repeat-content {
  flex-shrink: 0;
}
@keyframes marquee-on-repeat {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
```

**Step 2:** Create `next/src/app/template.tsx` — direct copy from cuinmusic-web.

**Step 3:** Update `next/src/app/layout.tsx` — adapted for academic site (components will be created in later tasks, stub imports for now):

```typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tong Shan",
    template: "%s | Tong Shan",
  },
  description: "Researcher, Engineer, Creator — Auditory neuroscience, hearing science, and music.",
  metadataBase: new URL("https://TongShan4869.github.io"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
```

**Step 4:** Create a minimal `next/src/app/page.tsx` placeholder:

```typescript
export default function Home() {
  return <main className="min-h-screen flex items-center justify-center text-2xl">Site under construction</main>;
}
```

**Step 5:** Verify it runs

```bash
cd next && npm run dev
# Visit http://localhost:3000 — should show dark page with "Site under construction"
```

**Step 6:** Commit

```bash
git add next/src/
git commit -m "feat: set up globals.css, root layout, and template with teal theme"
```

---

## Phase 2: Port Core Components from cuinmusic-web

### Task 4: Port animation utility components

**Files to create** (copy from `/Users/tongshan/Documents/cuinmusic-web/src/` and adapt):
- `next/src/lib/transitions.ts` — direct copy
- `next/src/components/AnimateOnScroll.tsx` — direct copy
- `next/src/components/ScrollRevealText.tsx` — direct copy
- `next/src/components/MotionPill.tsx` — direct copy
- `next/src/components/StaggeredGrid.tsx` — direct copy
- `next/src/components/AnimatedDivider.tsx` — direct copy
- `next/src/components/ScrollingMarquee.tsx` — direct copy
- `next/src/components/ParallaxEmbed.tsx` — direct copy
- `next/src/components/FillWidthText.tsx` — direct copy
- `next/src/components/PageTransition.tsx` — direct copy

**Step 1:** Copy each file from cuinmusic-web. These are all generic animation wrappers with no music-specific content. No modifications needed.

**Step 2:** Verify no import errors

```bash
cd next && npx tsc --noEmit
```

**Step 3:** Commit

```bash
git add next/src/lib/transitions.ts next/src/components/
git commit -m "feat: port animation utility components from cuinmusic-web"
```

---

### Task 5: Port global UI components

**Files to create** (copy and adapt):
- `next/src/components/CustomCursor.tsx` — direct copy
- `next/src/components/ScrollProgress.tsx` — change accent color reference if hardcoded
- `next/src/components/SmoothScroll.tsx` — direct copy
- `next/src/components/ScrollToTop.tsx` — direct copy

**Step 1:** Copy each file. Check ScrollProgress for hardcoded pink — replace any `#FFB6C1` with `bg-accent` or `#4EC5D4`.

**Step 2:** Update `next/src/app/layout.tsx` to include these components:

```typescript
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";

// In body:
<SmoothScroll />
<CustomCursor />
<ScrollProgress />
<ScrollToTop />
{children}
```

**Step 3:** Verify dev server shows custom cursor and scroll progress bar.

**Step 4:** Commit

```bash
git add next/src/components/ next/src/app/layout.tsx
git commit -m "feat: port custom cursor, scroll progress, smooth scroll components"
```

---

### Task 6: Port and adapt Navigation

**Files:**
- Create: `next/src/components/Navigation.tsx`

**Step 1:** Copy from cuinmusic-web. Modify navigation items:

```typescript
const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Publications", href: "/publications" },
  { label: "Blog", href: "/blog" },
  { label: "CV", href: "/cv" },
  { label: "Contact", href: "/contact" },
];
```

**Step 2:** Update the brand/logo text from "Cu." to "Tong Shan" or initials "TS".

**Step 3:** Update the right-side description from music text to: "Researcher / Engineer / Creator"

**Step 4:** Add Navigation to layout.tsx.

**Step 5:** Commit

```bash
git add next/src/components/Navigation.tsx next/src/app/layout.tsx
git commit -m "feat: port and adapt navigation for academic site"
```

---

### Task 7: Port and adapt Footer

**Files:**
- Create: `next/src/components/Footer.tsx`
- Create: `next/src/components/CopyrightFooter.tsx`
- Create: `next/src/components/FooterWrapper.tsx`

**Step 1:** Copy all three from cuinmusic-web. Modify Footer:
- Change social links to: GitHub, LinkedIn, Google Scholar, ResearchGate, Twitter/X
- Replace music platform icons with academic platform icons
- Update contact email to `tshan@ur.rochester.edu`
- Change copyright text to "Tong Shan"

**Step 2:** Copy CopyrightFooter — change name.

**Step 3:** Copy FooterWrapper — update route logic. Full footer on `/`, minimal footer on subpages (same logic, just verify routes).

**Step 4:** Add FooterWrapper to layout.tsx.

**Step 5:** Commit

```bash
git add next/src/components/Footer.tsx next/src/components/CopyrightFooter.tsx next/src/components/FooterWrapper.tsx next/src/app/layout.tsx
git commit -m "feat: port and adapt footer with academic social links"
```

---

## Phase 3: Hero with Waveform

### Task 8: Create HeroWaveform component

**Files:**
- Create: `next/src/components/HeroWaveform.tsx`

**Step 1:** Create a canvas-based abstract waveform component:

```typescript
"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

// Canvas-based waveform that:
// - Renders 3-4 layered sine waves with different frequencies/amplitudes
// - Tracks mouse position and distorts waves near cursor
// - Uses requestAnimationFrame for smooth animation
// - Respects prefers-reduced-motion (shows static waves)
// - Semi-transparent (overlay on dark background)
// - Color: teal (#4EC5D4) with varying opacity per wave layer
```

Key implementation details:
- Use `useRef` for canvas, mouse position, and animation frame
- Draw 3-4 sine waves with parameters: `amplitude`, `frequency`, `speed`, `opacity`
- Mouse influence: waves bulge/distort within ~200px radius of cursor
- Wave colors: teal at 0.08, 0.12, 0.18, 0.25 opacity
- Canvas fills full viewport (`position: absolute, inset: 0`)
- Resize handler for responsive canvas

**Step 2:** Verify waveform renders on dev server by temporarily adding to page.tsx.

**Step 3:** Commit

```bash
git add next/src/components/HeroWaveform.tsx
git commit -m "feat: create mouse-reactive waveform canvas component"
```

---

### Task 9: Create Hero section

**Files:**
- Create: `next/src/components/Hero.tsx`

**Step 1:** Adapt from cuinmusic-web Hero. Replace video background with HeroWaveform. Update content:

```typescript
// Structure:
// - Full viewport height section
// - HeroWaveform as background (absolute positioned)
// - Dark overlay gradient
// - Animated text content:
//   - Name: "Tong Shan" (large display font, staggered reveal)
//   - Tagline pills: "Researcher" "Engineer" "Creator" (MotionPill components)
//   - Brief one-liner: "Auditory Neuroscience · Hearing Science · Music"
// - Scroll indicator at bottom
```

**Step 2:** Port the animation pattern from cuinmusic-web Hero (staggered fade-in, spring transitions).

**Step 3:** Commit

```bash
git add next/src/components/Hero.tsx
git commit -m "feat: create hero section with waveform background"
```

---

## Phase 4: Keystatic CMS Setup

### Task 10: Configure Keystatic

**Files:**
- Create: `next/keystatic.config.tsx`
- Create: `next/src/app/keystatic/[[...params]]/page.tsx`
- Create: `next/src/app/api/keystatic/[...params]/route.ts`

**Step 1:** Create keystatic config with collections and singletons:

```typescript
import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: { kind: "local" },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*",
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Short Description", multiline: true }),
        cover: fields.image({
          label: "Cover Image",
          directory: "public/images/projects",
          publicPath: "/images/projects",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        featured: fields.checkbox({ label: "Featured on Homepage", defaultValue: false }),
        date: fields.date({ label: "Date" }),
        links: fields.object({
          github: fields.url({ label: "GitHub URL" }),
          paper: fields.url({ label: "Paper URL" }),
          demo: fields.url({ label: "Demo URL" }),
          dataset: fields.url({ label: "Dataset URL" }),
          poster: fields.url({ label: "Poster URL" }),
        }),
        body: fields.markdoc({ label: "Body" }),
      },
    }),
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({ label: "Date", validation: { isRequired: true } }),
        description: fields.text({ label: "Description", multiline: true }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        cover: fields.image({
          label: "Cover Image",
          directory: "public/images/posts",
          publicPath: "/images/posts",
        }),
        body: fields.markdoc({ label: "Body" }),
      },
    }),
    news: collection({
      label: "News",
      slugField: "title",
      path: "src/content/news/*",
      format: { contentField: "body" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({ label: "Date", validation: { isRequired: true } }),
        body: fields.markdoc({ label: "Body" }),
      },
    }),
  },
  singletons: {
    about: singleton({
      label: "About",
      path: "src/content/singletons/about",
      format: { data: "json" },
      schema: {
        bioShort: fields.text({ label: "Short Bio (homepage)", multiline: true }),
        bioFull: fields.text({ label: "Full Bio", multiline: true }),
        researchInterests: fields.text({ label: "Research Interests", multiline: true }),
        photo: fields.image({
          label: "Profile Photo",
          directory: "public/images",
          publicPath: "/images",
        }),
      },
    }),
    cv: singleton({
      label: "CV",
      path: "src/content/singletons/cv",
      format: { data: "json" },
      schema: {
        education: fields.array(
          fields.object({
            degree: fields.text({ label: "Degree" }),
            institution: fields.text({ label: "Institution" }),
            year: fields.text({ label: "Year" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Education", itemLabel: (props) => props.fields.institution.value }
        ),
        experience: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            institution: fields.text({ label: "Institution" }),
            year: fields.text({ label: "Year" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Experience", itemLabel: (props) => props.fields.title.value }
        ),
        awards: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            year: fields.text({ label: "Year" }),
          }),
          { label: "Awards", itemLabel: (props) => props.fields.title.value }
        ),
        skills: fields.array(fields.text({ label: "Skill" }), { label: "Skills" }),
        memberships: fields.array(
          fields.object({
            name: fields.text({ label: "Organization" }),
            description: fields.text({ label: "Role/Description", multiline: true }),
          }),
          { label: "Professional Memberships", itemLabel: (props) => props.fields.name.value }
        ),
      },
    }),
    site: singleton({
      label: "Site Settings",
      path: "src/content/singletons/site",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Name", defaultValue: "Tong Shan" }),
        tagline: fields.text({ label: "Tagline", defaultValue: "Researcher / Engineer / Creator" }),
        email: fields.text({ label: "Email" }),
        githubUrl: fields.url({ label: "GitHub URL" }),
        linkedinUrl: fields.url({ label: "LinkedIn URL" }),
        scholarUrl: fields.url({ label: "Google Scholar URL" }),
        researchgateUrl: fields.url({ label: "ResearchGate URL" }),
        xUrl: fields.url({ label: "X (Twitter) URL" }),
        musicUrl: fields.url({ label: "Music Portfolio URL" }),
        formspreeId: fields.text({ label: "Formspree Form ID" }),
        cvPdfPath: fields.text({ label: "CV PDF Path", defaultValue: "/files/cv.pdf" }),
      },
    }),
  },
});
```

**Step 2:** Create Keystatic route files (standard boilerplate from Keystatic docs).

**Step 3:** Verify Keystatic admin loads at `http://localhost:3000/keystatic`.

**Step 4:** Commit

```bash
git add next/keystatic.config.tsx next/src/app/keystatic/ next/src/app/api/keystatic/
git commit -m "feat: configure Keystatic CMS with projects, posts, news, about, CV, site settings"
```

---

### Task 11: Create content helper functions

**Files:**
- Create: `next/src/lib/content.ts`

**Step 1:** Create data fetching functions using Keystatic reader:

```typescript
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

// Projects
export async function getAllProjects() { ... }
export async function getFeaturedProjects() { ... }
export async function getProject(slug: string) { ... }
export async function getAllProjectTags() { ... }  // collect unique tags from all projects

// Blog
export async function getAllPosts() { ... }
export async function getPost(slug: string) { ... }

// News
export async function getAllNews() { ... }

// Singletons
export async function getAbout() { ... }
export async function getCV() { ... }
export async function getSiteSettings() { ... }
```

**Step 2:** Commit

```bash
git add next/src/lib/content.ts
git commit -m "feat: create Keystatic content helper functions"
```

---

### Task 12: Create BibTeX parser

**Files:**
- Create: `next/src/lib/publications.ts`

**Step 1:** Create a module that parses `papers.bib` and returns structured publication data:

```typescript
import fs from "fs";
import path from "path";

export interface Publication {
  key: string;
  type: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume?: string;
  pages?: string;
  doi?: string;
  url?: string;
  preview?: string;
  selected?: boolean;
}

export function getPublications(): Publication[] {
  const bibPath = path.join(process.cwd(), "src/content/papers.bib");
  const bibContent = fs.readFileSync(bibPath, "utf-8");
  // Parse BibTeX entries
  // Sort by year descending
  // Return structured data
}

export function getSelectedPublications(): Publication[] {
  return getPublications().filter((p) => p.selected);
}

export function getPublicationsByYear(): Map<number, Publication[]> {
  // Group by year for the publications page
}
```

**Step 2:** Copy `papers.bib` from current site:

```bash
mkdir -p next/src/content
cp _bibliography/papers.bib next/src/content/papers.bib
```

**Step 3:** Commit

```bash
git add next/src/lib/publications.ts next/src/content/papers.bib
git commit -m "feat: create BibTeX parser for publications"
```

---

## Phase 5: Content Migration

### Task 13: Migrate content into Keystatic

**Step 1:** Copy profile image and project images:

```bash
mkdir -p next/public/images/projects next/public/images next/public/files
cp assets/img/prof_pic_tong.jpg next/public/images/profile.jpg
cp assets/img/music-mind-stock-1000.jpeg next/public/images/projects/neural-encoding.jpeg
cp assets/img/music_Brain.jpeg next/public/images/projects/chimeric-music.jpeg
cp assets/img/chord.png next/public/images/projects/consonance-coding.png
cp assets/img/ABR_ANM.jpg next/public/images/projects/abr-anm.jpg
cp assets/img/Consonance_correlation.png next/public/images/projects/consonance-correlation.png
cp assets/pdf/Tong_Shan_CV.pdf next/public/files/cv.pdf
```

**Step 2:** Create project content files from the 3 existing projects. For each, create a markdown file in `next/src/content/projects/`:

- `neural-encoding-music-speech.mdoc` — from `_projects/1_project.md`
- `chimeric-music.mdoc` — from `_projects/2_project.md`
- `musical-consonance-coding.mdoc` — from `_projects/3_project.md`

Convert Jekyll liquid tags to standard markdown. Add frontmatter as Keystatic JSON sidecar.

**Step 3:** Create singleton content files:

- `next/src/content/singletons/about.json` — from `_pages/about.md` bio
- `next/src/content/singletons/cv.json` — from `_data/cv.yml`
- `next/src/content/singletons/site.json` — from `_config.yml` social links

**Step 4:** Commit

```bash
git add next/public/ next/src/content/
git commit -m "feat: migrate content from Jekyll site to Keystatic"
```

---

## Phase 6: Build Pages

### Task 14: Build Homepage

**Files:**
- Modify: `next/src/app/page.tsx`
- Create: `next/src/components/AboutBrief.tsx`
- Create: `next/src/components/FeaturedProjects.tsx`
- Create: `next/src/components/ProjectCard.tsx`
- Create: `next/src/components/PublicationHighlights.tsx`
- Create: `next/src/components/NewsSection.tsx`

**Step 1:** Create `AboutBrief.tsx` — adapt from cuinmusic-web `AboutBrief.tsx`:
- Replace music bio with academic bio from Keystatic
- Keep ScrollRevealText animation pattern
- Keep parallax profile photo

**Step 2:** Create `ProjectCard.tsx` — adapt from cuinmusic-web `MusicCard.tsx`:
- Replace album art with project cover image
- Replace music tags with project tags (Academic Research, etc.)
- Keep 3D perspective hover effect
- Show project title + short description on hover

**Step 3:** Create `FeaturedProjects.tsx` — adapt from `FeaturedMusic.tsx`:
- Fetch featured projects from Keystatic
- Display in staggered grid with ProjectCards
- Use ScrollingMarquee header: "PROJECTS"

**Step 4:** Create `PublicationHighlights.tsx`:
- Fetch selected publications from BibTeX parser
- Display 2-3 selected papers with AnimateOnScroll
- Link to full publications page

**Step 5:** Create `NewsSection.tsx`:
- Fetch recent news from Keystatic
- Display with AnimateOnScroll + stagger
- Simple list with dates

**Step 6:** Assemble `page.tsx`:

```typescript
import Hero from "@/components/Hero";
import AboutBrief from "@/components/AboutBrief";
import FeaturedProjects from "@/components/FeaturedProjects";
import PublicationHighlights from "@/components/PublicationHighlights";
import NewsSection from "@/components/NewsSection";
import { getFeaturedProjects } from "@/lib/content";
import { getSelectedPublications } from "@/lib/publications";

export default async function Home() {
  const projects = await getFeaturedProjects();
  const publications = getSelectedPublications();
  // ... render sections
}
```

**Step 7:** Verify homepage renders with all sections.

**Step 8:** Commit

```bash
git add next/src/app/page.tsx next/src/components/
git commit -m "feat: build homepage with hero, about, projects, publications, news"
```

---

### Task 15: Build Projects page

**Files:**
- Create: `next/src/app/projects/page.tsx`
- Create: `next/src/components/ProjectFilter.tsx`

**Step 1:** Create `ProjectFilter.tsx` — tag filter bar:
- Fetch all unique tags from projects
- Render as MotionPill toggles
- "All" button to clear filter
- Client component with state

**Step 2:** Create projects page:
- Fetch all projects from Keystatic
- Display ProjectFilter at top
- StaggeredGrid of ProjectCards
- Filter by selected tags (client-side)

**Step 3:** Commit

```bash
git add next/src/app/projects/ next/src/components/ProjectFilter.tsx
git commit -m "feat: build projects page with tag filtering"
```

---

### Task 16: Build Project detail page

**Files:**
- Create: `next/src/app/projects/[slug]/page.tsx`
- Create: `next/src/components/ProjectDetailContent.tsx`

**Step 1:** Create detail page with `generateStaticParams` for static export:

```typescript
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}
```

**Step 2:** Create `ProjectDetailContent.tsx` — adapt from `MusicDetailContent.tsx`:
- Project title, tags, date
- Cover image with parallax
- Markdown body rendered as HTML
- Links section: GitHub, Paper, Demo, Dataset, Poster (displayed as MotionPill buttons)
- Navigation to prev/next project

**Step 3:** Commit

```bash
git add next/src/app/projects/[slug]/ next/src/components/ProjectDetailContent.tsx
git commit -m "feat: build project detail page with markdown rendering"
```

---

### Task 17: Build Publications page

**Files:**
- Create: `next/src/app/publications/page.tsx`
- Create: `next/src/components/PublicationEntry.tsx`

**Step 1:** Create `PublicationEntry.tsx`:
- Renders a single publication: title, authors (with self highlighted), journal, year
- Links: DOI badge, PDF link, preview image if available
- AnimateOnScroll wrapper

**Step 2:** Create publications page:
- Parse papers.bib via `getPublicationsByYear()`
- Group by year with year headers
- ScrollingMarquee header: "PUBLICATIONS"
- Each entry is a PublicationEntry

**Step 3:** Also list conference presentations (can be added as a separate section or as Keystatic content later).

**Step 4:** Commit

```bash
git add next/src/app/publications/ next/src/components/PublicationEntry.tsx
git commit -m "feat: build publications page with BibTeX parsing"
```

---

### Task 18: Build Blog page and post detail

**Files:**
- Create: `next/src/app/blog/page.tsx`
- Create: `next/src/app/blog/[slug]/page.tsx`
- Create: `next/src/components/BlogPostCard.tsx`

**Step 1:** Create `BlogPostCard.tsx`:
- Title, date, description, tags
- Hover animation (scale + opacity, similar to MusicCard but simpler)
- Link to full post

**Step 2:** Create blog index page:
- Fetch all posts from Keystatic, sorted by date
- StaggeredGrid of BlogPostCards

**Step 3:** Create blog post detail page:
- `generateStaticParams` for static export
- Render markdown body with syntax highlighting and KaTeX math support
- Post metadata (date, tags) at top
- AnimateOnScroll sections

**Step 4:** Commit

```bash
git add next/src/app/blog/ next/src/components/BlogPostCard.tsx
git commit -m "feat: build blog index and post detail pages"
```

---

### Task 19: Build CV page

**Files:**
- Create: `next/src/app/cv/page.tsx`
- Create: `next/src/components/CVTimeline.tsx`

**Step 1:** Create `CVTimeline.tsx` — adapt from `AnimatedEventRow.tsx`:
- Renders a timeline entry: title, institution, year, description
- Hover animation with background fill
- AnimateOnScroll wrapper

**Step 2:** Create CV page:
- Fetch CV data from Keystatic singleton
- Sections: Education, Experience, Awards, Skills, Professional Memberships
- Each section has a ScrollingMarquee header
- PDF download button at top (links to `/files/cv.pdf`)
- CVTimeline entries for each section

**Step 3:** Commit

```bash
git add next/src/app/cv/ next/src/components/CVTimeline.tsx
git commit -m "feat: build CV page with timeline layout"
```

---

### Task 20: Build Contact page

**Files:**
- Create: `next/src/app/contact/page.tsx`

**Step 1:** Adapt from cuinmusic-web contact page:
- Port ContactForm component (already copied in Task 4 or copy now)
- Create: `next/src/components/ContactForm.tsx` — copy from cuinmusic-web, update Formspree ID from site settings
- Social links: GitHub, LinkedIn, Google Scholar, ResearchGate, X
- Email display

**Step 2:** Commit

```bash
git add next/src/app/contact/ next/src/components/ContactForm.tsx
git commit -m "feat: build contact page with form and social links"
```

---

## Phase 7: Static Export & Deployment

### Task 21: Configure static export for GitHub Pages

**Files:**
- Modify: `next/next.config.ts`
- Create: `next/.github/workflows/deploy.yml` (or at repo root)

**Step 1:** Update `next/next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: "", // No base path needed for username.github.io
};

export default nextConfig;
```

**Step 2:** Test static export:

```bash
cd next && npm run build
# Should generate `out/` directory with static HTML/CSS/JS
```

**Step 3:** Verify static site works:

```bash
npx serve out
# Check all pages render correctly
```

**Step 4:** Commit

```bash
git add next/next.config.ts
git commit -m "feat: configure Next.js static export for GitHub Pages"
```

---

### Task 22: Swap Jekyll for Next.js and set up deployment

**Step 1:** Back up old Jekyll files (or rely on git history).

**Step 2:** Move Next.js files to repo root:
- Move contents of `next/` to repo root
- Remove old Jekyll files (`_config.yml`, `_layouts/`, `_includes/`, `_sass/`, `_plugins/`, `Gemfile`, etc.)
- Keep `docs/plans/` directory

**Step 3:** Create GitHub Actions workflow at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Step 4:** Update GitHub Pages settings to use GitHub Actions (instead of branch deployment).

**Step 5:** Commit and push:

```bash
git add -A
git commit -m "feat: swap Jekyll for Next.js, add GitHub Pages deployment"
git push
```

**Step 6:** Verify deployment at https://TongShan4869.github.io

---

## Phase 8: Polish & Verify

### Task 23: Final polish

- Test all pages render correctly in static export
- Test responsive design (mobile, tablet, desktop)
- Test dark theme consistency
- Test custom cursor behavior
- Test all links (internal and external)
- Test Keystatic admin at `/keystatic` (dev mode only — won't work in static export)
- Add `robots.txt` and sitemap
- Add favicon (use existing `web2.jpg` or create new)
- Verify prefers-reduced-motion works

### Task 24: Commit and verify deployment

```bash
git add -A
git commit -m "feat: final polish and deployment verification"
git push
```

Verify at https://TongShan4869.github.io that all pages work.

---

## Task Dependency Graph

```
Task 1 (scaffold) → Task 2 (config) → Task 3 (layout/css)
                                            ↓
Task 4 (animation components) → Task 5 (UI components) → Task 6 (nav) → Task 7 (footer)
                                            ↓
Task 8 (waveform) → Task 9 (hero)
                                            ↓
Task 10 (keystatic) → Task 11 (content helpers) → Task 12 (bibtex)
                                            ↓
Task 13 (migrate content)
                                            ↓
Task 14 (homepage) → Task 15 (projects) → Task 16 (project detail)
                   → Task 17 (publications)
                   → Task 18 (blog)
                   → Task 19 (CV)
                   → Task 20 (contact)
                                            ↓
Task 21 (static export) → Task 22 (swap & deploy) → Task 23 (polish) → Task 24 (final)
```

**Tasks 14-20 can be parallelized** — they are independent pages.

---

## Notes for Implementer

1. **Always reference cuinmusic-web** at `/Users/tongshan/Documents/cuinmusic-web/src/` when porting components. Copy first, then adapt.
2. **Accent color** is `#4EC5D4` (teal). Replace any `#FFB6C1` from cuinmusic-web.
3. **Project tags** are dynamic — stored as string arrays in Keystatic, not hardcoded enums.
4. **Static export** means no API routes in production. Keystatic admin only works in `npm run dev`.
5. **BibTeX** is the source of truth for publications — don't duplicate in Keystatic.
6. **Images** must use `unoptimized: true` in next.config for static export.
7. When porting components, keep `"use client"` directives and `useReducedMotion()` accessibility hooks.
