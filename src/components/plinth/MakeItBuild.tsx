import { openPlinthTarget } from "@/lib/auth-nav";
import { AI_STARTER_PROMPTS } from "./sweet-data";

export function MakeItBuild() {
  return (
    <section className="paper-grain relative bg-[#f4f1ea] pb-20 pt-10 text-[#111317] md:pb-28 md:pt-16">
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="relative grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
          {/* Center translucent drafting-tape bridge */}
          <div
            aria-hidden="true"
            className="peel-tape pointer-events-none absolute left-1/2 top-12 z-30 hidden h-12 w-36 -translate-x-1/2 -rotate-3 md:block"
          />

          {/* Left Squircle: AI Section (Exact Brief Copy + Pre-filled Copilot Prompts) */}
          <div className="flex flex-col justify-between overflow-hidden rounded-[36px] border-4 border-[#111317] bg-white p-8 text-[#111317] shadow-2xl md:rounded-[52px] md:p-12">
            <div>
              <span className="inline-block rounded-full border border-[#111317]/25 bg-[#f4f1ea] px-3.5 py-1 font-mono text-[11px] font-bold tracking-[0.16em] text-[#2952ff] uppercase">
                10 — AI ASSISTANT · SUPPORTIVE DESIGN TOOL
              </span>

              <h2 className="font-display-cond mt-5 text-[clamp(2.4rem,4.4vw,4.1rem)] leading-[0.88] tracking-[-0.03em] text-[#111317]">
                Intelligence behind every decision.
              </h2>

              <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-[#111317]/80">
                Explore architectural possibilities, ask questions, refine concepts and make more
                informed decisions with AI assistance integrated into your workspace.
              </p>

              <div className="mt-6 space-y-2">
                <p className="font-mono text-[10px] font-bold tracking-[0.14em] text-[#111317]/60 uppercase">
                  Try a prompt in the live workspace:
                </p>
                <div className="flex flex-wrap gap-2">
                  {AI_STARTER_PROMPTS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() =>
                        openPlinthTarget(`/app/assistant?prompt=${encodeURIComponent(q)}`)
                      }
                      className="rounded-full border border-[#111317]/30 bg-[#f4f1ea] px-3.5 py-1.5 text-xs font-semibold text-[#111317] transition-colors hover:border-[#2952ff] hover:bg-[#2952ff] hover:text-white"
                    >
                      “{q}” →
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[#111317]/15 pt-4">
              <span className="font-mono text-[10px] text-[#111317]/65">
                Supportive tool — never replaces licensed professionals.
              </span>
              <button
                type="button"
                onClick={() => openPlinthTarget("/app/assistant")}
                className="shrink-0 rounded-full bg-[#111317] px-4 py-2 font-display-cond text-lg tracking-wide text-[#f4f1ea] transition-colors hover:bg-[#2952ff]"
              >
                AI ASSISTANT ↗
              </button>
            </div>
          </div>

          {/* Right Squircle: Closing CTA (Exact Brief Copy) */}
          <div className="flex flex-col justify-between overflow-hidden rounded-[36px] border-4 border-[#111317] bg-[#111317] p-8 text-[#f4f1ea] shadow-2xl md:rounded-[52px] md:p-12">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-[#f4f1ea]/30 px-3.5 py-1 font-mono text-[11px] font-semibold tracking-[0.16em] text-[#60a5fa] uppercase">
                UNIFIED WORKSPACE
              </span>
              <span className="font-hand text-xl text-[#e8502b]">concept to construction</span>
            </div>

            <div className="my-8">
              <h2 className="font-display-cond text-[clamp(2.4rem,4.3vw,4.1rem)] leading-[0.88] tracking-[-0.03em] text-[#f4f1ea]">
                Great architecture starts with a <span className="text-[#2952ff]">PLINTH.</span>
              </h2>
              <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-[#f4f1ea]/80 md:text-lg">
                A more connected way to plan, design and deliver architectural projects.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openPlinthTarget("/app")}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#2952ff] px-7 py-3.5 font-display-cond text-2xl tracking-wide text-white shadow-lg transition-transform duration-300 hover:scale-105"
              >
                Enter Workspace ↗
              </button>
              <button
                type="button"
                onClick={() => openPlinthTarget("/app/floor-planner")}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border-2 border-[#f4f1ea]/45 px-6 py-3.5 font-display-cond text-xl tracking-wide text-[#f4f1ea] transition-colors hover:bg-[#f4f1ea] hover:text-[#111317]"
              >
                Floor Planner
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
