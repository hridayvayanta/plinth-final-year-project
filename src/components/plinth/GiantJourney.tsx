import { useGsapScope } from "@/lib/anim";
import { openPlinthTarget } from "@/lib/auth-nav";
import { Arch3DCanvas } from "./Arch3DCanvas";
import { JOURNEY_CHAPTERS } from "./sweet-data";

export function GiantJourney() {
  const scope = useGsapScope<HTMLElement>(({ gsap, root }) => {
    const track = root.querySelector<HTMLElement>("[data-giant-track]");
    if (!track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const distance = Math.max(0, track.scrollWidth - window.innerWidth + 140);
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${Math.round(distance * 1.15)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={scope}
      className="paper-grain relative overflow-hidden bg-[#f4f1ea] text-[#111317]"
    >
      <div className="relative z-10 border-t-2 border-[#111317]/15 py-16 md:flex md:min-h-svh md:items-center md:py-0">
        <div
          data-giant-track
          className="flex flex-col gap-16 px-6 md:w-max md:flex-row md:items-center md:gap-24 md:px-16"
        >
          {/* Intro Column */}
          <div className="shrink-0 md:w-[34rem]">
            <div
              className="sticker-badge inline-block rounded-lg border-2 border-[#111317] bg-[#2952ff] px-4 py-1.5 font-display-cond text-xl tracking-wider text-white"
              style={{ transform: "perspective(420px) rotate(-2.5deg)" }}
            >
              04 · CONNECTED WORKFLOW
            </div>

            <h2 className="font-display-cond mt-6 text-[clamp(3rem,6vw,5.4rem)] leading-[0.84] text-[#111317]">
              One project. One connected workflow.
            </h2>

            <p className="mt-5 max-w-md text-base font-semibold leading-relaxed text-[#111317]/75">
              Follow the 9-stage architectural journey from initial site analysis and floor planning
              to visualization, budgeting and project documentation—every step clickable below.
            </p>
          </div>

          {/* 3 Monumental Phases Covering All 9 Exact Workflow Steps */}
          {JOURNEY_CHAPTERS.map((ch, idx) => (
            <div
              key={ch.num}
              className="flex shrink-0 flex-col gap-8 md:flex-row md:items-center md:gap-14"
            >
              {/* Arrow + Step Indicator */}
              <div className="hidden flex-col items-center gap-2 md:flex">
                <span className="font-hand text-xl font-bold text-[#2952ff]">{ch.handNote}</span>
                <svg width="96" height="42" viewBox="0 0 96 42" fill="none" aria-hidden="true">
                  <path
                    d={idx % 2 === 0 ? "M4 8 Q 46 32 88 22" : "M4 32 Q 46 8 88 20"}
                    stroke="#111317"
                    strokeWidth="2.5"
                    strokeDasharray="5 4"
                    fill="none"
                  />
                  <path
                    d="M78 13 L90 21 L79 30"
                    stroke="#111317"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <article className="relative flex flex-col gap-6 md:w-[58rem] md:flex-row md:items-center md:gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#111317] bg-[#e8502b] font-hand text-2xl font-bold text-white">
                      {ch.num}
                    </span>
                    <span className="font-hand text-lg font-bold text-[#2952ff] md:hidden">
                      {ch.handNote}
                    </span>
                  </div>

                  <h3 className="font-display-cond mt-4 text-[clamp(3.6rem,7.2vw,6.8rem)] leading-[0.82] tracking-[-0.04em] text-[#111317]">
                    {ch.headline}
                  </h3>

                  {/* Clickable 3-Step List for This Phase */}
                  <ul className="mt-4 space-y-1.5">
                    {ch.steps.map((step) => (
                      <li key={step.num}>
                        <button
                          type="button"
                          onClick={() => openPlinthTarget(step.to)}
                          className="group inline-flex items-center gap-2.5 text-sm font-bold text-[#111317] transition-colors hover:text-[#2952ff]"
                        >
                          <span className="rounded bg-[#111317]/10 px-1.5 py-0.5 font-mono text-[11px] group-hover:bg-[#2952ff] group-hover:text-white">
                            {step.num}
                          </span>
                          <span>{step.label}</span>
                          <span className="opacity-60 group-hover:translate-x-0.5">→</span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-[#111317]/75">
                    {ch.sub}
                  </p>

                  <button
                    type="button"
                    onClick={() => openPlinthTarget(ch.to)}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-[#111317] bg-[#111317] px-6 py-3 font-display-cond text-xl tracking-wide text-[#f4f1ea] shadow-xl transition-transform duration-300 hover:scale-105 hover:bg-[#2952ff]"
                  >
                    {ch.cta}
                  </button>
                </div>

                {/* Live Floating 3D Structure + Taped Render Card */}
                <div className="relative flex items-center gap-4">
                  <div className="hidden h-56 w-56 shrink-0 sm:block">
                    <Arch3DCanvas mode={ch.mode3d} className="h-full w-full" />
                  </div>

                  <div
                    onClick={() => openPlinthTarget(ch.to)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openPlinthTarget(ch.to);
                    }}
                    className={`group relative w-full max-w-xs cursor-pointer rounded-[28px] border-2 border-[#111317]/20 bg-white p-3 shadow-2xl transition-transform duration-300 hover:scale-105 hover:rotate-0 sm:w-64 ${ch.tiltClass}`}
                  >
                    <div className="peel-tape pointer-events-none absolute -top-3 left-1/2 z-10 h-6 w-28 -translate-x-1/2 rotate-2" />
                    <img
                      src={ch.img}
                      alt={ch.imgAlt}
                      loading="lazy"
                      className="h-48 w-full rounded-[20px] object-cover"
                    />
                    <div className="flex items-center justify-between px-2 pb-1 pt-3">
                      <span className="font-mono text-[11px] font-bold uppercase">
                        PHASE 0{ch.num}
                      </span>
                      <span className="rounded-full bg-[#2952ff] px-3 py-1 font-mono text-[11px] font-bold text-white">
                        OPEN ↗
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
