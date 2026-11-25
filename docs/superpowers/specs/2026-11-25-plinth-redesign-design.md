# PLINTH Frontend Redesign — Design Specification

**Date:** 2026-11-25  
**Scope:** Full frontend redesign of the PLINTH landing experience and `/app` dashboard shell while preserving 100% of existing backend APIs and workspace capabilities.  
**References:** [Rayon.design](https://rayon.design) (minimal cloud-native CAD & drafting studio UI), [React Bits](https://reactbits.dev) (kinetic typography, magnetic CTAs, spotlight hairline cards, dock navigation), Swiss architectural monographs.

---

## 1. Intent & Why

PLINTH is a final-year architectural AI platform spanning 11 live engineering and design modules backed by FastAPI. Currently, the frontend suffers from two issues:
1. **Generic "AI-slop" visual clichés on the landing page:** Repeated `rounded-[28px]` blurry `glass` / `glass-dark` overlays, gratuitous `filter: blur(...)` text reveals, and a stylistic split between the soft-rounded landing page and the sharp CAD-bordered `/app` dashboard.
2. **Passive scroll triggers:** `Cinematic.tsx` pins `/assets/cinematic.mp4` for `780%` viewport scroll, and `Platform.tsx` pins for `280%`, yet neither exposes clickable calls to action. Visitors must scroll through a long sequence before they can act on any featured capability.

The goal is a super-cool, tactile, unmistakably architectural frontend where **every scroll stage is immediately actionable**, the landing page and dashboard feel like **one unified CAD studio**, and **every backend call and dashboard feature stays intact**.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- Unify landing (`/`, `/login`) and dashboard (`/app/*`) under one cohesive **Swiss Architectural Drafting Studio** design system.
- Keep the GSAP `ScrollTrigger` + Lenis scrubbed video (`Cinematic.tsx`) intact, and upgrade every pinned stage and showcase section with **clickable scroll triggers** and strong, high-contrast CTAs.
- Integrate curated **React Bits** interactive primitives (`SplitText`, `DecryptedText`, `Magnet`, `ClickSpark`, `SpotlightCard`, `Dock`) tailored cleanly to an architectural aesthetic.
- Deep-link every landing-page CTA directly into its matching `/app/*` workspace (with `?next=` auth handoff through `/login`).
- Redesign the `/app` shell, navigation chrome, `Overview`, and shared UI primitives (`Panel`, `Metric`, `Status`, `ToolButton`) inspired by **Rayon.design** — low chrome, crisp `1px` drafting hairlines, sharp `2px` corners, canvas-first spacing — while keeping all 11 tool pages 100% functional.

### Non-Goals
- Modifying any Python code, database schema, or API endpoint in `backend/`.
- Removing or simplifying any feature inside `/app/projects`, `/app/floor-planner`, `/app/interior`, `/app/visualization`, `/app/site-analysis`, `/app/cost`, `/app/compliance`, `/app/collaboration`, `/app/documents`, or `/app/assistant`.
- Adding fake testimonials, fabricated customer logos, or unverified marketing metrics.

### Anti-Goals
- Purple/blue SaaS gradients, glowing ambient blobs, `rounded-[28px]` translucent glassmorphism cards, or passive scroll-jacking sections with dead-end text.

---

## 3. Constraints

- **Stack:** React 19, TanStack Router / Start, Tailwind CSS v4 (`src/styles.css`), GSAP + ScrollTrigger, Lenis, TypeScript.
- **Preserved Assets & Hooks:** `/assets/cinematic.mp4` and existing `/assets/*.jpg` plates remain in `public/assets/`; `src/lib/api.ts` (all endpoint signatures/hooks) and `src/hooks/use-api.ts` remain functionally unchanged.
- **Accessibility & Performance:** Respect `prefers-reduced-motion`, preserve keyboard navigation on interactive sliders/stage rails, and keep mobile viewports (`375px`) free of horizontal overflow.

---

## 4. Approaches Considered

| Approach | Visual & Interaction Model | Trade-offs | Decision |
| :--- | :--- | :--- | :--- |
| **Option A: Swiss Architectural Drafting Studio** | Warm archival paper (`#F7F5F0`), stark drafting ink (`#1F1E1C`), `1px` hairline CAD rules, sharp `2px` edges, `IBM Plex Mono` telemetry, Terracotta-Oxide (`#B84A27`) + Blueprint-Cobalt CTAs, Rayon-inspired low-chrome dashboard. | Bold contrast over video requires crisp scrims/badges on dark frames; avoids dark-mode-only SaaS clichés completely. | **Selected** |
| **Option B: Dark Precision Instrument** | Matte obsidian canvas (`#0E0F11`), exposed grid lines, `SpotlightCard` borders, luminous amber CTAs everywhere. | Looks sleek, but risks resembling generic dark AI dev-tools (Linear clones) rather than an architectural drafting studio. | Rejected |
| **Option C: Landing-Only Skin** | Restyle landing page only, leave `/app` untouched. | Leaves a jarring visual disconnect when clicking **Open PLINTH**. | Rejected |

---

## 5. Detailed Design Architecture

### 5.1 Unified Design Tokens (`src/styles.css`)
- **Surfaces:** `--paper: oklch(0.972 0.006 85)` (warm archival paper), `--limestone: oklch(0.942 0.007 84)` (secondary recessed drafting mat), `--card: oklch(0.99 0.003 85)`, `--ink: oklch(0.19 0.006 65)`.
- **Rhythmic Dark Contrast Bands (Builder Call):** `Cinematic.tsx`, `Platform.tsx`, `AIShowcase.tsx`, and `FutureVision.tsx` remain intentional dark architectural contrast bands (`bg-ink text-paper`) using sharp `1px` `border-paper/15` rules and a dark-surface `SpotlightCard` variant — alternating cleanly against the warm archival `--paper` sections and the `--paper` `/app` workspace.
- **Accents:** `--oxide: oklch(0.53 0.128 44)` (primary interactive CTA & live indicator), `--steel: oklch(0.49 0.085 242)` (blueprint/structural highlight), `--moss: oklch(0.5 0.075 148)` (passing compliance/verified status).
- **Geometry & Rules:** Strictly sharp `1px–2px` architectural corners across all cards, buttons, and panels (`--radius: 2px`), `1px solid var(--hairline)` section dividers, and **removal of `.glass` / `.glass-dark` blur-card classes** on landing components.
- **Typography:** `Inter` for tight geometric display headlines (`tracking-[-0.03em]`) and `IBM Plex Mono` for coordinate tags, floor numbers, FAR/area telemetry, and CAD status badges.

### 5.2 React Bits (`reactbits.dev`) Component Suite (`src/components/reactbits/`)
Implemented as lightweight, zero-bloat TypeScript + Tailwind components inside `src/components/reactbits/`:
1. **`SplitText.tsx`:** Crisp masked line/character reveal using CSS/GSAP transforms (no blurry fog fades) for architectural headlines.
2. **`DecryptedText.tsx`:** Technical character-scramble reveal triggered on view/hover for engineering metrics (`FAR 1.75`, `SLAB 230MM`, `445.9 SQM`).
3. **`Magnet.tsx` + `ClickSpark.tsx`:** Subtle magnetic pointer pull (`max 6–8px` displacement, disabled under `prefers-reduced-motion`) paired with crisp crosshair/ink spark feedback on click for primary **Open PLINTH** and scroll-trigger CTAs.
4. **`SpotlightCard.tsx`:** Tracks cursor position (`--mouse-x`, `--mouse-y`) to illuminate a razor-thin `1px` border and subtle surface sheen (supporting both `light` paper and `dark` ink surface variants) — used on `Platform`, `Modules`, and `Overview` KPI cards instead of heavy drop shadows or blur glass.
5. **`Dock.tsx`:** Smooth magnification dock rail used on scrolling `/app` pages (`Overview`, `Projects`, `Cost`, `Compliance`, `Documents`, `Collaboration`, `Visualization`, `Site Analysis`), with responsive guards described in Section 5.5.

### 5.3 Clickable Scroll-Trigger Architecture (Landing Page)

#### A. `Cinematic.tsx` — Scrubbed Video + Live Clickable Action HUD
- **Preserved Behavior:** `ScrollTrigger` pins `#top` (`end: "+=780%"`, `scrub: 1.2`) and smoothly interpolates `/assets/cinematic.mp4` (`target.current`) with Lenis.
- **New Interactive Layer (`pointer-events-auto` HUD):**
  - **Clickable Stage Rail (Right Edge):** Vertical numbered index (`01` Blueprint → `02` Floor Plate → `03` Structure → `04` Envelope → `05` Headquarters). Clicking any item smoothly scrolls (`window.scrollTo` mapped to that stage's normalized ScrollTrigger progress) directly to that video frame.
  - **Active Clickable Scroll-Trigger Card (Bottom-Left / Bottom-Right split):** Instead of passive floating captions, each stage displays its technical caption (`DecryptedText` spec readout + concise title) **paired with a high-contrast `Magnet` CTA button**:
    - `01 — Blueprint` (`at: 0.04`) → **Analyze a Plot →** (`/app/site-analysis`)
    - `02 — Floor Plate` (`at: 0.22`) → **Open Floor Planner →** (`/app/floor-planner`)
    - `03 — Structure` (`at: 0.42`) → **Run Compliance & Loads →** (`/app/compliance`)
    - `04 — Envelope` (`at: 0.60`) → **Launch 3D & Interiors →** (`/app/visualization`)
    - `05 — Headquarters` (`at: 0.76`) → **Inspect Live BOQ & Cost →** (`/app/cost`)
  - **Skip Sequence Control (Builder Call):** Top fixed `Nav` retains **Open PLINTH →** (direct studio entry), while `Cinematic.tsx` displays a compact **"Skip sequence ↓"** control at the bottom-center that scrolls past the `780%` pin directly to `#vision` so visitors can bypass the video at any time.
  - **Final Ecosystem Reveal (`progress >= 0.90`):** Every discipline pill in `ORBIT` becomes a clickable launch chip routing straight to its workspace (`/app/site-analysis`, `/app/floor-planner`, `/app/visualization`, `/app/interior`, `/app/cost`, `/app/compliance`), plus a primary **Enter PLINTH Studio →** CTA.

#### B. Clickable Feature Sections (`Platform.tsx`, `Modules.tsx`, `AIShowcase.tsx`, `Showcase3D.tsx`, `InteractiveArchitecture.tsx`, `Roles.tsx`)
- **`Platform.tsx` (Horizontal Pinned Track):** Each of the 4 steps (`01 Brief`, `02 Generate`, `03 Validate`, `04 Issue`) renders as a dark-variant `SpotlightCard` drafting sheet with a direct **"Open Stage →"** button linking to `/app/site-analysis`, `/app/floor-planner`, `/app/compliance`, and `/app/documents`.
- **`AIShowcase.tsx` (Builder Call — Pre-fill Only):** Interactive prompt selector adds a **"Test in Live AI Assistant →"** button on the active output card that routes to `/app/assistant?prompt=<encoded>`. `app.assistant.tsx` reads `?prompt=` to **pre-fill and focus the composer input** (without auto-submitting) so users can verify the selected room once async project/floor queries resolve.
- **`Modules.tsx` & `ModuleIndex.tsx`:** Each capability chapter and all 13 indexed modules become clickable links directly into their corresponding `/app/*` workspace.
- **`Showcase3D.tsx` & `InteractiveArchitecture.tsx`:** Structure-to-finish comparison slider (`InteractiveArchitecture`) and 3D plates (`Showcase3D`) include direct **"Inspect in 3D Studio →"** (`/app/visualization`) and **"Open Interior Studio →"** (`/app/interior`) triggers.
- **`Roles.tsx` (Builder Call — 9-Role Alignment):** Clicking any role node in the SVG discipline graph highlights its dependencies and shows a **"Preview Workspace as {Role} →"** button that saves the normalized role ID to `plinth_user_role` and calls `openPlinthTarget("/app")`.

### 5.4 Smart Auth Deep-Linking & Role Normalization (`src/lib/auth-nav.ts`, `src/routes/login.tsx`, `src/lib/api.ts`)
- Centralize navigation in `openPlinthTarget(targetPath: string, navigate?)`:
  - If `getToken()` exists, navigate directly to `targetPath` (e.g., `/app/floor-planner`).
  - Otherwise, navigate to `/login?next=${encodeURIComponent(targetPath)}`.
- **`src/lib/api.ts` 401 Handling (Builder Call):** Preserve all API endpoints, request shapes, and hooks unchanged; update only the `401` redirect guard in `apiFetch` / `apiUpload` so that when `window.location.pathname !== "/login"`, it redirects to `/login?next=${encodeURIComponent(window.location.pathname + window.location.search)}` (preventing lost deep-links on expired tokens and avoiding reload loops on invalid login attempts).
- **Update `src/routes/login.tsx`:**
  - Read `next` query parameter (sanitized so only internal `/app*` paths are accepted, defaulting to `/app`).
  - Redirect to `next` after manual sign-in, account creation, or **Instant Demo Access**.
  - Restyle `/login` with an architectural blueprint grid background, crisp `2px` drafting card, and quick-fill demo account switcher (`Architect`, `Structural`, `Interior`, `Client`, `Admin` matching `backend/seed.py`).

### 5.5 Dashboard Shell & Workspace Polish (`src/routes/app.tsx`, `ui.tsx`, `app.index.tsx`)
Inspired by **Rayon.design**:
- **Top Studio Bar (`48px`, `1px` bottom rule):**
  - PLINTH geometric mark + **read-only live project badge** (`PRJ-001 · The Glass Pavilion · Bengaluru`, Builder Call) linking directly to `/app/projects` so all 11 sub-routes keep their existing data-fetching hooks completely untouched.
  - **All-9-Role Perspective Switcher (Builder Call):** Expand `ROLES_LIST` in `app.tsx` to cover all 9 roles from `Roles.tsx` (`super_admin`, `project_admin`, `client`, `architect`, `interior`, `builder`, `structural`, `site`, `vendor`) with alias normalization (`super-admin`, `structural_engineer`, `interior_designer`). Switching roles highlights the relevant sidebar items without resetting data.
  - Direct **"Exhibition ↗"** link back to `/` and sign-out control.
- **Slim Architectural Sidebar + Context-Aware Quick-Dock (Builder Call):**
  - Left rail (`220px` desktop, slide-over mobile drawer) grouped cleanly (`Studio`, `Design`, `Delivery`, `Intelligence`) with `IBM Plex Mono` index codes (`00`–`10`) and an oxide active edge marker.
  - Floating bottom `Dock` (`hidden md:flex`) renders on scrolling dashboard pages (`Overview`, `Projects`, `Cost`, `Compliance`, `Documents`, `Collaboration`, `Visualization`, `Site Analysis`) with bottom padding reserved in `<main>`, and is **automatically hidden on full-viewport locked-height canvas routes** (`/app/floor-planner`, `/app/interior`, `/app/assistant`) so it never overlaps CAD controls or the AI chat composer (`375px` mobile uses the slide-over drawer).
- **Workspace Primitives (`ui.tsx`) & Overview (`app.index.tsx`):**
  - Upgrade `Panel`, `Metric`, `Status`, and `ToolButton` with `SpotlightCard` subtle border hover, crisp tabular mono metrics, and `DecryptedText` accents on hero KPIs.
  - Keep all 11 sub-routes (`app.floor-planner.tsx`, `app.cost.tsx`, `app.compliance.tsx`, `app.site-analysis.tsx`, `app.interior.tsx`, `app.visualization.tsx`, `app.documents.tsx`, `app.collaboration.tsx`, `app.projects.tsx`, `app.assistant.tsx`) 100% functional with unified tokens.

---

## 6. Implementation Boundaries (Left to the Builder Plan)
- Exact CSS class migration across `src/components/plinth/*` and `src/routes/app*.tsx`.
- Ensuring `ScrollTrigger.refresh()` recalculates pin offsets cleanly after layout changes and font loading.
- Verifying `?prompt=` pre-fill handling in `src/routes/app.assistant.tsx` and `?next=` redirect validation in `src/routes/login.tsx`.
- End-to-end verification in a live browser (`http://localhost:8081`) at desktop (`1440px`) and mobile (`375px`): clicking scroll-trigger CTAs mid-scroll on `/`, completing demo auth redirect to `/app/floor-planner`, and exercising `/app` navigation and backend API data loading.
