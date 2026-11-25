import { useState } from "react";
import { openPlinthTarget } from "@/lib/auth-nav";

export function SweetHero() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 9, ry: x * 12 });
  }

  return (
    <section
      id="top"
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      className="relative overflow-hidden bg-[#034102] text-[#f8f8f2]"
    >
      {/* ── Upper Neon-Lime Paper Half with Sweeping Curved Cut ── */}
      <div className="paper-grain relative bg-[#b6fe00] pb-32 pt-20 text-[#034102] md:pb-44 md:pt-24">
        {/* Top-left perforated corner mark */}
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="mb-8 inline-flex items-stretch gap-3 md:mb-10">
            <span className="w-1 border-l-2 border-dotted border-[#034102]/70" />
            <p className="max-w-[200px] font-mono text-[11px] font-semibold leading-snug tracking-[0.14em] uppercase">
              ONE MODEL · 13 AI MODULES · 9 ROLES
            </p>
          </div>

          {/* Center Warped Hero Lockup */}
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="font-display-cond text-3xl md:text-5xl">WE&apos;RE</span>
              <span
                className="sticker-badge inline-flex items-center rounded-xl border-2 border-[#034102] bg-[#034102] px-4 py-1 font-display-cond text-2xl text-[#b6fe00] md:text-4xl"
                style={{ transform: "rotate(-3deg)" }}
              >
                PLINTH STUDIO
              </span>
              <span className="font-display-cond text-3xl md:text-5xl">HERE TO</span>
            </div>

            <h1 className="font-display-cond mt-4 select-none text-[clamp(4.4rem,15vw,13.5rem)] leading-[0.8] tracking-[-0.045em] text-[#034102]">
              <span className="block -rotate-1">BUILD</span>
              <span className="block rotate-1">IN SYNC</span>
            </h1>

            <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-[#034102]/85 md:text-lg">
              From bare plot coordinates to calibrated floor plans, 3D massing, live BOQ costing,
              and NBC compliance—carried inside one live model.
            </p>
          </div>
        </div>

        {/* Sweeping concave bottom curve into Deep Forest Green */}
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-px left-0 z-10 h-20 w-full md:h-36"
        >
          <path d="M0,160 L0,0 C420,145 1020,145 1440,0 L1440,160 Z" fill="#034102" />
        </svg>
      </div>

      {/* ── Centerpiece Architectural Video Roll Straddling the Curve ── */}
      <div className="relative z-20 mx-auto -mt-28 max-w-4xl px-6 md:-mt-40">
        <div
          className="relative mx-auto overflow-hidden rounded-[34px] border-4 border-[#034102] bg-[#0a1a09] shadow-[0_28px_70px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out md:rounded-[48px]"
          style={{
            transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          }}
        >
          {/* Top physical masking-tape strip holding the centerpiece */}
          <div className="peel-tape pointer-events-none absolute left-1/2 top-0 z-20 h-7 w-40 -translate-x-1/2 -translate-y-1 rotate-1" />

          <video
            src="/assets/cinematic.mp4"
            poster="/assets/blueprint.jpg"
            autoPlay
            loop
            muted
            playsInline
            className="aspect-[16/9] w-full object-cover"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#b6fe00]/25 bg-[#034102] px-5 py-4 md:px-7">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#b6fe00]/80 uppercase">
                Live Model Sequence · PRJ-001 The Glass Pavilion
              </p>
              <p className="mt-0.5 text-sm font-semibold text-[#f8f8f2]">
                Blueprint → Floor Plate → Steel Structure → Glass Envelope
              </p>
            </div>

            <button
              type="button"
              onClick={() => openPlinthTarget("/app")}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#b6fe00] bg-[#b6fe00] px-5 py-2 font-display-cond text-xl tracking-wide text-[#034102] transition-transform duration-300 hover:scale-105"
            >
              OPEN PLINTH ↗
            </button>
          </div>
        </div>
      </div>

      {/* ── Lower Desk Collage (#034102): Sticky Note, Taped Blueprint, Kraft Board ── */}
      <div className="paper-grain relative z-10 mx-auto max-w-[1440px] px-6 pb-20 pt-14 md:px-12 md:pb-28 md:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Left Column: Yellow Sticky Note + Taped Blueprint Card */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            {/* Tilted Yellow Sticky Note with Silver Binder Clip */}
            <div
              onClick={() => openPlinthTarget("/app/site-analysis")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openPlinthTarget("/app/site-analysis");
              }}
              className="group relative max-w-xs cursor-pointer rounded-sm bg-[#F7D000] p-6 text-[#16110a] shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:rotate-0"
              style={{ transform: "rotate(-3deg)" }}
            >
              {/* Silver Clip */}
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

            {/* Tilted Taped Blueprint Render Card + Lime Handwritten Note */}
            <div className="relative max-w-sm self-end lg:self-start">
              <div
                onClick={() => openPlinthTarget("/app/floor-planner")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openPlinthTarget("/app/floor-planner");
                }}
                className="group relative cursor-pointer overflow-visible rounded-[28px] border-2 border-[#b6fe00]/30 bg-[#f8f8f2] p-3 text-[#034102] shadow-2xl transition-transform duration-300 hover:rotate-0"
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
                  <span className="rounded-full bg-[#034102] px-3 py-1 font-mono text-[11px] font-bold text-[#b6fe00] transition-transform group-hover:translate-x-1">
                    EDIT PLAN →
                  </span>
                </div>
              </div>
              <p className="font-hand mt-3 pl-4 text-sm text-[#b6fe00]">
                ↳ click any pinned sheet to open live tool!
              </p>
            </div>
          </div>

          {/* Right Column: Kraft Cardboard Spec Sheet Taped to Desk */}
          <div className="lg:col-span-7">
            <div
              className="relative rounded-[28px] border-2 border-[#8c5918]/40 bg-[#d5b282] p-8 text-[#593302] shadow-[0_24px_60px_rgba(0,0,0,0.4)] md:p-12"
              style={{ transform: "rotate(-1.2deg)" }}
            >
              {/* Long translucent OPP tape strips pinning top & left edge */}
              <div className="peel-tape-clear pointer-events-none absolute -top-3.5 left-10 h-8 w-44 -rotate-2" />
              <div className="peel-tape-clear pointer-events-none absolute -left-8 top-1/2 h-8 w-32 -translate-y-1/2 rotate-90" />

              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-[#593302]/40 px-3 py-1 font-mono text-[11px] font-bold tracking-wider uppercase">
                  SPECIFICATION · REV C
                </span>
                <span className="font-hand text-lg">zero retyped drawings</span>
              </div>

              <h2 className="font-display-cond text-4xl leading-[0.86] text-[#4d2c02] md:text-6xl">
                CAD CONFLICTS, RETYPED BOQS, LATE COST SURPRISES, CODE REJECTIONS. PLINTH KEEPS ONE
                MODEL TRUE.
              </h2>

              <p className="mt-5 max-w-xl text-sm font-semibold leading-relaxed text-[#593302]/85 md:text-base">
                Every discipline — Architect, Structural Engineer, Interior Lead, Client, and
                Builder — reads and edits the exact same building graph in real time.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openPlinthTarget("/app/floor-planner")}
                  className="inline-flex items-center gap-2 rounded-full bg-[#034102] px-6 py-3 font-display-cond text-xl tracking-wide text-[#b6fe00] shadow-lg transition-transform hover:scale-105"
                >
                  LAUNCH FLOOR PLANNER →
                </button>
                <a
                  href="#orbital-engines"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#4d2c02] px-6 py-3 font-display-cond text-xl tracking-wide text-[#4d2c02] transition-colors hover:bg-[#4d2c02] hover:text-[#f8f8f2]"
                >
                  ROLL THE 6 ENGINES ↓
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Neon-Lime Marquee Ribbon ── */}
      <div className="relative z-20 -rotate-1 border-y-4 border-[#034102] bg-[#b6fe00] py-3 text-[#034102]">
        <div className="sweet-marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-8 pr-8">
              {[
                "ONE CONTINUOUS MODEL",
                "13 AI MODULES",
                "9 STAKEHOLDER ROLES",
                "LIVE BOQ & COST SURFACE",
                "NBC & BBMP COMPLIANCE",
                "YOLOV8 PLAN DETECTION",
              ].map((phrase) => (
                <span
                  key={`${dup}-${phrase}`}
                  className="font-display-cond flex items-center gap-8 text-2xl tracking-tight md:text-3xl"
                >
                  <span>{phrase}</span>
                  <span className="inline-block h-3 w-3 rounded-full bg-[#034102]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
