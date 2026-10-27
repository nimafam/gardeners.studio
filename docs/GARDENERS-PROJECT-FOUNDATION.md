# Gardeners — Project Foundation

Status: initial audit based on the local `gardeners.fig` export and the copied Akord codebase.

## Project summary

Gardeners is a new content-led brand website. The supplied Figma export contains coordinated desktop and mobile compositions, with a strong editorial visual language, high-contrast green accents, image-led content, and repeated card/list patterns.

The current repository is not a clean starter. It is a Turborepo/Next.js application copied from Akord and still contains Akord-specific metadata, routes, content, motion orchestration, WebGL runtime code, debugging tools, and a very large project-media library.

The correct starting point is therefore to preserve the stable platform foundation while replacing the product layer.

## Proposed sitemap

This sitemap is provisional until the Figma file is available through a node-specific Figma link, which will expose exact frame and component names.

```text
/
├── Home
├── About
├── Services
│   └── Service detail [slug]
├── Projects / Work
│   └── Project detail [slug]
├── Insights / Journal
│   └── Article detail [slug]
└── Contact

System routes
├── Privacy
├── Terms
└── 404
```

Expected application routes:

```text
app/
├── page.tsx
├── about/page.tsx
├── services/page.tsx
├── services/[slug]/page.tsx
├── projects/page.tsx
├── projects/[slug]/page.tsx
├── insights/page.tsx
├── insights/[slug]/page.tsx
├── contact/page.tsx
├── privacy/page.tsx
├── terms/page.tsx
└── not-found.tsx
```

## What to keep from the copied project

- Turborepo and pnpm workspace structure
- Next.js App Router, React, and TypeScript foundation
- Tailwind CSS v4 pipeline
- ESLint, Prettier, and shared TypeScript configuration
- `components/ui`, `components/common`, and motion primitives only after component-by-component review
- The token-file organization as a pattern, after replacing every Akord value
- `lib/utils.ts` if its utilities remain generic

## What to remove or quarantine

- All Akord metadata, naming, wordmarks, copy, and project data
- `components/experience`, providers, managers, runtime, WebGL components, and experience-specific hooks/types unless a Figma interaction explicitly requires them
- Akord-specific sections: Hero, About, Services, Work, and Contact code implementations; Gardeners project media referenced by the old Work implementation must remain preserved
- Debug and styleguide routes after the new Gardeners foundations are verified
- Akord-only code references and copy around project media; the media itself represents Gardeners work and must remain preserved
- Generated and local-only artifacts such as `.next`, `*.tsbuildinfo`, and `apps/web/web.zip`
- Stale Akord architecture and handoff documents, after any reusable decisions are extracted

No project media may be deleted under `public/work`; this directory is the protected canonical source for Gardeners projects. The sole cleanup exception inside `public` is Akord-specific brand material in `public/brand`, which may be replaced with Gardeners branding. The redundant `public/work.rar` archive is user-managed and must be ignored by automated cleanup.

## Design system build order

### 1. Foundations

- Brand colors and semantic colors
- Typography families, weights, sizes, line heights, and letter spacing
- Spacing scale
- Responsive breakpoints and content/container widths
- Grid and gutters
- Radius, border, shadow, opacity, and layering
- Motion duration and easing tokens
- Image aspect ratios

### 2. Primitives

- Container and Section
- Stack, Cluster, and Grid layout helpers
- Text, Heading, and RichText
- Link, Button, IconButton, and Tag
- Image/Media wrapper
- Divider and decorative brand marks

### 3. Reusable components

- Header, navigation, mobile menu, and footer
- Page hero and section heading
- Project card and project grid
- Service card/list item
- Article card and metadata row
- CTA/banner
- Contact form fields and validation states
- Pagination or load-more controls if present in the final Figma structure

### 4. Layout templates

- Marketing/default layout
- Listing layout
- Editorial/detail layout
- Project case-study layout
- Legal/content layout

### 5. Pages

Implement in dependency order: Home shell, shared listings, shared detail template, individual pages, then responsive and interaction polish.

## Recommended source structure

```text
apps/web/
├── app/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── navigation/
│   ├── cards/
│   ├── forms/
│   └── sections/
├── content/
├── lib/
├── styles/
│   └── tokens/
├── types/
└── public/
    ├── brand/
    ├── images/
    ├── icons/
    └── fonts/
```

## Implementation phases and gates

1. **Inventory and cleanup plan** — produce an explicit keep/remove/migrate manifest; no visual implementation yet.
2. **Repository reset** — remove Akord product code, rename package/app metadata, and leave a compiling minimal shell.
3. **Design foundations** — map Figma variables and styles into tokens; verify them in a temporary internal foundation page.
4. **Component system** — build and verify primitives and shared components across desktop/mobile states.
5. **Layout system** — implement header, footer, containers, grids, and reusable page templates.
6. **Feature/page delivery** — implement routes in dependency order and connect real content.
7. **Quality pass** — accessibility, responsive parity, reduced motion, performance, metadata, and production build.

Each phase should end with lint, type checking, a production build, and visual comparison against Figma.

## Decisions required before page implementation

- Final exact route names and whether Services, Projects, and Insights each have detail pages
- Content source: local typed content, MDX, headless CMS, or an API
- Final font files and licensing
- Whether any Akord-style WebGL/scroll choreography is intentionally retained
- Supported locales and text direction
- Hosting and image-delivery strategy
