# Website Rebuild Design

**Date:** 2026-03-11
**Status:** Approved

## Overview

Complete rebuild of TongShan4869.github.io from Jekyll (al-folio) to Next.js, replicating the design language of cuinmusic-web (the music portfolio site) but adapted for a multi-faceted professional identity: researcher, engineer, and creator.

## Tech Stack

- **Framework:** Next.js 16 with static export
- **Hosting:** GitHub Pages
- **Styling:** Tailwind CSS v4 + PostCSS
- **Animation:** Framer Motion v12 + Lenis (smooth scroll)
- **CMS:** Keystatic (markdown format, local file storage)
- **Publications:** BibTeX parser (papers.bib as source of truth)
- **Fonts:** Inter / Inter Display
- **Language:** TypeScript

## Design Language

Inherited from cuinmusic-web with modifications:

- **Background:** Black (#000), white text (#fff)
- **Accent color:** Teal (#4EC5D4) — replacing pink (#FFB6C1)
- **Custom ring cursor** with mix-blend-difference
- **Scroll progress bar** (teal)
- **Lenis smooth scrolling**
- **Framer Motion animations:** AnimateOnScroll, ScrollRevealText, parallax, staggered grids, 3D hover cards
- **Scrolling marquee** section headers
- **Responsive:** Mobile-first, fluid typography with clamp()

## Pages & Sections

### Home (`/`)
1. **Hero** — Name, multi-faceted tagline, abstract waveform background (mouse-reactive)
2. **About Brief** — ScrollRevealText bio, profile picture with parallax
3. **Featured Projects** — Staggered grid, 3D hover cards
4. **Publication Highlights** — Selected papers
5. **News** — Recent announcements
6. **Contact** — Form + social links

### Projects (`/projects`)
- Filterable grid of all projects
- Dynamic tag system managed via Keystatic
- Default tags: Academic Research, Technical Project, Side Project
- Tags are user-editable — can add/remove categories from CMS
- 3D hover cards (adapted from MusicCard)

### Project Detail (`/projects/[slug]`)
- Full description, figures, links (GitHub, paper, demo)
- Adapted from MusicDetailContent

### Publications (`/publications`)
- Parsed from `papers.bib` at build time
- Grouped by year (descending)
- DOI links, PDF links, badges
- AnimateOnScroll entries

### Blog (`/blog`)
- Markdown posts via Keystatic
- StaggeredGrid post cards
- Tags/categories

### Blog Post (`/blog/[slug]`)
- Full markdown rendering
- Code syntax highlighting
- Math support (KaTeX)

### CV (`/cv`)
- Education, industry experience, skills, awards
- Timeline layout (adapted from AnimatedEventRow)
- PDF download link
- Managed via Keystatic singleton

### Contact (`/contact`)
- Formspree contact form
- Social links grid (GitHub, LinkedIn, Google Scholar, Twitter/X, ResearchGate)

## Navigation

`Home | Projects | Publications | Blog | CV | Contact`

News is shown on homepage, not a separate nav item.

## Content Management (Keystatic)

### Collections
| Collection | Format | Fields |
|-----------|--------|--------|
| **Projects** | Markdown | title, slug, description, cover image, tags (dynamic), links (github, paper, demo, dataset), featured, date |
| **Blog Posts** | Markdown | title, slug, date, tags, description, cover image, body |
| **News** | Markdown | title, date, body |
| **Project Tags** | JSON | name, slug, color (optional) |

### Singletons
| Singleton | Format | Fields |
|-----------|--------|--------|
| **About** | Markdown | bioShort, bioFull, researchInterests, photo |
| **CV** | JSON | education[], experience[], awards[], skills[], memberships[] |
| **Site Settings** | JSON | name, email, tagline, social URLs, formspree ID |

## Components

### Reused from cuinmusic-web (direct port)
- AnimateOnScroll, ScrollRevealText, ParallaxEmbed
- MotionPill, StaggeredGrid, StaggeredGridItem, AnimatedDivider
- CustomCursor, ScrollProgress, SmoothScroll, ScrollToTop
- Navigation (adapted nav items), Footer, CopyrightFooter
- ContactForm, PageTransition, FillWidthText, ScrollingMarquee

### New / Modified
- **HeroWaveform** — Canvas-based abstract waveform, mouse-reactive
- **ProjectCard** — Adapted from MusicCard, shows tags + research images
- **ProjectFilter** — Tag-based filtering with MotionPill toggles
- **PublicationEntry** — Renders BibTeX entry with DOI/PDF/badges
- **CVTimeline** — Timeline for education/experience (from AnimatedEventRow)
- **BlogPostCard** — Post preview card with date, tags, excerpt
- **MathRenderer** — KaTeX for equations in blog posts

## Content Migration

From current Jekyll site, preserve:
- `_bibliography/papers.bib` → `src/content/papers.bib`
- 3 academic projects → Keystatic project entries
- `prof_pic_tong.jpg` → `public/images/profile.jpg`
- `Tong_Shan_CV.pdf` → `public/files/cv.pdf`
- Project images → `public/images/projects/`
- About bio text → Keystatic about singleton
- Social links → Keystatic site settings

## Accent Color

Teal: `#4EC5D4`
- Used for: links, hover states, scroll progress bar, dividers, tags, buttons
- Pairs with: white text on dark background

## Hero Background

Abstract waveform animation:
- Canvas-based rendering
- Oscillating sine/bezier waves
- Reacts to mouse position (wave distortion follows cursor)
- Subtle, non-distracting
- Respects prefers-reduced-motion
