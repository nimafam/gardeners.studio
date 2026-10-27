# 02 — Foundation Architecture v01

> **Project:** AKORD
>
> **Version:** 1.0
>
> **Status:** Approved
>
> **Phase:** 1 — Foundation & Experience Engine
>
> **Applies To:**
>
> - apps/web
> - apps/admin (Future)
>
> **Depends On**
>
> - 00 — Project Vision
> - 01 — Frontend Architecture
>
> **Next Document**
>
> - 03 — Experience Engine

---

# Purpose

This document defines the **Foundation Layer** of the AKORD Frontend.

The Foundation is the lowest layer of the UI architecture.

It provides reusable primitives, design tokens, conventions and rules shared by every frontend application.

Foundation **must not contain business logic**.

Foundation **must not know anything about AKORD services, projects or pages.**

Everything above Foundation is built on top of it.

---

# Foundation Philosophy

Foundation exists to answer one question:

> "What can every frontend application reuse?"

Not

> "What does the Website need?"

This distinction is critical because the same Foundation will later be used by:

- Public Website
- Admin Panel
- Client Portal
- Future Applications

---

# Responsibilities

Foundation is responsible for

- Design Tokens
- Layout Rules
- Typography
- Colors
- Shadows
- Radius
- Spacing
- Motion Tokens
- Animation Tokens
- Responsive Rules
- UI Primitives

Foundation is NOT responsible for

- Business Logic
- CMS
- API
- Services
- Hero
- About
- Projects
- Website Sections

---

# Foundation Layer

```text
Foundation

↓

Tailwind Theme

↓

shadcn/ui

↓

Reusable Components

↓

Website Components

↓

Website Pages
```

Foundation never depends on upper layers.

Upper layers depend on Foundation.

---

# Architecture

```text
apps/web

components/

common/

layout/

motion/

sections/

ui/

webgl/

styles/

tokens/

providers/

hooks/

config/

lib/

types/
```

---

# Folder Responsibilities

## components/ui

Reusable UI primitives.

Examples

- Button
- Card
- Input
- Badge
- Avatar
- Dialog
- Sheet
- Popover
- Accordion
- Tabs

Rules

No business logic.

No API.

No page knowledge.

---

## components/layout

Responsible for layout only.

Examples

- PageContainer
- Grid
- Stack
- Header
- Footer
- Sidebar
- Navigation

---

## components/common

Small reusable components.

Examples

- Logo
- ThemeToggle
- Divider
- SectionTitle
- Icon
- Loader

---

## components/motion

Reusable motion components.

Examples

- FadeIn
- Reveal
- SplitText
- Stagger
- MagneticButton
- HoverCard
- ScrollReveal

These components never know anything about pages.

---

## components/webgl

Contains rendering logic.

Examples

Canvas

Scene

Lights

Particles

Connections

CameraRig

PostProcessing

These components never fetch data.

---

## components/sections

Contains business sections.

Examples

Hero

About

Services

Projects

CTA

Footer

Each section may consume:

UI

Layout

Motion

WebGL

But sections never become reusable primitives.

---

# Styling Strategy

AKORD uses

- Tailwind CSS
- shadcn/ui
- CSS Variables
- Design Tokens

Foundation is NOT CSS-first.

Foundation is Token-first.

---

# Design Tokens

Tokens are the single source of truth.

```text
Design Token

↓

CSS Variable

↓

Tailwind Theme

↓

Component
```

Never hardcode values inside components.

Incorrect

```tsx
className="rounded-[18px]"
```

Correct

```tsx
rounded-lg
```

where

```css
--radius-lg
```

defines the actual value.

---

# Token Categories

Current

- Colors
- Typography
- Radius
- Shadows
- Blur
- Grid
- Layout
- Breakpoints
- Spacing
- Opacity
- Motion
- Animation

Future

- Easings
- Durations
- Depth
- Elevation
- Z Index
- Transform
- Glass

---

# Tailwind Strategy

Tailwind is responsible for

- Utilities
- Layout
- Responsive
- Spacing
- Flex
- Grid

Tailwind must NOT replace Design Tokens.

Tailwind consumes Design Tokens.

---

# shadcn/ui Strategy

shadcn/ui provides

- Accessibility
- Component Logic
- Keyboard Support
- ARIA
- Headless Behavior

AKORD provides

- Visual Identity
- Theme
- Tokens
- Motion
- Branding

Never modify shadcn internals unless necessary.

Customize through composition.

---

# Naming Convention

Folders

lowercase

```
components/ui/button
```

Files

PascalCase

```
Button.tsx
```

Hooks

```
useScroll.ts

useMotion.ts
```

Providers

```
ThemeProvider.tsx

MotionProvider.tsx
```

Types

```
button.types.ts
```

---

# Component Rules

Every component must satisfy

Single Responsibility

Reusable

Composable

Accessible

Typed

Responsive

Animated only when meaningful

---

# Component Hierarchy

```text
UI

↓

Layout

↓

Motion

↓

WebGL

↓

Section

↓

Page
```

Never skip layers.

---

# Import Rules

Allowed

Section

↓

UI

Section

↓

Motion

Section

↓

WebGL

Forbidden

UI

↓

Section

Foundation

↓

Business

Motion

↓

API

---

# Providers

Current

ThemeProvider

Future

MotionProvider

ExperienceProvider

WebGLProvider

APIProvider

---

# State Management

Foundation owns

Theme

Reduced Motion

Viewport

Nothing else.

Business state belongs elsewhere.

---

# Icons

Primary

Vuesax Bulk

Secondary

Lucide (only when needed)

Icons should be wrapped.

Never use vendor icons directly across the project.

---

# Typography

Typography is driven by Design Tokens.

Never use arbitrary font sizes.

Heading scale

Display

H1

H2

H3

H4

Body

Caption

Label

---

# Color System

Semantic colors only.

Examples

Primary

Secondary

Success

Warning

Danger

Muted

Surface

Border

Avoid naming colors by appearance.

Bad

Green500

Good

Primary

---

# Motion Boundary

Foundation only defines motion tokens.

Foundation does NOT define page storytelling.

Examples

Allowed

Fade

Scale

Hover

Press

Focus

Forbidden

Hero Animation

Services Timeline

About Sequence

These belong to Experience Engine.

---

# Accessibility Rules

Every component must support

Keyboard

Focus

ARIA

Reduced Motion

Screen Readers

Contrast

Foundation never sacrifices accessibility for animation.

---

# Performance Rules

Avoid unnecessary wrappers.

Avoid deeply nested DOM.

Support lazy rendering.

Support tree shaking.

Support code splitting.

Keep UI primitives lightweight.

---

# Testing Guidelines

UI components should be testable independently.

Prefer deterministic behavior.

Avoid hidden side effects.

---

# Shared Foundation

Everything inside Foundation must be reusable by

- Website
- Admin
- Client Portal
- Future Products

If a component cannot be reused,

it does NOT belong in Foundation.

---

# Definition of Done

Foundation is complete when

✓ Every primitive exists

✓ Design Tokens are stable

✓ Tailwind consumes tokens

✓ shadcn is integrated

✓ Component rules are documented

✓ Folder structure is fixed

✓ Naming convention is fixed

✓ Import rules are fixed

✓ Providers are defined

✓ Accessibility rules are documented

✓ Performance rules are documented

---

# Approved Decisions

ADR-001

Foundation contains no business logic.

ADR-002

Tailwind consumes Design Tokens.

ADR-003

shadcn provides behavior.

AKORD provides appearance.

ADR-004

Business components never belong to Foundation.

ADR-005

Foundation is shared across every frontend application.

---

# End of Document