import { useGsapScope } from "@/lib/anim";
import { openPlinthTarget } from "@/lib/auth-nav";
import { JOURNEY_CHAPTERS } from "./sweet-data";

export function GiantJourney() {
  const scope = useGsapScope<HTMLElement>(({ gsap, root }) => {
    const track = root.querySelector<HTMLElement>("[data-giant-track]");
    if (!track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const distance = Math.max(0, track.scrollWidth - window.innerWidth + 120);
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
      className="paper-grain relative overflow-hidden bg-[#b6fe00] text-[#034102]"
    >
      {/* Top sweeping curve from OrbitalDial into Neon Lime */}
      <div className="relative z-10 border-t-4 border-[#034102]/20 py-14 md:flex md:min-h-svh md:items-center md:py-0">
        <div
          data-giant-track
          className="flex flex-col gap-16 px-6 md:w-max md:flex-row md:items-center md:gap-24 md:px-16"
        >
          {/* Intro Column */}
          <div className="shrink-0 md:w-[34rem]">
            <div
              className="sticker-badge inline-block rounded-lg border-2 border-[#034102] bg-[#034102] px-4 py-1.5 font-display-cond text-xl tracking-wider text-[#b6fe00]"
              style={{ transform: "perspective(420px) rotate(-2.5deg)" }}
            >
              WHY PLINTH EXISTS
            </div>

            <h2 className="font-display-cond mt-6 text-[clamp(3rem,6vw,5.4rem)] leading-[0.84] text-[#034102]">
              ONE SOURCE OF TRUTH FROM GROUND TO HANDOVER.
            </h2>

            <p className="mt-5 max-w-md text-base font-semibold leading-relaxed text-[#034102]/85">
              Every chapter below links directly into a working AI workspace—click any pinned sheet
              as you scroll.
            </p>
          </div>

          {/* 3 Monumental Chapters with Diagonal Arrows & Clickable CTAs */}
          {JOURNEY_CHAPTERS.map((ch, idx) => (
            <div
              key={ch.num}
              className="flex shrink-0 flex-col gap-8 md:flex-row md:items-center md:gap-16"
            >
              {/* Arrow + Handwritten Annotation Connector */}
              <div className="hidden flex-col items-center gap-2 md:flex">
                <span className="font-hand text-xl font-bold text-[#034102]">{ch.handNote}</span>
                <svg width="96" height="42" viewBox="0 0 96 42" fill="none" aria-hidden="true">
                  <path
                    d={idx % 2 === 0 ? "M4 8 Q 46 32 88 22" : "M4 32 Q 46 8 88 20"}
                    stroke="#034102"
                    strokeWidth="2.5"
                    strokeDasharray="5 4"
                    fill="none"
                  />
                  <path
                    d="M78 13 L90 21 L79 30"
                    stroke="#034102"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Giant Chapter Block */}
              <article className="relative flex flex-col gap-6 md:w-[50rem] md:flex-row md:items-center md:gap-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#034102] bg-[#f8f8f2] font-hand text-2xl font-bold">
                      {ch.num}
                    </span>
                    <span className="font-hand text-lg font-bold md:hidden">{ch.handNote}</span>
                  </div>

                  <h3 className="font-display-cond mt-4 text-[clamp(4rem,8.5vw,8rem)] leading-[0.8] tracking-[-0.04em] text-[#034102]">
                    {ch.headline}
                  </h3>

                  <p className="mt-4 max-w-sm text-sm font-semibold leading-relaxed text-[#034102]/85 md:text-base">
                    {ch.sub}
                  </p>

                  <button
                    type="button"
                    onClick={() => openPlinthTarget(ch.to)}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-[#034102] bg-[#034102] px-6 py-3 font-display-cond text-xl tracking-wide text-[#b6fe00] shadow-xl transition-transform duration-300 hover:scale-105"
                  >
                    {ch.cta}
                  </button>
                </div>

                {/* Tilted Taped Architectural Card */}
                <div
                  onClick={() => openPlinthTarget(ch.to)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openPlinthTarget(ch.to);
                  }}
                  className={`group relative w-full max-w-xs cursor-pointer rounded-[28px] bg-[#f8f8f2] p-3 shadow-2xl transition-transform duration-300 hover:scale-105 hover:rotate-0 ${ch.tiltClass}`}
                >
                  <div className="peel-tape pointer-events-none absolute -top-3 left-1/2 z-10 h-6 w-28 -translate-x-1/2 rotate-2" />
                  <img
                    src={ch.img}
                    alt={ch.imgAlt}
                    loading="lazy"
                    className="h-56 w-full rounded-[20px] object-cover"
                  />
                  <div className="flex items-center justify-between px-2 pb-1 pt-3">
                    <span className="font-mono text-[11px] font-bold uppercase">
                      STAGE 0{ch.num}
                    </span>
                    <span className="rounded-full bg-[#b6fe00] px-3 py-1 font-mono text-[11px] font-bold text-[#034102] ring-1 ring-[#034102]">
                      OPEN ↗
                    </span>
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
