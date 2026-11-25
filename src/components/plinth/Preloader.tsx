import { useEffect, useState } from "react";

const LAYERS = ["#111317", "#1e3a8a", "#2952ff", "#e8502b", "#d8b26e", "#e5dfd3"];

export function Preloader() {
  const [peeling, setPeeling] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDone(true);
      window.dispatchEvent(new Event("plinth:ready"));
      return;
    }

    const t1 = window.setTimeout(() => setPeeling(true), 180);
    const t2 = window.setTimeout(() => {
      setDone(true);
      window.dispatchEvent(new Event("plinth:ready"));
    }, 950);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (done) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[500] overflow-hidden">
      {LAYERS.map((bg, i) => (
        <div
          key={bg}
          className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            backgroundColor: bg,
            zIndex: 10 + i,
            transform: peeling ? "translateY(-115%)" : "translateY(0%)",
            transitionDelay: `${(LAYERS.length - 1 - i) * 50}ms`,
            borderBottomLeftRadius: "42% 8vh",
            borderBottomRightRadius: "42% 8vh",
          }}
        />
      ))}

      {/* Top warm-vellum preloader sheet */}
      <div
        className="paper-grain absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#f4f1ea] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          transform: peeling ? "translateY(-118%)" : "translateY(0%)",
          borderBottomLeftRadius: "46% 9vh",
          borderBottomRightRadius: "46% 9vh",
        }}
      >
        <div
          className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-[#111317] bg-[#111317] px-8 py-5 text-[#f4f1ea] shadow-2xl"
          style={{ transform: "perspective(520px) rotateX(8deg) rotate(-3deg)" }}
        >
          <span className="font-mono text-[10px] tracking-[0.28em] text-[#60a5fa] uppercase">
            Architectural Intelligence
          </span>
          <span className="font-display-cond mt-1 text-5xl tracking-[-0.04em] md:text-6xl">
            PLINTH
          </span>
        </div>
      </div>
    </div>
  );
}
