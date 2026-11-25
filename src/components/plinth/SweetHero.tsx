import { openPlinthTarget } from "@/lib/auth-nav";
import { Arch3DCanvas } from "./Arch3DCanvas";
import { FloorPlan } from "./dashboard/floor-plan";

export function SweetHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#111317] text-[#f4f1ea]">
      {/* ── Hero Section: Warm Drafting Vellum with Sweeping Curve ── */}
      <div className="paper-grain relative bg-[#f4f1ea] pb-36 pt-16 text-[#111317] md:pb-52 md:pt-20">
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-stretch gap-3">
            <span className="w-1 border-l-2 border-dotted border-[#2952ff]" />
            <p className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#2952ff] uppercase">
              THE ARCHITECTURAL WORKSPACE
            </p>
          </div>

          {/* Center Warped Hero Lockup */}
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span
                className="sticker-badge inline-flex items-center rounded-xl border-2 border-[#111317] bg-[#2952ff] px-4 py-1 font-display-cond text-xl text-white md:text-2xl"
                style={{ transform: "rotate(-2.5deg)" }}
              >
                PLINTH
              </span>
              <span className="font-mono text-xs font-semibold tracking-[0.14em] text-[#111317]/75 uppercase">
                Architecture. Without the fragmentation.
              </span>
            </div>

            <h1 className="font-display-cond mt-4 select-none text-[clamp(3.8rem,12vw,10.5rem)] leading-[0.83] tracking-[-0.04em] text-[#111317]">
              <span className="block -rotate-1">FROM CONCEPT</span>
              <span className="block rotate-1">TO CONSTRUCTION.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-[#111317]/80 md:text-lg">
              Plan, design, visualize and manage architectural projects in one intelligent
              workspace. Built for the way architecture actually happens.
            </p>

            {/* Hero Primary & Secondary CTAs */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openPlinthTarget("/app")}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#111317] bg-[#2952ff] px-7 py-3 font-display-cond text-2xl tracking-wide text-white shadow-xl transition-transform duration-300 hover:scale-105"
              >
                Explore Workspace ↗
              </button>
              <a
                href="#introduction"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#111317] bg-[#f4f1ea] px-7 py-3 font-display-cond text-2xl tracking-wide text-[#111317] transition-colors hover:bg-[#111317] hover:text-[#f4f1ea]"
              >
                Discover PLINTH ↓
              </a>
            </div>
          </div>
        </div>

        {/* Sweeping concave bottom curve into Midnight Charcoal */}
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-px left-0 z-10 h-24 w-full md:h-44"
        >
          <path d="M0,180 L0,0 C420,165 1020,165 1440,0 L1440,180 Z" fill="#111317" />
        </svg>
      </div>

      {/* ── Borderless Interactive Three.js 3D Tower Straddling the Curve ── */}
      <div className="relative z-20 mx-auto -mt-36 flex max-w-5xl flex-col items-center px-6 md:-mt-56">
        <div className="relative h-[320px] w-full max-w-3xl sm:h-[400px] md:h-[470px]">
          <Arch3DCanvas mode="hero" className="h-full w-full" />

          <button
            type="button"
            onClick={() => openPlinthTarget("/app")}
            className="group absolute bottom-6 right-2 z-30 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-[#111317] bg-[#e8502b] text-white shadow-2xl transition-transform duration-300 hover:scale-110 hover:rotate-6 sm:right-8 sm:h-28 sm:w-28"
          >
            <span
              className="absolute inset-1.5 rounded-full border-2 border-dotted border-white/60"
              aria-hidden="true"
            />
            <span className="font-display-cond text-lg leading-none tracking-wide sm:text-xl">
              ENTER
            </span>
            <span className="font-display-cond text-lg leading-none tracking-wide sm:text-xl">
              STUDIO ↗
            </span>
          </button>
        </div>
      </div>

      {/* ── Introduction Section (#introduction): Live FloorPlan Showcase + Brief Copy ── */}
      <div
        id="introduction"
        className="paper-grain relative z-10 mx-auto max-w-[1440px] px-6 pb-20 pt-8 md:px-12 md:pb-28 md:pt-12"
      >
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Left Column: Sticky Audience Note + Real Interactive PLINTH FloorPlan Component */}
          <div className="flex flex-col gap-8 lg:col-span-6">
            <div
              className="relative max-w-sm rounded-sm bg-[#f5c443] p-6 text-[#16110a] shadow-2xl"
              style={{ transform: "rotate(-2.2deg)" }}
            >
              <div className="mx-auto -mt-9 mb-3 flex h-6 w-14 items-center justify-center rounded-t-md border-2 border-[#4a4f4a] bg-gradient-to-b from-[#e4e7e4] to-[#9aa09a] shadow">
                <span className="h-1.5 w-8 rounded-full bg-[#333]" />
              </div>
              <p className="font-display-cond text-2xl tracking-tight underline decoration-2 underline-offset-4">
                BUILT FOR EVERY DISCIPLINE
              </p>
              <p className="font-hand mt-3 text-base leading-snug">
                Architects, interior designers, civil engineers, students, builders and independent
                property developers — in one workspace.
              </p>
            </div>

            {/* Real PLINTH Interface Preview: Actual <FloorPlan /> SVG Canvas */}
            <div
              className="relative rounded-[28px] border-2 border-[#f4f1ea]/25 bg-[#f4f1ea] p-4 text-[#111317] shadow-2xl"
              style={{ transform: "rotate(1.4deg)" }}
            >
              <div className="peel-tape pointer-events-none absolute -top-3 left-1/2 z-10 h-6 w-32 -translate-x-1/2 -rotate-2" />
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="font-mono text-[10px] font-bold tracking-[0.14em] text-[#2952ff] uppercase">
                  LIVE PLINTH INTERFACE · 02 FLOOR PLANNER
                </span>
                <button
                  type="button"
                  onClick={() => openPlinthTarget("/app/floor-planner")}
                  className="rounded-full bg-[#111317] px-3 py-1 font-mono text-[10px] font-bold text-[#f4f1ea] transition-colors hover:bg-[#2952ff]"
                >
                  OPEN FULL PLANNER ↗
                </button>
              </div>
              <div className="h-60 overflow-hidden rounded-[18px] border border-[#111317]/15 bg-white">
                <FloorPlan showDims zoom={0.95} />
              </div>
            </div>
          </div>

          {/* Right Column: Introduction Headline & Taped Spec Sheet */}
          <div className="lg:col-span-6">
            <div
              className="relative rounded-[28px] border-2 border-[#a88c68]/50 bg-[#e6d6be] p-8 text-[#2b1e10] shadow-[0_24px_60px_rgba(0,0,0,0.45)] md:p-12"
              style={{ transform: "rotate(-1deg)" }}
            >
              <div className="peel-tape-clear pointer-events-none absolute -top-3.5 left-10 h-8 w-44 -rotate-2" />
              <div className="peel-tape-clear pointer-events-none absolute -left-8 top-1/2 h-8 w-32 -translate-y-1/2 rotate-90" />

              <span className="inline-block rounded-full border border-[#2b1e10]/35 px-3 py-1 font-mono text-[11px] font-bold tracking-wider uppercase">
                02 · CORE PROBLEM
              </span>

              <h2 className="font-display-cond mt-4 text-4xl leading-[0.86] text-[#111317] md:text-6xl">
                Architecture shouldn&apos;t be fragmented.
              </h2>

              <p className="mt-5 text-base font-semibold leading-relaxed text-[#2b1e10]/90">
                Floor plans in one application. Visualizations in another. Estimates in
                spreadsheets. Feedback scattered across conversations.
              </p>

              <p className="mt-4 text-base font-medium leading-relaxed text-[#2b1e10]/85">
                PLINTH brings these disconnected processes together, creating a unified environment
                for architectural design and project delivery — across Studio, Design, Delivery and
                Intelligence.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openPlinthTarget("/app")}
                  className="inline-flex items-center gap-2 rounded-full bg-[#2952ff] px-6 py-3 font-display-cond text-xl tracking-wide text-white shadow-lg transition-transform hover:scale-105"
                >
                  EXPLORE WORKSPACE →
                </button>
                <a
                  href="#orbital-engines"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#111317] px-6 py-3 font-display-cond text-xl tracking-wide text-[#111317] transition-colors hover:bg-[#111317] hover:text-[#f4f1ea]"
                >
                  EXPLORE MODULES ↓
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Blueprint-Cobalt Marquee Ribbon ── */}
      <div className="relative z-20 -rotate-1 border-y-4 border-[#111317] bg-[#2952ff] py-3 text-[#f4f1ea]">
        <div className="sweet-marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-8 pr-8">
              {[
                "FROM CONCEPT TO CONSTRUCTION",
                "STUDIO · OVERVIEW & PROJECTS",
                "DESIGN · FLOOR PLANNER & SITE AI",
                "DELIVERY · COST, COMPLIANCE & DOCS",
                "INTELLIGENCE · AI ASSISTANT",
              ].map((phrase) => (
                <span
                  key={`${dup}-${phrase}`}
                  className="font-display-cond flex items-center gap-8 text-2xl tracking-tight md:text-3xl"
                >
                  <span>{phrase}</span>
                  <span className="inline-block h-3 w-3 rounded-full bg-[#e8502b]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
