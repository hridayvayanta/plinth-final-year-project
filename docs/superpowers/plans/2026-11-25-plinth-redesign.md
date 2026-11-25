# PLINTH Frontend Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the PLINTH landing experience, `/login`, and `/app` dashboard shell into a unified Swiss Architectural Drafting Studio (inspired by Rayon.design & React Bits) with clickable scroll triggers while keeping the FastAPI backend and all 11 dashboard workspaces 100% functional.

**Architecture:** Extract pure deep-link, role-normalization, and stage-scroll math into unit-tested helpers; build lightweight self-contained React Bits components (`SplitText`, `DecryptedText`, `Magnet`, `ClickSpark`, `SpotlightCard`, `Dock`); replace passive glassmorphism landing sections with hairline CAD frames and clickable deep-link CTAs; and unify `/login` and `/app` around shared archival paper & oxide tokens with context-aware Dock placement.

**Tech Stack:** React 19, TypeScript (`exactOptionalPropertyTypes: true`), TanStack Router / Start, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis, Node 24 native test runner (`node --test`), Vite 8.

**Spec:** `docs/superpowers/specs/2026-11-25-plinth-redesign-design.md`

## Global Constraints

- **Zero backend edits:** Never modify any file under `backend/`.
- **Preserve all 11 `/app/*` workspace features:** Keep existing `src/hooks/use-api.ts` hooks, endpoint contracts in `src/lib/api.ts`, and functional workflows intact across all routes.
- **No AI-slop styling:** Remove `.glass` / `.glass-dark` blurry overlays, `rounded-[28px]` cards, and generic blur-fade spam; enforce sharp `1px–2px` corners (`--radius: 2px`) and `1px` hairline borders.
- **Strict TypeScript compliance:** Pass `npx tsc --noEmit` (respecting `exactOptionalPropertyTypes: true` and `noUncheckedIndexedAccess` index checks).
- **Accessibility & Multi-viewport:** Respect `prefers-reduced-motion`, preserve keyboard support, and prevent horizontal overflow at `1440px` and `375px`.

## Review Focus

1. **Open-redirect / invalid `?next=` on `/login`:** External URLs (`https://evil.com`), protocol-relative (`//evil.com`), or non-app paths passed in `?next=` must fall back strictly to `/app`.
2. **401 reload loop on `/login`:** Submitting wrong credentials on `/login` returns HTTP 401; `apiFetch` / `apiUpload` must NOT reload `/login` or overwrite the inline login error message.
3. **Unrecognized or hyphenated role IDs (`super-admin`, `structural_engineer`, `vendor`):** Role IDs passed from `Roles.tsx` (`super-admin`) or `backend/seed.py` (`SUPER_ADMIN`, `STRUCTURAL_ENGINEER`, `INTERIOR_DESIGNER`) must normalize cleanly to one of the 9 perspective entries in `app.tsx` without silently falling back to `architect`.
4. **Full-viewport canvas overlap with `Dock` & mobile width:** `/app/floor-planner`, `/app/interior`, and `/app/assistant` lock to `h-[calc(100vh-3rem)]` with bottom toolbars/inputs — `Dock` must auto-hide on those routes and on `<768px` viewports.
5. **Pre-fill safety on `/app/assistant?prompt=...`:** Landing from `AIShowcase` must pre-fill and focus the textarea once without auto-submitting while `useProjects()` / `useFloors()` are still loading, and without re-overwriting user edits on re-render.

---

### Task 1: Auth Deep-Linking, Role Normalization & 401 Redirect Guard

**Files:**
- Create: `src/lib/auth-nav.ts`
- Create: `src/lib/__tests__/auth-nav.test.ts`
- Modify: `src/lib/api.ts:48-100`

**Interfaces:**
- Consumes: `getToken` from `src/lib/api.ts`
- Produces:
  - `sanitizeNextPath(raw: string | null | undefined): string`
  - `normalizeRoleId(raw: string | null | undefined): StudioRoleId`
  - `buildLoginUrl(targetPath: string): string`
  - `openPlinthTarget(targetPath: string): void`
  - `STUDIO_ROLE_IDS`: `'architect' | 'project_admin' | 'super_admin' | 'client' | 'interior' | 'builder' | 'structural' | 'site' | 'vendor'`

- [ ] **Step 1: Write failing unit tests for `auth-nav` helpers**

Create `src/lib/__tests__/auth-nav.test.ts` testing:
- `sanitizeNextPath("/app/floor-planner")` → `"/app/floor-planner"`
- `sanitizeNextPath("/app/assistant?prompt=hello")` → `"/app/assistant?prompt=hello"`
- `sanitizeNextPath("https://evil.com")` / `"//evil.com"` / `"/login"` / `null` → `"/app"`
- `normalizeRoleId("super-admin")` / `"SUPER_ADMIN"` → `"super_admin"`
- `normalizeRoleId("structural_engineer")` → `"structural"`
- `normalizeRoleId("interior_designer")` → `"interior"`
- `normalizeRoleId("unknown")` → `"architect"`
- `buildLoginUrl("/app/cost")` → `"/login?next=%2Fapp%2Fcost"`

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test src/lib/__tests__/auth-nav.test.ts`  
Expected: FAIL (`Cannot find module '../auth-nav.ts'`)

- [ ] **Step 3: Implement `src/lib/auth-nav.ts`**

Create `src/lib/auth-nav.ts` implementing `sanitizeNextPath`, `normalizeRoleId`, `buildLoginUrl`, and `openPlinthTarget(targetPath: string)` (using `getToken()` to navigate directly to `sanitizeNextPath(targetPath)` when authenticated, or `buildLoginUrl(targetPath)` when unauthenticated).

- [ ] **Step 4: Update `src/lib/api.ts` 401 redirect guards**

In `apiFetch` (`src/lib/api.ts:59-63`) and `apiUpload` (`src/lib/api.ts:84-88`), only redirect when `typeof window !== "undefined" && window.location.pathname !== "/login"`, using `buildLoginUrl(window.location.pathname + window.location.search)` so expired sessions preserve deep links and invalid logins on `/login` surface the error cleanly.

- [ ] **Step 5: Run unit tests to verify pass**

Run: `node --test src/lib/__tests__/auth-nav.test.ts`  
Expected: PASS (all cases passing).

---

### Task 2: Unified Swiss Drafting Studio Tokens & React Bits Primitives

**Files:**
- Modify: `src/styles.css:78-337`
- Create: `src/components/reactbits/SplitText.tsx`
- Create: `src/components/reactbits/DecryptedText.tsx`
- Create: `src/components/reactbits/Magnet.tsx`
- Create: `src/components/reactbits/ClickSpark.tsx`
- Create: `src/components/reactbits/SpotlightCard.tsx`
- Create: `src/components/reactbits/Dock.tsx`
- Create: `src/components/reactbits/index.ts`

**Interfaces:**
- Produces:
  - `SplitText({ text, className, delayMs?, as? })`
  - `DecryptedText({ text, className, trigger?: 'mount' | 'hover' | 'view', speedMs? })`
  - `Magnet({ children, strength?, className? })`
  - `ClickSpark({ children, sparkColor?, className? })`
  - `SpotlightCard({ children, variant?: 'light' | 'dark', className?, onClick? })`
  - `Dock({ items: DockItem[], className? })` where `DockItem = { id: string; label: string; code: string; active?: boolean; onClick: () => void }`

- [ ] **Step 1: Update `src/styles.css` tokens & CAD utility classes**

Refine `:root` surface/accent tokens (`--paper`, `--limestone`, `--ink`, `--oxide`, `--steel`, `--moss`, `--hairline`), ensure `--radius: 2px`, replace `.glass` / `.glass-dark` blur utilities with crisp `.cad-surface` and `.cad-surface-dark` hairline-bordered surfaces (keeping `.reveal` crisp opacity/translate without `blur(14px)`), and add `prefers-reduced-motion` guards.

- [ ] **Step 2: Create `SplitText.tsx` and `DecryptedText.tsx`**

Implement crisp masked staggered word/character reveal (`SplitText`) and technical monospace scramble-to-value animation (`DecryptedText`), both honoring `window.matchMedia("(prefers-reduced-motion: reduce)")` and cleaning up timers/observers on unmount.

- [ ] **Step 3: Create `Magnet.tsx` and `ClickSpark.tsx`**

Implement pointer-tracking magnetic offset (`max 7px` pull, smooth spring reset on pointer leave) in `Magnet.tsx` and lightweight canvas/DOM ink-crosshair burst on click in `ClickSpark.tsx` (disabled when reduced motion is preferred).

- [ ] **Step 4: Create `SpotlightCard.tsx` and `Dock.tsx`**

Implement `SpotlightCard.tsx` tracking cursor coordinates via CSS custom properties (`--mx`, `--my`) with `"light"` (paper/oxide border sheen) and `"dark"` (ink/paper hairline sheen) variants. Implement `Dock.tsx` rendering sharp `2px` architectural tool tiles with smooth hover scale & mono code tooltip.

- [ ] **Step 5: Export barrel `src/components/reactbits/index.ts` and verify build**

Run: `npm run build`  
Expected: PASS with zero CSS/TS compilation errors.

---

### Task 3: Clickable Scroll-Trigger Hero (`Cinematic.tsx`) & Stage Navigation

**Files:**
- Create: `src/components/plinth/cinematic-stages.ts`
- Create: `src/components/plinth/__tests__/cinematic-stages.test.ts`
- Modify: `src/components/plinth/Cinematic.tsx:1-306`

**Interfaces:**
- Consumes: `openPlinthTarget` (`src/lib/auth-nav.ts`), `DecryptedText`, `Magnet`, `ClickSpark`, `SplitText` (`src/components/reactbits`)
- Produces:
  - `CINEMATIC_STAGES`: array of 5 stages (`id`, `at`, `end`, `label`, `spec`, `line`, `cta`, `to`)
  - `getActiveStageIndex(progress: number): number`
  - `computeStageScrollY(scrollStart: number, scrollEnd: number, stageAt: number): number`

- [ ] **Step 1: Write failing unit tests for `cinematic-stages.ts`**

Create `src/components/plinth/__tests__/cinematic-stages.test.ts` testing:
- All 5 stages (`01` Blueprint → `/app/site-analysis`, `02` Floor Plate → `/app/floor-planner`, `03` Structure → `/app/compliance`, `04` Envelope → `/app/visualization`, `05` Headquarters → `/app/cost`).
- `getActiveStageIndex(0.05)` → `0`, `getActiveStageIndex(0.25)` → `1`, `getActiveStageIndex(0.45)` → `2`, `getActiveStageIndex(0.62)` → `3`, `getActiveStageIndex(0.80)` → `4`.
- `computeStageScrollY(0, 7800, 0.22)` → `1716` (clamped safely to `[scrollStart, scrollEnd]`).

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test src/components/plinth/__tests__/cinematic-stages.test.ts`  
Expected: FAIL (`Cannot find module '../cinematic-stages.ts'`)

- [ ] **Step 3: Implement `src/components/plinth/cinematic-stages.ts`**

Define `CINEMATIC_STAGES`, `ORBIT_LINKS` (all 6 discipline chips mapped to real `/app/*` routes), `getActiveStageIndex`, and `computeStageScrollY`.

- [ ] **Step 4: Redesign `src/components/plinth/Cinematic.tsx` with clickable scroll triggers**

Preserve the GSAP `ScrollTrigger` (`end: "+=780%"`, `pin: true`, `scrub: 1.2`) and `/assets/cinematic.mp4` RAF interpolation; store the `ScrollTrigger` instance ref so clicking any node in the new **Right-Edge Stage Rail (`01–05`)** smoothly scrolls to `computeStageScrollY(st.start, st.end, stage.at + 0.02)`. Replace passive `pointer-events-none` captions with an interactive bottom HUD displaying the active stage's `DecryptedText` spec tag + high-contrast Oxide `Magnet`+`ClickSpark` CTA button (`openPlinthTarget(activeStage.to)`). Add a subtle bottom-center **"Skip sequence ↓"** anchor scrolling to `#vision`, and turn the final `data-enter` (`progress >= 0.90`) `ORBIT` badges into clickable launch buttons plus a primary **Enter PLINTH Studio →** CTA. Remove `rounded-[28px]` / `glass` / blur-filter spam.

- [ ] **Step 5: Run unit tests to verify pass**

Run: `node --test src/components/plinth/__tests__/cinematic-stages.test.ts`  
Expected: PASS.

---

### Task 4: Clickable Feature Sections, Discipline Graph & Landing Polish

**Files:**
- Modify: `src/components/plinth/data.ts:1-144`
- Modify: `src/components/plinth/Nav.tsx`
- Modify: `src/components/plinth/Loader.tsx`
- Modify: `src/components/plinth/Vision.tsx`
- Modify: `src/components/plinth/Story.tsx`
- Modify: `src/components/plinth/Platform.tsx`
- Modify: `src/components/plinth/Roles.tsx`
- Modify: `src/components/plinth/Modules.tsx`
- Modify: `src/components/plinth/ModuleIndex.tsx`
- Modify: `src/components/plinth/AIShowcase.tsx`
- Modify: `src/components/plinth/Showcase3D.tsx`
- Modify: `src/components/plinth/InteractiveArchitecture.tsx`
- Modify: `src/components/plinth/Technology.tsx`
- Modify: `src/components/plinth/FutureVision.tsx`
- Modify: `src/components/plinth/Footer.tsx`

**Interfaces:**
- Consumes: `openPlinthTarget`, `normalizeRoleId` (`src/lib/auth-nav.ts`), React Bits primitives (`src/components/reactbits`)

- [ ] **Step 1: Add target workspace routes & normalized role IDs to `src/components/plinth/data.ts`**

Add `to: string` to `CHAPTERS` and `MODULES` entries (mapping every chapter and all 13 modules to its exact `/app/*` workspace) and `appRoleId` (`normalizeRoleId` compatible) to `ROLES`.

- [ ] **Step 2: Upgrade `Nav.tsx`, `Loader.tsx`, `Vision.tsx`, `Story.tsx`, and `Technology.tsx`**

Replace blurry `rounded-[28px]` / `glass` boxes with sharp `2px` architectural frames, `1px` hairlines, `SplitText` / `DecryptedText` headers, and `Magnet`+`ClickSpark` **Open PLINTH →** CTA in `Nav.tsx` (using `openPlinthTarget("/app")`). Add a direct **"Open Site & Structural Model →"** CTA inside `Vision.tsx`'s frame caption.

- [ ] **Step 3: Upgrade dark contrast bands (`Platform.tsx`, `AIShowcase.tsx`, `FutureVision.tsx`)**

Keep `bg-ink text-paper` dark contrast aesthetic while removing `.glass-dark` and `rounded-[28px]`:
- `Platform.tsx`: Convert the 4 horizontal pinned steps (`Brief`, `Generate`, `Validate`, `Issue`) into dark-variant `SpotlightCard` drafting plates, each with a clickable **"Open Stage →"** button (`openPlinthTarget`).
- `AIShowcase.tsx`: Add **"Test in Live AI Assistant →"** button on the active output card calling `openPlinthTarget("/app/assistant?prompt=" + encodeURIComponent(PROMPTS[i].q))`.
- `FutureVision.tsx`: Upgrade **Open PLINTH** CTA with `Magnet` + `ClickSpark` and crisp `2px` button geometry.

- [ ] **Step 4: Upgrade interactive & catalog sections (`Roles.tsx`, `Modules.tsx`, `ModuleIndex.tsx`, `Showcase3D.tsx`, `InteractiveArchitecture.tsx`, `Footer.tsx`)**

- `Roles.tsx`: Clicking/hovering any node selects it cleanly and displays **"Preview Workspace as {role.name} →"** button saving `localStorage.setItem("plinth_user_role", normalizeRoleId(role.id))` and calling `openPlinthTarget("/app")`.
- `Modules.tsx` & `ModuleIndex.tsx`: Make every movement row and all 13 `SpotlightCard` module tiles clickable (`openPlinthTarget(m.to)`).
- `Showcase3D.tsx` & `InteractiveArchitecture.tsx`: Replace `rounded-[26px]`/`rounded-[28px]`/`glass` plates with sharp `2px` architectural frames and add clickable **"Inspect in 3D Studio →"** (`/app/visualization`) & **"Open Interior Studio →"** (`/app/interior`) CTAs.
- `Footer.tsx`: Replace rounded pill button with crisp sharp `Magnet` CTA.

- [ ] **Step 5: Verify build compiles cleanly**

Run: `npm run build`  
Expected: PASS.

---

### Task 5: Redesigned Login Deep-Link Handoff & AI Assistant Pre-Fill

**Files:**
- Modify: `src/routes/login.tsx:1-205`
- Modify: `src/routes/app.assistant.tsx:104-200`

**Interfaces:**
- Consumes: `sanitizeNextPath`, `normalizeRoleId` (`src/lib/auth-nav.ts`)

- [ ] **Step 1: Upgrade `src/routes/login.tsx` with `?next=` redirect & Swiss Drafting aesthetic**

Read `?next=` from `window.location.search` via `sanitizeNextPath(...)`, redirect to that exact path after manual sign-in, signup, or **Instant Demo Access**, and display a subtle badge when deep-linking (e.g., `"Continuing to Floor Planner after sign-in"`). Restyle the page on `--paper` with `.grid-paper`, a crisp `2px` CAD card, and 5 quick-fill role buttons (`Architect`, `Structural`, `Interior`, `Client`, `Admin` matching `backend/seed.py` emails and updating `plinth_user_role` cleanly unless a preview role was explicitly chosen).

- [ ] **Step 2: Add `?prompt=` pre-fill handling to `src/routes/app.assistant.tsx`**

On mount (using a `useRef` guard so it runs once per query param and never overwrites user typing), read `new URLSearchParams(window.location.search).get("prompt")`. If present and non-empty, call `setInput(promptParam)` and focus `textareaRef.current` without auto-submitting so async `useProjects()` / `useFloors()` settle safely.

- [ ] **Step 3: Verify build compiles cleanly**

Run: `npm run build`  
Expected: PASS.

---

### Task 6: Rayon-Inspired Dashboard Shell (`app.tsx`), UI Primitives (`ui.tsx`), Overview (`app.index.tsx`) & Full Verification

**Files:**
- Modify: `src/routes/app.tsx:1-206`
- Modify: `src/components/plinth/dashboard/ui.tsx:1-141`
- Modify: `src/routes/app.index.tsx:1-249`

**Interfaces:**
- Consumes: `normalizeRoleId` (`src/lib/auth-nav.ts`), `SpotlightCard`, `DecryptedText`, `Dock` (`src/components/reactbits`)

- [ ] **Step 1: Redesign `src/routes/app.tsx` studio shell**

- Expand `ROLES_LIST` to all 9 architectural disciplines (`architect`, `project_admin`, `super_admin`, `client`, `interior`, `builder`, `structural`, `site`, `vendor`) with recommended `focus` arrays for each, initializing `activeRole` via `normalizeRoleId(...)` (preserving `localStorage` preview role over backend role until changed).
- Upgrade the `48px` top studio bar: PLINTH geometric mark, read-only live project badge linking to `/app/projects`, cleaner discipline role selector, **"Exhibition ↗"** link to `/`, and sign-out button.
- Refine the `220px` sidebar with mono index codes (`00`–`10`) and oxide active indicator.
- Mount the floating `Dock` (`hidden md:flex fixed bottom-4 left-1/2 -translate-x-1/2 z-40`) **only** when `!pathname.startsWith("/app/floor-planner") && !pathname.startsWith("/app/interior") && !pathname.startsWith("/app/assistant")`, and apply `pb-20` to `<main>` when the Dock is visible so it never overlaps page content.

- [ ] **Step 2: Upgrade `src/components/plinth/dashboard/ui.tsx` & `src/routes/app.index.tsx`**

Wrap `Panel` and `Metric` cleanly with subtle `SpotlightCard` border illumination (`2px` sharp geometry), add `DecryptedText` option for hero `Metric` values in `app.index.tsx`, and fix the existing `exactOptionalPropertyTypes` issue on `<FloorPlan roomList={activeRooms ?? []} />` in `src/routes/app.index.tsx:150` (and verify `floor-plan.tsx` handles empty/undefined properly).

- [ ] **Step 3: Run unit tests, TypeScript check & production build**

Run:
```bash
node --test src/lib/__tests__/auth-nav.test.ts src/components/plinth/__tests__/cinematic-stages.test.ts && npx tsc --noEmit && npm run build
```
Expected: All unit tests pass, zero TS errors in `src/` (note: pre-existing `vite.config.ts` tsconfig issues if any should be checked separately via `tsconfig.json` or reported accurately), and `npm run build` exits 0.

- [ ] **Step 4: Live multi-viewport browser verification**

Restart/verify dev server (`http://localhost:8081` + `http://localhost:8000/api/health`), then verify via browser at `1440px` desktop and `375px` mobile:
1. Landing page `/` loads with crisp Swiss Drafting styling (no blurry glass cards, no horizontal overflow on `375px`).
2. Clicking Stage `02` in `Cinematic` Stage Rail scrolls video to Floor Plate; clicking **Open Floor Planner →** routes to `/login?next=%2Fapp%2Ffloor-planner`.
3. Clicking **⚡ Instant Demo Access** signs in against live FastAPI backend and lands directly on `/app/floor-planner`.
4. Navigating to `/app` displays the Rayon-inspired studio shell, 9-role switcher, and bottom `Dock` (and `Dock` hides cleanly on `/app/floor-planner` and `/app/assistant`).

---

## Self-Review Check
- **Spec coverage:** Section 5.1 → Task 2; Section 5.2 → Task 2; Section 5.3.A → Task 3; Section 5.3.B → Task 4; Section 5.4 → Tasks 1 & 5; Section 5.5 → Task 6. Zero uncovered requirements.
- **Review Focus coverage:** All 5 failure modes (`?next=` sanitization, `/login` 401 loop, 9-role normalization, full-height `Dock` overlap, `?prompt=` pre-fill race) have explicit implementation guards and unit/browser verification steps.
- **Type consistency:** `sanitizeNextPath`, `normalizeRoleId`, `buildLoginUrl`, `openPlinthTarget`, `CINEMATIC_STAGES`, `SpotlightCard`, `Magnet`, `ClickSpark`, `SplitText`, `DecryptedText`, `Dock` match identically across every task's `Interfaces` block.
