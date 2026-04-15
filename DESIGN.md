# Design System

## Overview

A calm, editorial portfolio for a hearing-science researcher, engineer, and musician. The feel is **dark gallery meets scientific journal** — pure-black canvas, oversized display typography, generous negative space, and a single cool cyan accent that ties science and music together. Motion is slow and cinematic (never snappy); every card and heading eases in like a documentary cut.

Content is treated as the hero: layouts go **edge-to-edge** with large padding, not max-width-centered. Interactions reward attention — hover states invert contrast dramatically rather than nudging color slightly, and a custom cursor replaces the OS pointer on desktop.

Accessibility priorities: maintain WCAG AA contrast on body text, respect `prefers-reduced-motion`, and keep the accent color reserved for meaningful emphasis (author name in publications, punctuation highlights, key call-to-actions).

## Colors

- **Primary** (#4EC5D4): Accent cyan — author highlight in publications, hero punctuation, selected text background, reserved for a single focal point per view. Exposed as Tailwind `accent`.
- **Secondary** (#888888): Muted gray — body-copy de-emphasis, project-card descriptions, metadata. Exposed as Tailwind `secondary`.
- **Surface** (#000000): Page background. The site is dark-only; there is no light theme.
- **On-surface** (#FFFFFF): Primary text and display headings on the black surface.

### Alpha tiers (derived)

Text and surface variations are expressed as white-on-black opacity steps rather than named tints. This keeps the palette dead-simple:

- `text-white` — primary text, headings, active states
- `text-white/70` — italicized journal/year metadata
- `text-white/50` — author lists, secondary metadata
- `text-white/30` — tertiary metadata (trailing year)
- `bg-white/5` — transparent card base (publications)
- `bg-white` — full-white hover state and section separator strips (inverts text to black)
- `bg-black/60` + `backdrop-blur-sm` — overlay chips on top of imagery (project tags)

### Selection

Highlighted text uses `background: #4EC5D4; color: #000` — the accent as ink.

## Typography

- **Display Font**: `"Inter Display", Inter, sans-serif` — headlines, hero, section titles, card titles
- **Body Font**: `Inter, sans-serif` — paragraphs, metadata, UI labels

A single family (Inter + its display cut) runs the whole system. Uniformity is intentional: the visual contrast comes from **size and weight**, not from mixing families.

### Hierarchy

- **Page H1 / Homepage section H2** — `text-7xl md:text-9xl font-display font-bold tracking-tightest` (letter-spacing −0.06em). These are the oversized marquee headings (ABOUT, PUBLICATIONS, page titles). Always pure white (`#ffffff` inline) so they remain legible over the waveform background.
- **Hero title** — `clamp(1.6rem, 4.5vw, 3.5rem)`, `font-display font-semibold`, `leading-[1.3]`, `tracking-tighter`. Accent color used only on punctuation and CJK characters for rhythm.
- **Massive name** — `text-[14vw] font-display font-bold tracking-tightest leading-[0.85]`, rendered through a `FillWidthText` component that stretches to the full viewport width.
- **Subpage section H2** — `text-3xl md:text-5xl font-display font-bold` wrapped in `AnimateOnScroll`.
- **Card title (publications, projects)** — `text-lg md:text-xl font-display font-bold tracking-tight leading-snug`.
- **Body copy** — Inter regular, 14–16px. Project descriptions use `text-secondary text-sm`.
- **Tag / label** — `text-xs font-semibold uppercase tracking-wider`.

Letter-spacing is the signature move: everything display-scale uses `tracking-tightest` (−0.06em) or `tracking-tighter` (−0.04em). Nothing loose.

## Elevation

**No shadows.** Depth is conveyed through:

1. **Contrast inversion** on hover — publication cards flip from `bg-white/5` (nearly invisible) to solid `bg-white` with black text.
2. **Backdrop blur** on floating elements (project tag chips use `bg-black/60 backdrop-blur-sm`).
3. **Alpha layering** over imagery — dark gradient overlays fade hero media into the black surface (`bg-gradient-to-b from-transparent to-black`).
4. **3D tilt** — project cards respond to cursor position with subtle `rotateX`/`rotateY` (±3°) via Framer Motion springs (`stiffness: 150, damping: 30`). Disabled on touch and when `prefers-reduced-motion` is set.

Flat but never boring.

## Components

- **Buttons / CTAs**: No dedicated button component. Calls-to-action are rendered as text links or full-width inverted strips (`bg-white text-black` bands). When buttons appear (e.g., Music Portfolio), they use a simple bordered or white-filled pill.
- **Cards — Project**: `rounded-xl` image container, 4:3 aspect ratio, object-cover fill, hover reveals a `bg-white/80 backdrop-blur-sm` title band across the middle. Title + description sit below the card, not inside it.
- **Cards — Publication (homepage)**: Transparent background (`bg-white/5`), `rounded-2xl`, 8-unit padding. Hover inverts to `bg-white` with black text over `duration-700` using `cubic-bezier(0.32, 0.72, 0, 1)`. Author "Shan" always rendered in accent. `hover:scale-[1.02]`.
- **Publication entry (publications page)**: No hover effect, larger title (`text-lg md:text-xl`), journal/year shown below authors.
- **Tags / Chips**: Pill-shaped (`rounded-full`), `bg-black/60 backdrop-blur-sm`, white text, `text-xs font-semibold uppercase tracking-wider`, small horizontal padding.
- **Section separator strip**: Full-width `bg-white text-black` band, bold uppercase content (e.g., "RESEARCHER / ENGINEER / CREATOR" in the hero). Used as a visual punctuation mark, not a navigation element.
- **Custom cursor**: Replaces the OS cursor on `pointer: fine` devices. Uses `mix-blend-difference` with spring physics (`stiffness: 200, damping: 25, mass: 0.8`). Elements tagged `data-cursor="view"` (project and publication cards) expand it into an enlarged "View" label.
- **CV timeline**: Content descriptions are semicolon-separated strings in JSON — the `CVTimeline` component splits on `;` to render bullet points. **Never** use periods as separators (they collide with abbreviations like "K. Maddox").
- **Blog post prose**: Rendered via Markdoc through `prose prose-invert`. Inline images live in `public/images/posts/<slug>/`.

## Do's and Don'ts

- **Do** reserve the accent cyan (`#4EC5D4`) for a single emphasis per view — author names, hero punctuation, selection. Treat it like a signature, not a palette.
- **Do** use slow transitions: `duration-700` for standard interactions, `duration-1000` for publication cards, always with `ease-[cubic-bezier(0.32,0.72,0,1)]`.
- **Do** keep headings pure white with inline `style={{ color: "#ffffff" }}` — a Tailwind class alone can be overridden by the waveform background blending.
- **Do** pad pages with `px-8 md:px-16 lg:px-16` and let content reach the edges. The design is about scale, not centered columns.
- **Do** add `relative z-10` to homepage section headings so the fixed waveform animation doesn't obscure text.
- **Do** tag interactive cards with `data-cursor="view"` so the custom cursor morphs.
- **Don't** introduce a light theme or alternative palette — the system is dark-only and monochrome + one accent.
- **Don't** use box-shadows for elevation. Depth comes from contrast, blur, and motion, not drop shadows.
- **Don't** use `max-w` wrappers for content centering on top-level pages. Edge-to-edge padding is the layout rule.
- **Don't** mix font families. Inter is the only typeface; add weight or size for hierarchy instead.
- **Don't** use snappy transitions (`duration-150`, `duration-200`). The site's rhythm is cinematic — anything under 500ms feels wrong.
- **Don't** separate CV bullet content with periods in JSON — the splitter uses `;`.
- **Don't** put display headings in `max-w` containers that clip them. Massive type is the point.
