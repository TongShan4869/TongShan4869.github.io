# CLAUDE.md

## Project Overview

Personal academic portfolio site for Tong Shan, deployed at https://tongshan4869.github.io. Built with Next.js, hosted on GitHub Pages via static export.

## Repository Structure

- `next/` — Next.js application (all source code lives here)
  - `src/app/` — App Router pages: home, blog, contact, cv, projects, publications
  - `src/app/api/` and `src/app/keystatic/` — Dev-only Keystatic CMS routes (excluded from production build)
  - `src/components/` — React components
  - `src/content/` — Content files (papers.bib, projects as .mdoc, singletons as JSON)
  - `src/lib/` — Utility functions
  - `public/` — Static assets (images, fonts)
- `.github/workflows/nextjs-deploy.yml` — CI/CD workflow

## Tech Stack

- **Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 with `@tailwindcss/typography`
- **CMS**: Keystatic (dev-only, local mode)
- **Animations**: Framer Motion, Lenis (smooth scrolling)
- **Deployment**: GitHub Pages via static export (`output: "export"`)

## Development

```bash
cd next
npm install
npm run dev     # Dev server at localhost:3000 (includes Keystatic admin at /keystatic)
npm run build   # Production static export to next/out/
npm run lint    # ESLint
```

## Deployment

- Pushes to `master` trigger GitHub Actions workflow
- The workflow removes dev-only Keystatic routes (`src/app/api/`, `src/app/keystatic/`) before building, since they are incompatible with static export
- Build output (`next/out/`) is deployed to GitHub Pages

## Key Constraints

- **Static export only**: No server-side features (API routes, SSR, middleware) in production. All pages must be statically exportable.
- **Keystatic is dev-only**: The `src/app/api/` and `src/app/keystatic/` directories exist for local content editing but are stripped during CI build. Do not add production dependencies on these routes.
- **Images must be unoptimized**: `next/image` optimization is disabled for static export compatibility.
- **New dynamic routes** must include `generateStaticParams()` to work with static export.

## Design & Animation Guidelines

- **Page headings** use static `h1` with `text-7xl md:text-9xl font-display font-bold tracking-tightest` and inline `style={{ color: "#ffffff" }}`. No `ScrollingMarquee` — use plain headings on all pages.
- **Section headings** (e.g., CV subsections) use `h2` with `text-3xl md:text-5xl` wrapped in `AnimateOnScroll` with inline `style={{ color: "#ffffff" }}`.
- **Page layout padding**: Use `px-8 md:px-16 lg:px-16` consistently across pages. No `max-w` centering — content goes edge-to-edge with padding.
- **Hover/transition speeds** should be slow and smooth: use `duration-1000` for publication cards, `duration-700` for other interactions, with `ease-[cubic-bezier(0.32,0.72,0,1)]`.
- **Custom cursor**: Uses `mix-blend-difference` with spring physics (`stiffness: 200, damping: 25, mass: 0.8`). Add `data-cursor="view"` to clickable cards (projects, publications) for the enlarged "View" cursor effect.
- **Publication cards** (homepage): Transparent background, `hover:bg-white` with text color inversion. Author "Shan" highlighted in accent color. Cards link directly to DOI.
- **Publication entries** (publications page): No hover effect (`hover={false}`), journal/year shown below authors, larger title font (`text-lg md:text-xl`).
- **CV content descriptions**: Use semicolons (`;`) as separators in JSON — the `CVTimeline` component splits on semicolons to render bullet points. Do not use periods as separators (they break on abbreviations like "K. Maddox").
