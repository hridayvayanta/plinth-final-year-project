import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function SoundPill() {
  const [on, setOn] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  function playTactileClick(enable: boolean) {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        void ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(enable ? 520 : 280, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(enable ? 780 : 180, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Ignore WebAudio restrictions cleanly
    }
  }

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? "Disable tactile studio sound" : "Enable tactile studio sound"}
      onClick={() => {
        const next = !on;
        setOn(next);
        playTactileClick(next);
      }}
      className={`fixed bottom-4 right-4 z-[180] hidden items-center gap-2 rounded-full border-2 border-[#111317] p-1.5 pr-3 shadow-lg transition-colors duration-300 sm:flex ${
        on ? "bg-[#2952ff] text-white" : "bg-[#f4f1ea] text-[#111317]"
      }`}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full border border-[#111317] transition-transform duration-300 ${
          on ? "translate-x-0.5 rotate-180 bg-[#f4f1ea] text-[#2952ff]" : "bg-[#2952ff] text-white"
        }`}
      >
        {on ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
      </span>
      <span className="font-mono text-[10px] font-semibold tracking-wider uppercase">
        {on ? "SFX ON" : "SFX OFF"}
      </span>
    </button>
  );
}
