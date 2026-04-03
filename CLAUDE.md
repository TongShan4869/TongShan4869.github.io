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

- **Section headings** should always be fully white (`#ffffff`). Do not wrap them in `AnimateOnScroll` or any opacity-based scroll animation — it makes them appear grey. Use static rendering or inline `style={{ color: "#ffffff" }}` if needed.
- **Hover/transition speeds** should be slow and smooth to match the project card style: use `duration-700` with `ease-[cubic-bezier(0.32,0.72,0,1)]`, not the default `duration-300`.
- **Custom cursor** uses `mix-blend-difference`, which inverts colors — avoid pure white hover backgrounds in interactive elements as they become invisible under the cursor. Use `bg-white/5` default with `hover:bg-white` for cards.
