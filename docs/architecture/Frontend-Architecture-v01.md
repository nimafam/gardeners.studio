# AKORD Frontend Architecture v01

> Status: Approved
>
> Purpose: This document is the architectural source of truth for the
> AKORD public website. It should be treated as a long-term project
> resource.

------------------------------------------------------------------------

# 1. Vision

AKORD is built as a Headless CMS platform with a decoupled frontend.

-   `apps/api` is the single source of truth.
-   `apps/web` is the public website.
-   `apps/admin` will be added later and will consume the same API.
-   No frontend communicates directly with the database.

------------------------------------------------------------------------

# 2. Monorepo Architecture

``` text
AKORD
├── apps
│   ├── api
│   ├── web
│   └── admin (future)
├── packages
│   ├── eslint-config
│   ├── typescript-config
│   └── future shared packages
```

------------------------------------------------------------------------

# 3. Technology Stack

-   Next.js (App Router)
-   React 19
-   TypeScript
-   Tailwind CSS
-   shadcn/ui
-   GSAP
-   React Three Fiber (Three.js)
-   Lenis
-   Headless CMS (NestJS + Prisma)

------------------------------------------------------------------------

# 4. Responsibilities

## apps/api

-   Authentication
-   RBAC
-   Prisma
-   Content
-   Media
-   Pages
-   Services
-   Projects
-   SEO
-   Public API
-   Admin API

## apps/web

-   UI / UX
-   Design System
-   Motion
-   WebGL
-   Routing
-   SEO Rendering
-   API Consumption

## apps/admin (Future)

-   Dashboard
-   Content Management
-   Uses the same API as apps/web

------------------------------------------------------------------------

# 5. Design System

Foundation is shared between Web and future Admin.

Current token structure remains intact.

``` text
styles/
└── tokens/
    colors.css
    spacing.css
    typography.css
    radius.css
    shadows.css
    opacity.css
    breakpoints.css
    grid.css
    layout.css
    blur.css
    motions.css
    animations.css
```

Future additions may include:

-   easings
-   durations
-   depth
-   z-index
-   transforms

------------------------------------------------------------------------

# 6. Tailwind Strategy

Design Tokens → CSS Variables → Tailwind Theme → shadcn/ui → Components

Foundation is not replaced by Tailwind. Tailwind consumes the
Foundation.

------------------------------------------------------------------------

# 7. Component Layers

``` text
components/
├── common
├── layout
├── sections
├── ui
├── motion
└── webgl
```

Rules:

-   ui = reusable primitives
-   sections = business sections
-   motion = reusable interaction layer
-   webgl = rendering layer

------------------------------------------------------------------------

# 8. Motion Architecture

Layer 1 - Tailwind transitions

Layer 2 - Motion (Framer Motion)

Layer 3 - GSAP - ScrollTrigger

Layer 4 - React Three Fiber

Reduced Motion support is mandatory.

------------------------------------------------------------------------

# 9. WebGL Architecture

Decision: Option B (Approved)

Single persistent canvas for the entire Home page.

Sections update the active scene instead of creating new canvases.

Benefits:

-   Better transitions
-   Lower memory usage
-   Shared camera
-   Shared lighting
-   Unified experience

------------------------------------------------------------------------

# 10. Data Flow

``` text
CMS
    ↓
Public API
    ↓
Server Components
    ↓
View Models
    ↓
React Components
```

No direct database access from frontend.

------------------------------------------------------------------------

# 11. Rendering

Server Components by default.

Client Components only when interaction is required.

Heavy experiences should use lazy loading and dynamic imports.

------------------------------------------------------------------------

# 12. Accessibility

-   Keyboard navigation
-   Screen reader support
-   Visible focus
-   Reduced Motion
-   Semantic HTML
-   WCAG-compliant contrast

------------------------------------------------------------------------

# 13. Performance

Performance is considered a feature.

Targets:

-   Stable layout
-   Lazy assets
-   Optimized bundles
-   Controlled WebGL budget
-   Smooth animation without blocking content

------------------------------------------------------------------------

# 14. Development Roadmap

Phase 0 - Frontend Architecture

Phase 1 - Foundation - Experience Engine

Phase 2 - Home

Phase 3 - About

Phase 4 - Services

Phase 5 - Work

Phase 6 - Contact

------------------------------------------------------------------------

# 15. Project Rules

-   Preserve Foundation.
-   API is the single source of truth.
-   Admin and Web share the Design System.
-   Motion supports content, never replaces it.
-   WebGL remains an experience layer, not a dependency for content.
-   Business logic stays out of Foundation.
-   Build reusable, scalable components.

------------------------------------------------------------------------

# Resource Status

This document is the official architectural reference for the AKORD
Frontend and should be used as the baseline for future implementation,
reviews, and AI-assisted development.
