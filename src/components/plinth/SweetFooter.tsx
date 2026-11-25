import { normalizeRoleId, openPlinthTarget } from "@/lib/auth-nav";
import { FOOTER_ROLE_SHORTCUTS, FOOTER_ROLL_BADGES } from "./sweet-data";

export function SweetFooter() {
  function openAsRole(roleId: string) {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("plinth_user_role", normalizeRoleId(roleId));
      } catch {
        // ignore storage restrictions
      }
    }
    openPlinthTarget("/app");
  }

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
        {/* 4-Column Condensed Navigation */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#60a5fa] uppercase">
              WORKSPACE
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "OVERVIEW", to: "/app" },
                { label: "PROJECTS", to: "/app/projects" },
                { label: "DOCUMENTS", to: "/app/documents" },
                { label: "COLLABORATION", to: "/app/collaboration" },
              ].map((link) => (
                <li key={link.to}>
                  <button
                    type="button"
                    onClick={() => openPlinthTarget(link.to)}
                    className="group inline-flex items-center gap-2 font-display-cond text-2xl tracking-tight text-[#f4f1ea] transition-transform hover:translate-x-1 md:text-3xl"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#2952ff] opacity-80 group-hover:opacity-100" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#60a5fa] uppercase">
              DESIGN AI
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "SITE ANALYSIS", to: "/app/site-analysis" },
                { label: "FLOOR PLANNER", to: "/app/floor-planner" },
                { label: "INTERIOR AI", to: "/app/interior" },
                { label: "3D VISUALIZE", to: "/app/visualization" },
              ].map((link) => (
                <li key={link.to}>
                  <button
                    type="button"
                    onClick={() => openPlinthTarget(link.to)}
                    className="group inline-flex items-center gap-2 font-display-cond text-2xl tracking-tight text-[#f4f1ea] transition-transform hover:translate-x-1 md:text-3xl"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#e8502b] opacity-80 group-hover:opacity-100" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#60a5fa] uppercase">
              ENGINEERING
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "COST & BOQ", to: "/app/cost" },
                { label: "COMPLIANCE", to: "/app/compliance" },
                { label: "AI COPILOT", to: "/app/assistant" },
              ].map((link) => (
                <li key={link.to}>
                  <button
                    type="button"
                    onClick={() => openPlinthTarget(link.to)}
                    className="group inline-flex items-center gap-2 font-display-cond text-2xl tracking-tight text-[#f4f1ea] transition-transform hover:translate-x-1 md:text-3xl"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#d8b26e] opacity-80 group-hover:opacity-100" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#60a5fa] uppercase">
              ROLE PREVIEWS
            </p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_ROLE_SHORTCUTS.map((r) => (
                <li key={r.roleId}>
                  <button
                    type="button"
                    onClick={() => openAsRole(r.roleId)}
                    className="group inline-flex items-center gap-2 font-display-cond text-2xl tracking-tight text-[#f4f1ea] transition-transform hover:translate-x-1 md:text-3xl"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#f4f1ea]/70 group-hover:bg-[#2952ff]" />
                    {r.label.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center Hero Lockup */}
        <div className="mt-16 flex flex-col items-center text-center md:mt-20">
          <span
            className="sticker-badge inline-flex items-center rounded-xl border-2 border-[#f4f1ea] bg-[#2952ff] px-4 py-1 font-display-cond text-xl text-white"
            style={{ transform: "rotate(-2deg)" }}
          >
            PLINTH STUDIO
          </span>
          <p className="font-display-cond mt-4 select-none text-[clamp(3.6rem,13vw,11.5rem)] leading-[0.8] tracking-[-0.045em] text-[#f4f1ea]">
            BUILD IN SYNC
          </p>
        </div>

        {/* Bottom 4 Colorful Roll Badges + Copyright Pill */}
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
            <span>Copyright © {new Date().getFullYear()} PLINTH Architectural AI</span>
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
