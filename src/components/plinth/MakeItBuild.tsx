import { openPlinthTarget } from "@/lib/auth-nav";

export function MakeItBuild() {
  return (
    <section className="paper-grain relative bg-[#f4f1ea] pb-20 pt-10 text-[#111317] md:pb-28 md:pt-16">
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="relative grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
          {/* Center translucent drafting-tape bridge */}
          <div
            aria-hidden="true"
            className="peel-tape pointer-events-none absolute left-1/2 top-1/2 z-30 hidden h-16 w-48 -translate-x-1/2 -translate-y-1/2 -rotate-6 md:block"
          />

          {/* Left Squircle: Architectural Showcase Shot */}
          <div className="relative overflow-hidden rounded-[36px] border-4 border-[#111317] bg-white shadow-2xl md:rounded-[52px]">
            <img
              src="/assets/atrium.jpg"
              alt="Daylit architectural atrium of The Glass Pavilion"
              loading="lazy"
              className="h-[360px] w-full object-cover md:h-[520px]"
            />
            <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-[#111317] bg-[#f4f1ea]/95 px-4 py-3 text-[#111317]">
              <div>
                <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#2952ff] uppercase">
                  SEEDED PROJECT · PRJ-001
                </p>
                <p className="font-display-cond text-2xl">THE GLASS PAVILION · BENGALURU</p>
              </div>
              <span className="rounded-full bg-[#111317] px-3 py-1 font-mono text-xs font-bold text-[#f4f1ea]">
                445.9 SQM
              </span>
            </div>
          </div>

          {/* Right Squircle: Deep Charcoal CTA Card */}
          <div className="flex flex-col justify-between rounded-[36px] border-4 border-[#111317] bg-[#111317] p-8 text-[#f4f1ea] shadow-2xl md:rounded-[52px] md:p-14">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-[#f4f1ea]/30 px-3.5 py-1 font-mono text-[11px] font-semibold tracking-[0.16em] text-[#60a5fa] uppercase">
                11 WORKSPACES · FASTAPI LIVE
              </span>
              <span className="font-hand text-xl text-[#e8502b]">ready for demo</span>
            </div>

            <div className="my-8">
              <h2 className="font-display-cond text-[clamp(3.6rem,7.2vw,6.8rem)] leading-[0.82] tracking-[-0.04em] text-[#f4f1ea]">
                LET&apos;S BUILD IT <span className="text-[#2952ff]">RIGHT!</span>
              </h2>
              <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-[#f4f1ea]/80 md:text-lg">
                For every floor plate, material rate, compliance check, and BOQ line that matters.
                Jump straight into the live studio.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openPlinthTarget("/app")}
                className="inline-flex items-center gap-2 rounded-full bg-[#2952ff] px-7 py-3.5 font-display-cond text-2xl tracking-wide text-white shadow-lg transition-transform duration-300 hover:scale-105"
              >
                OPEN PLINTH STUDIO ↗
              </button>
              <button
                type="button"
                onClick={() => openPlinthTarget("/app/floor-planner")}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#f4f1ea]/45 px-6 py-3.5 font-display-cond text-xl tracking-wide text-[#f4f1ea] transition-colors hover:bg-[#f4f1ea] hover:text-[#111317]"
              >
                FLOOR PLANNER
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
