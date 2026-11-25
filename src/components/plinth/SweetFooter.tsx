import { openPlinthTarget } from "@/lib/auth-nav";
import { FOOTER_ROLL_BADGES, WORKSPACE_CATEGORIES } from "./sweet-data";

export function SweetFooter() {
  return (
    <footer className="paper-grain relative overflow-hidden bg-[#111317] pt-24 text-[#f4f1ea] md:pt-32">
      {/* Sweeping concave top curve from Warm Vellum (#f4f1ea) into #111317 */}
      <svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 h-16 w-full md:h-28"
      >
        <path d="M0,0 L1440,0 L1440,140 C1020,10 420,10 0,140 Z" fill="#f4f1ea" />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 pb-10 pt-8 md:px-12">
        {/* 4-Column Navigation Strictly Matching Studio / Design / Delivery / Intelligence */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {WORKSPACE_CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#60a5fa] uppercase">
                {cat.name}
              </p>
              <ul className="mt-4 space-y-2.5">
                {cat.modules.map((mod) => (
                  <li key={mod.code}>
                    <button
                      type="button"
                      onClick={() => openPlinthTarget(mod.to)}
                      className="group inline-flex items-center gap-2 font-display-cond text-xl tracking-tight text-[#f4f1ea] transition-transform hover:translate-x-1 md:text-2xl"
                    >
                      <span className="font-mono text-[11px] text-[#60a5fa]/85">{mod.code}</span>
                      <span>{mod.name.toUpperCase()}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Center Lockup */}
        <div className="mt-16 flex flex-col items-center text-center md:mt-20">
          <span
            className="sticker-badge inline-flex items-center rounded-xl border-2 border-[#f4f1ea] bg-[#2952ff] px-4 py-1 font-display-cond text-xl text-white"
            style={{ transform: "rotate(-2deg)" }}
          >
            PLINTH WORKSPACE
          </span>
          <p className="font-display-cond mt-4 select-none text-[clamp(3.2rem,11vw,9.5rem)] leading-[0.82] tracking-[-0.045em] text-[#f4f1ea]">
            FROM CONCEPT TO CONSTRUCTION.
          </p>
        </div>

        {/* Bottom 4 Category Roll Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {FOOTER_ROLL_BADGES.map((b, i) => (
            <button
              key={b.label}
              type="button"
              onClick={() => openPlinthTarget(b.to)}
              className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-[#f4f1ea] shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:rotate-6 sm:h-24 sm:w-24"
              style={{
                backgroundColor: b.bg,
                color: b.ink,
                transform: `rotate(${i % 2 === 0 ? -4 : 4}deg)`,
              }}
            >
              <span className="h-5 w-5 rounded-full border-2 border-current/40 bg-[#f4f1ea]/90" />
              <span className="font-display-cond mt-1 text-base leading-none">{b.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#f4f1ea]/20 bg-[#1a1d24] px-5 py-2 font-mono text-[11px] text-[#f4f1ea]/80">
            <span>
              © {new Date().getFullYear()} PLINTH · Architecture. Without the fragmentation.
            </span>
            <span aria-hidden="true">·</span>
            <a href="#top" className="underline underline-offset-4 hover:text-white">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
