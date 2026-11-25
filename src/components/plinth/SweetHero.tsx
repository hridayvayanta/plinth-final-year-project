import { openPlinthTarget } from "@/lib/auth-nav";
import { Arch3DCanvas } from "./Arch3DCanvas";

export function SweetHero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#111317] text-[#f4f1ea]">
      {/* ── Upper Warm Drafting Vellum Half with Sweeping Curved Cut ── */}
      <div className="paper-grain relative bg-[#f4f1ea] pb-44 pt-20 text-[#111317] md:pb-64 md:pt-24">
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
          {/* Top-left perforated corner mark */}
          <div className="mb-8 inline-flex items-stretch gap-3 md:mb-10">
            <span className="w-1 border-l-2 border-dotted border-[#2952ff]" />
            <p className="max-w-[220px] font-mono text-[11px] font-semibold leading-snug tracking-[0.14em] text-[#111317]/80 uppercase">
              ONE MODEL · 13 AI MODULES · 9 ROLES
            </p>
          </div>

          {/* Center Warped Hero Lockup */}
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="font-display-cond text-3xl md:text-5xl">WE&apos;RE</span>
              <span
                className="sticker-badge inline-flex items-center rounded-xl border-2 border-[#111317] bg-[#2952ff] px-4 py-1 font-display-cond text-2xl text-white md:text-4xl"
                style={{ transform: "rotate(-3deg)" }}
              >
                PLINTH STUDIO
              </span>
              <span className="font-display-cond text-3xl md:text-5xl">HERE TO</span>
            </div>

            <h1 className="font-display-cond mt-4 select-none text-[clamp(4.4rem,15vw,13.5rem)] leading-[0.8] tracking-[-0.045em] text-[#111317]">
              <span className="block -rotate-1">BUILD</span>
              <span className="block rotate-1">IN SYNC</span>
            </h1>

            <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-[#111317]/75 md:text-lg">
              From bare plot coordinates to calibrated floor plans, live 3D massing, BOQ costing,
              and NBC compliance—carried inside one continuous building model.
            </p>
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
      <div className="relative z-20 mx-auto -mt-44 flex max-w-5xl flex-col items-center px-6 md:-mt-64">
        <div className="relative h-[340px] w-full max-w-3xl sm:h-[420px] md:h-[500px]">
          <Arch3DCanvas mode="hero" className="h-full w-full" />

          {/* Floating Circular OPEN PLINTH ↗ Stamp beside the 3D Tower */}
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
              OPEN
            </span>
            <span className="font-display-cond text-lg leading-none tracking-wide sm:text-xl">
              PLINTH ↗
            </span>
          </button>
        </div>
      </div>

      {/* ── Lower Desk Collage (#111317): Sticky Note, Taped Blueprint, Kraft Board ── */}
      <div className="paper-grain relative z-10 mx-auto max-w-[1440px] px-6 pb-20 pt-8 md:px-12 md:pb-28 md:pt-12">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Left Column: Tilted Ochre Sticky Note + Taped Blueprint Card */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div
              onClick={() => openPlinthTarget("/app/site-analysis")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openPlinthTarget("/app/site-analysis");
              }}
              className="group relative max-w-xs cursor-pointer rounded-sm bg-[#f5c443] p-6 text-[#16110a] shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:rotate-0"
              style={{ transform: "rotate(-3deg)" }}
            >
              <div className="mx-auto -mt-9 mb-3 flex h-6 w-14 items-center justify-center rounded-t-md border-2 border-[#4a4f4a] bg-gradient-to-b from-[#e4e7e4] to-[#9aa09a] shadow">
                <span className="h-1.5 w-8 rounded-full bg-[#333]" />
              </div>
              <p className="font-display-cond text-2xl tracking-tight underline decoration-2 underline-offset-4">
                SITE BRIEF · TO-DO
              </p>
              <ul className="font-hand mt-3 space-y-1.5 text-lg leading-snug">
                <li>✓ Plot: 445.9 sqm · Bengaluru</li>
                <li>✓ FAR 1.25 / 1.75 Envelope</li>
                <li>✓ Setbacks: 4.5m front / 3.0m rear</li>
                <li>→ Click to launch Site AI ↗</li>
              </ul>
            </div>

            <div className="relative max-w-sm self-end lg:self-start">
              <div
                onClick={() => openPlinthTarget("/app/floor-planner")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openPlinthTarget("/app/floor-planner");
                }}
                className="group relative cursor-pointer overflow-visible rounded-[28px] border-2 border-[#f4f1ea]/25 bg-[#f4f1ea] p-3 text-[#111317] shadow-2xl transition-transform duration-300 hover:rotate-0"
                style={{ transform: "rotate(2.5deg)" }}
              >
                <div className="peel-tape pointer-events-none absolute -top-3 left-1/2 z-10 h-6 w-28 -translate-x-1/2 -rotate-3" />
                <img
                  src="/assets/blueprint.jpg"
                  alt="Calibrated architectural floor plan"
                  className="h-44 w-full rounded-[20px] object-cover"
                />
                <div className="flex items-center justify-between px-2 pb-1 pt-3">
                  <span className="font-hand text-base font-bold">
                    YOLOv8 door &amp; window detect
                  </span>
                  <span className="rounded-full bg-[#2952ff] px-3 py-1 font-mono text-[11px] font-bold text-white transition-transform group-hover:translate-x-1">
                    EDIT PLAN →
                  </span>
                </div>
              </div>
              <p className="font-hand mt-3 pl-4 text-sm text-[#60a5fa]">
                ↳ drag 3D tower above or click any pinned sheet!
              </p>
            </div>
          </div>

          {/* Right Column: Kraft Spec Board Taped to Desk */}
          <div className="lg:col-span-7">
            <div
              className="relative rounded-[28px] border-2 border-[#a88c68]/50 bg-[#e6d6be] p-8 text-[#2b1e10] shadow-[0_24px_60px_rgba(0,0,0,0.45)] md:p-12"
              style={{ transform: "rotate(-1.2deg)" }}
            >
              <div className="peel-tape-clear pointer-events-none absolute -top-3.5 left-10 h-8 w-44 -rotate-2" />
              <div className="peel-tape-clear pointer-events-none absolute -left-8 top-1/2 h-8 w-32 -translate-y-1/2 rotate-90" />

              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-[#2b1e10]/35 px-3 py-1 font-mono text-[11px] font-bold tracking-wider uppercase">
                  SPECIFICATION · REV C
                </span>
                <span className="font-hand text-lg">zero retyped drawings</span>
              </div>

              <h2 className="font-display-cond text-4xl leading-[0.86] text-[#111317] md:text-6xl">
                CAD CONFLICTS, RETYPED BOQS, LATE COST SURPRISES, CODE REJECTIONS. PLINTH KEEPS ONE
                MODEL TRUE.
              </h2>

              <p className="mt-5 max-w-xl text-sm font-semibold leading-relaxed text-[#2b1e10]/85 md:text-base">
                Every discipline — Architect, Structural Engineer, Interior Lead, Client, and
                Builder — reads and edits the exact same building graph in real time.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openPlinthTarget("/app/floor-planner")}
                  className="inline-flex items-center gap-2 rounded-full bg-[#2952ff] px-6 py-3 font-display-cond text-xl tracking-wide text-white shadow-lg transition-transform hover:scale-105"
                >
                  LAUNCH FLOOR PLANNER →
                </button>
                <a
                  href="#orbital-engines"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#111317] px-6 py-3 font-display-cond text-xl tracking-wide text-[#111317] transition-colors hover:bg-[#111317] hover:text-[#f4f1ea]"
                >
                  SPIN THE 3D ENGINES ↓
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
                "ONE CONTINUOUS MODEL",
                "LIVE 3D MASSING",
                "13 AI MODULES",
                "9 STAKEHOLDER ROLES",
                "LIVE BOQ & COST SURFACE",
                "NBC & BBMP COMPLIANCE",
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
