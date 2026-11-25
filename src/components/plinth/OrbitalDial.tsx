import { useEffect, useRef, useState } from "react";
import { openPlinthTarget } from "@/lib/auth-nav";
import { ORBIT_MODES } from "./sweet-data";

export function OrbitalDial() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevBg, setPrevBg] = useState(ORBIT_MODES[0]!.bg);
  const [wipeKey, setWipeKey] = useState(0);
  const timerRef = useRef<number | null>(null);

  const mode = ORBIT_MODES[activeIdx] ?? ORBIT_MODES[0]!;

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  function selectMode(idx: number) {
    if (idx === activeIdx) return;
    setPrevBg(mode.bg);
    setActiveIdx(idx);
    setWipeKey((k) => k + 1);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    const nextBg = ORBIT_MODES[idx]?.bg ?? mode.bg;
    timerRef.current = window.setTimeout(() => {
      setPrevBg(nextBg);
    }, 640);
  }

  return (
    <section
      id="orbital-engines"
      className="relative overflow-hidden py-20 transition-colors duration-300 md:py-28"
      style={{ backgroundColor: prevBg, color: mode.ink }}
    >
      {/* Curved downward paint wipe layer */}
      <div
        key={wipeKey}
        aria-hidden="true"
        className="sweet-paint-wipe paper-grain pointer-events-none absolute inset-0 z-0"
        style={{ backgroundColor: mode.bg }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Top perforated subhead pill */}
        <div className="flex justify-center">
          <div
            className="inline-flex items-center gap-3 rounded-r-full px-5 py-2 shadow-md"
            style={{
              backgroundColor: mode.tagBg,
              color: mode.tagInk,
              borderLeft: `6px dotted ${mode.bg}`,
            }}
          >
            <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
              {mode.subhead}
            </span>
          </div>
        </div>

        {/* Main 3-column stage */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
          {/* Left Rail: 3 Stacked Feature Pills + Copy */}
          <div className="order-2 flex flex-col gap-5 lg:order-1 lg:col-span-3">
            <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
              {mode.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-r-full px-4 py-1.5 font-mono text-xs font-bold tracking-[0.14em] uppercase shadow-sm"
                  style={{
                    backgroundColor: mode.tagBg,
                    color: mode.tagInk,
                    borderLeft: `4px dotted ${mode.bg}`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-base font-semibold leading-relaxed opacity-90 md:text-[17px]">
              {mode.description}
            </p>

            <button
              type="button"
              onClick={() => openPlinthTarget(mode.to)}
              className="mt-1 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 font-display-cond text-xl tracking-wide shadow-lg transition-transform duration-300 hover:scale-105"
              style={{ backgroundColor: mode.tagBg, color: mode.tagInk }}
            >
              {mode.ctaLabel} ↗
            </button>
          </div>

          {/* Center Stage: Giant Typography + Taped Tilted Cards + Circular EXPLORE ↗ Badge */}
          <div className="order-1 relative flex flex-col items-center lg:order-2 lg:col-span-6">
            {/* Giant 2-line background display */}
            <div className="pointer-events-none select-none text-center">
              <p className="font-display-cond text-4xl opacity-85 md:text-6xl">{mode.topWord}</p>
              <h2 className="font-display-cond -mt-2 text-[clamp(4.2rem,11vw,9.5rem)] leading-[0.8] tracking-[-0.04em]">
                {mode.bottomWord}
              </h2>
            </div>

            {/* Tilted Showcase Cards + Center Circle Roll */}
            <div className="relative mt-4 flex w-full max-w-xl items-center justify-center">
              {/* Left tilted photo card */}
              <div
                onClick={() => openPlinthTarget(mode.to)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openPlinthTarget(mode.to);
                }}
                className="group relative -mr-6 w-44 cursor-pointer rounded-[24px] bg-[#f8f8f2] p-2 text-[#034102] shadow-2xl transition-transform duration-300 hover:z-30 hover:scale-105 hover:rotate-0 sm:w-56 md:rounded-[30px]"
                style={{ transform: "rotate(-8deg)" }}
              >
                <div className="peel-tape pointer-events-none absolute -top-2.5 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rotate-2" />
                <img
                  src={mode.leftCardImg}
                  alt={mode.leftCardAlt}
                  className="h-36 w-full rounded-[18px] object-cover sm:h-48"
                />
                <p className="px-2 pb-1 pt-2 font-mono text-[10px] font-bold uppercase">
                  {mode.leftCardCaption}
                </p>
              </div>

              {/* Center circular model roll */}
              <div className="relative z-20 flex h-36 w-36 shrink-0 items-center justify-center rounded-full border-8 border-[#f8f8f2] bg-[#034102] p-1 shadow-[0_24px_50px_rgba(0,0,0,0.38)] sm:h-48 sm:w-48">
                <img
                  src={mode.centerImg}
                  alt={mode.bottomWord}
                  className="h-full w-full rounded-full object-cover"
                />
                <div
                  className="absolute inset-4 rounded-full border-4 border-dashed border-[#f8f8f2]/75"
                  aria-hidden="true"
                />
              </div>

              {/* Right tilted photo card */}
              <div
                onClick={() => openPlinthTarget(mode.to)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openPlinthTarget(mode.to);
                }}
                className="group relative -ml-6 w-44 cursor-pointer rounded-[24px] bg-[#f8f8f2] p-2 text-[#034102] shadow-2xl transition-transform duration-300 hover:z-30 hover:scale-105 hover:rotate-0 sm:w-56 md:rounded-[30px]"
                style={{ transform: "rotate(7deg)" }}
              >
                <div className="peel-tape pointer-events-none absolute -top-2.5 left-1/2 z-10 h-5 w-20 -translate-x-1/2 -rotate-3" />
                <img
                  src={mode.rightCardImg}
                  alt={mode.rightCardAlt}
                  className="h-36 w-full rounded-[18px] object-cover sm:h-48"
                />
                <p className="px-2 pb-1 pt-2 font-mono text-[10px] font-bold uppercase">
                  {mode.rightCardCaption}
                </p>
              </div>

              {/* Overlapping Top-Right Circular EXPLORE ↗ Button */}
              <button
                type="button"
                onClick={() => openPlinthTarget(mode.to)}
                className="group absolute -right-2 -top-6 z-30 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#f8f8f2] text-[#034102] shadow-2xl transition-transform duration-300 hover:scale-110 hover:rotate-6 sm:h-28 sm:w-28"
              >
                <span
                  className="absolute inset-1.5 rounded-full border-2 border-dotted border-[#034102]/55"
                  aria-hidden="true"
                />
                <span className="font-display-cond text-lg tracking-wide sm:text-xl">EXPLORE</span>
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#b6fe00] text-xs font-bold text-[#034102] transition-transform group-hover:rotate-45">
                  ↗
                </span>
              </button>
            </div>
          </div>

          {/* Right Rail: Orbital Dial Selector ("ROLL IT!") */}
          <div className="order-3 flex flex-col items-center lg:col-span-3">
            <div className="mb-4 flex items-center gap-2">
              <span className="font-hand text-xl font-bold">ROLL IT!</span>
              <span className="font-mono text-xs opacity-75">
                ({String(activeIdx + 1).padStart(2, "0")}/06)
              </span>
            </div>

            {/* Orbital dial grid (curved arc feel on desktop, clean grid on mobile) */}
            <div className="grid grid-cols-3 gap-3 lg:grid-cols-2 lg:gap-4">
              {ORBIT_MODES.map((m, idx) => {
                const isActive = idx === activeIdx;
                const arcOffset = idx % 2 === 1 ? "lg:translate-x-4" : "lg:-translate-x-2";
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => selectMode(idx)}
                    aria-pressed={isActive}
                    className={`group relative flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 transition-all duration-300 sm:h-24 sm:w-24 ${arcOffset} ${
                      isActive
                        ? "scale-110 border-[#f8f8f2] shadow-2xl ring-4 ring-[#034102]/30"
                        : "border-[#034102]/30 opacity-85 hover:scale-105 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: m.bg, color: m.ink }}
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-current/40 bg-[#f8f8f2]/90 font-mono text-[10px] font-bold text-[#034102]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display-cond mt-1 text-base leading-none tracking-wide">
                      {m.rollLabel.split(" ")[1]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
