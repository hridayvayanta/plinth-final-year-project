import { useEffect, useState } from "react";

const LAYERS = ["#2E3EAC", "#50CBFF", "#b6fe00", "#F7D000", "#fa8005", "#FF7B5F"];

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

    const t1 = window.setTimeout(() => setPeeling(true), 220);
    const t2 = window.setTimeout(() => {
      setDone(true);
      window.dispatchEvent(new Event("plinth:ready"));
    }, 1050);

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
            transitionDelay: `${(LAYERS.length - 1 - i) * 55}ms`,
            borderBottomLeftRadius: "42% 8vh",
            borderBottomRightRadius: "42% 8vh",
          }}
        />
      ))}

      {/* Top neon-lime preloader sheet with 3D perspective mark */}
      <div
        className="paper-grain absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#b6fe00] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          transform: peeling ? "translateY(-118%)" : "translateY(0%)",
          borderBottomLeftRadius: "46% 9vh",
          borderBottomRightRadius: "46% 9vh",
        }}
      >
        <div
          className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-[#034102] bg-[#034102] px-8 py-5 text-[#b6fe00] shadow-2xl"
          style={{ transform: "perspective(520px) rotateX(8deg) rotate(-3deg)" }}
        >
          <span className="font-mono text-[10px] tracking-[0.28em] text-[#b6fe00]/75 uppercase">
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
