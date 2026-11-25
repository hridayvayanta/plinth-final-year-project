import { useState } from "react";
import { openPlinthTarget } from "@/lib/auth-nav";
import { PULL_MENU_ITEMS } from "./sweet-data";

export function PullMenu() {
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[200]">
      <div className="mx-auto flex max-w-[1600px] items-start justify-between px-4 md:px-8">
        {/* Top-left instant studio brand badge */}
        <div className="pointer-events-auto mt-3 flex items-center gap-2">
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#034102] bg-[#f7f7f2] px-4 py-1.5 text-[#034102] shadow-md transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#b6fe00] ring-1 ring-[#034102]" />
            <span className="font-display-cond text-lg tracking-tight">PLINTH</span>
          </a>

          <button
            type="button"
            onClick={() => openPlinthTarget("/app")}
            className="hidden items-center gap-1.5 rounded-full border-2 border-[#034102] bg-[#034102] px-4 py-1.5 text-[12px] font-bold tracking-wide text-[#b6fe00] shadow-md transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            OPEN PLINTH
            <span aria-hidden="true">↗</span>
          </button>
        </div>

        {/* Hanging notched PULL ME tab */}
        <div className="pointer-events-auto relative">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="plinth-pull-drawer"
            onClick={() => setOpen((v) => !v)}
            className="edge-bite group relative flex flex-col items-center bg-[#f8f8f2] px-6 pb-5 pt-3 text-[#034102] shadow-xl transition-transform duration-300 hover:translate-y-1"
          >
            <span className="mb-2 block h-0.5 w-10 border-t-2 border-dotted border-[#034102]/60" />
            <span className="font-display-cond text-lg tracking-[0.04em] md:text-xl">
              {open ? "CLOSE ×" : "PULL ME"}
            </span>
            <span className="font-hand mt-0.5 text-[11px] text-[#034102]/70">
              {open ? "fold up" : "6 studios"}
            </span>
          </button>
        </div>
      </div>

      {/* Pull-down paper drawer */}
      <nav
        id="plinth-pull-drawer"
        aria-label="PLINTH Studio Drawer"
        inert={!open}
        aria-hidden={!open}
        className={`pointer-events-auto fixed inset-x-0 top-0 z-[-1] overflow-hidden bg-[#f8f8f2] text-[#034102] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open
            ? "max-h-[90vh] translate-y-0 border-b-4 border-[#034102] opacity-100"
            : "max-h-0 -translate-y-full opacity-0"
        }`}
      >
        <div className="paper-grain mx-auto max-w-[1200px] px-6 pb-10 pt-20 md:px-10">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#034102]/70 uppercase">
              Direct Studio Launchpad
            </span>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openPlinthTarget("/app");
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#034102] px-4 py-1.5 text-xs font-bold text-[#b6fe00] transition-transform hover:scale-105"
            >
              ENTER DASHBOARD ↗
            </button>
          </div>

          <ul className="divide-y-2 divide-dotted divide-[#034102]/30 border-y-2 border-dotted border-[#034102]/30">
            {PULL_MENU_ITEMS.map((item) => (
              <li key={item.to}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openPlinthTarget(item.to);
                  }}
                  className="group flex w-full items-center gap-4 py-3.5 text-left transition-colors hover:bg-[#b6fe00]/35 md:gap-6 md:px-3"
                >
                  <span className="font-mono text-xs font-semibold text-[#034102]/60">
                    {item.code}
                  </span>

                  <img
                    src={item.thumb}
                    alt=""
                    className="hidden h-12 w-16 shrink-0 rounded-xl border border-[#034102]/25 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3 sm:block"
                  />

                  <div className="min-w-0 flex-1">
                    <span className="font-display-cond block text-3xl tracking-[-0.03em] text-[#034102] transition-transform duration-300 group-hover:translate-x-2 md:text-5xl">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-xs font-medium text-[#034102]/70 md:text-sm">
                      {item.sub}
                    </span>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#034102] bg-[#b6fe00] text-base font-bold text-[#034102] transition-transform duration-300 group-hover:rotate-45">
                    ↗
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
