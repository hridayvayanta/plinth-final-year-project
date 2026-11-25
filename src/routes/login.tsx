import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { auth, setToken } from "@/lib/api";
import { normalizeRoleId, sanitizeNextPath, withBasePath } from "@/lib/auth-nav";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — PLINTH" },
      { name: "description", content: "Sign in to PLINTH — Architectural AI Platform" },
    ],
  }),
  component: Login,
});

const DEMO_ACCOUNTS = [
  { label: "Architect", email: "architect@plinth.ai", role: "architect" },
  { label: "Structural", email: "structural@plinth.ai", role: "structural" },
  { label: "Interior", email: "interior@plinth.ai", role: "interior" },
  { label: "Client", email: "client@plinth.ai", role: "client" },
  { label: "Admin", email: "admin@plinth.ai", role: "super_admin" },
] as const;

function getNextTarget(): string {
  if (typeof window === "undefined") return "/app";
  const raw = new URLSearchParams(window.location.search).get("next");
  return sanitizeNextPath(raw);
}

function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const nextTarget = getNextTarget();

  async function completeAuth(token: string) {
    setToken(token);
    await queryClient.invalidateQueries({ queryKey: ["auth"] });
    await queryClient.invalidateQueries({ queryKey: ["projects"] });
    if (nextTarget.includes("?") || nextTarget.includes("#")) {
      window.location.href = withBasePath(nextTarget);
      return;
    }
    await navigate({ to: nextTarget });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    try {
      if (isSignup) {
        const res = await auth.signup(cleanEmail, cleanPassword, fullName.trim() || "Architect");
        await completeAuth(res.access_token);
      } else {
        const res = await auth.login(cleanEmail, cleanPassword);
        await completeAuth(res.access_token);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      if (msg.includes("401") || msg.includes("Invalid") || msg.includes("Unauthorized")) {
        setError("Invalid email or password. Demo credentials: architect@plinth.ai / demo1234");
      } else if (msg.includes("409")) {
        setError("Email is already registered. Please sign in.");
      } else {
        setError(msg || "Sign in failed. Please check your backend connection.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function enterStaticPreviewFallback() {
    if (nextTarget.includes("?") || nextTarget.includes("#")) {
      window.location.href = withBasePath(nextTarget);
      return;
    }
    await navigate({ to: nextTarget });
  }

  async function handleDemoLogin() {
    setError("");
    setLoading(true);
    try {
      const res = await auth.login("architect@plinth.ai", "demo1234");
      await completeAuth(res.access_token);
    } catch {
      const hasCustomApi = Boolean(
        (import.meta.env as Record<string, string | undefined> | undefined)?.["VITE_API_URL"],
      );
      if (
        !hasCustomApi &&
        typeof window !== "undefined" &&
        window.location.hostname.endsWith("github.io")
      ) {
        await enterStaticPreviewFallback();
        return;
      }
      setError("Demo authentication failed. Please ensure backend server is running.");
    } finally {
      setLoading(false);
    }
  }

  function fillDemoAccount(demoEmail: string, role: string) {
    setIsSignup(false);
    setEmail(demoEmail);
    setPassword("demo1234");
    setError("");
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("plinth_user_role", normalizeRoleId(role));
      } catch {
        // ignore
      }
    }
  }

  return (
    <div className="paper-grain sweet-body relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111317] p-4">
      {/* Top Warm Drafting Vellum Curved Band */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[#f4f1ea]">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute -bottom-px left-0 h-16 w-full"
          aria-hidden="true"
        >
          <path d="M0,120 L0,0 C480,105 960,105 1440,0 L1440,120 Z" fill="#111317" />
        </svg>
      </div>

      {/* Main Taped Card */}
      <div className="relative z-10 w-full max-w-md rounded-[32px] border-4 border-[#111317] bg-[#f4f1ea] p-8 text-[#111317] shadow-[0_28px_70px_rgba(0,0,0,0.45)]">
        <div className="peel-tape pointer-events-none absolute -top-3.5 left-1/2 h-7 w-32 -translate-x-1/2 -rotate-2" />

        {/* Logo & Heading */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#111317] bg-[#2952ff] px-4 py-1 text-white"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-white" />
            <span className="font-display-cond text-xl tracking-tight">PLINTH STUDIO</span>
          </Link>
          <h1 className="font-display-cond mt-4 text-4xl tracking-tight text-[#111317]">
            {isSignup ? "CREATE ACCOUNT" : "ENTER STUDIO"}
          </h1>
          <p className="mt-1 text-xs font-medium text-[#111317]/70">
            {nextTarget !== "/app"
              ? `Continuing to ${nextTarget.replace("/app/", "").toUpperCase()} after sign-in`
              : "Architectural Intelligence Workspace"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-5 grid grid-cols-2 gap-1 rounded-full border-2 border-[#111317] bg-[#e5e0d5] p-1 text-center text-xs">
          <button
            type="button"
            onClick={() => {
              setIsSignup(false);
              setError("");
            }}
            className={`rounded-full py-2 font-bold transition-colors ${
              !isSignup ? "bg-[#111317] text-[#f4f1ea]" : "text-[#111317]/70 hover:text-[#111317]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignup(true);
              setError("");
            }}
            className={`rounded-full py-2 font-bold transition-colors ${
              isSignup ? "bg-[#111317] text-[#f4f1ea]" : "text-[#111317]/70 hover:text-[#111317]"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Instant Demo Access */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={loading}
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full border-2 border-[#111317] bg-[#2952ff] font-display-cond text-xl tracking-wide text-white shadow-md transition-transform hover:scale-[1.02] disabled:opacity-50"
        >
          ⚡ INSTANT DEMO ACCESS ↗
        </button>

        {/* Quick-Fill Role Accounts */}
        {!isSignup && (
          <div className="mt-4 rounded-2xl border-2 border-dotted border-[#111317]/30 bg-white/80 p-3">
            <p className="font-mono text-[10px] font-bold tracking-wider text-[#111317]/70 uppercase">
              Quick-Fill Demo Roles (pass: demo1234)
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => fillDemoAccount(acc.email, acc.role)}
                  className={`rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold transition-colors ${
                    email === acc.email
                      ? "border-[#111317] bg-[#111317] text-white"
                      : "border-[#111317]/30 bg-white text-[#111317] hover:bg-[#2952ff] hover:text-white"
                  }`}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          {error && (
            <div className="rounded-xl border-2 border-[#e8502b] bg-[#e8502b]/15 px-3 py-2 text-xs font-semibold text-[#8c280e]">
              {error}
            </div>
          )}

          {isSignup && (
            <div>
              <label className="mb-1 block font-mono text-[10px] font-bold tracking-wider uppercase">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Sneha Iyer"
                required
                className="h-10 w-full rounded-xl border-2 border-[#111317]/25 bg-white px-3 text-sm outline-none transition-colors focus:border-[#2952ff]"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block font-mono text-[10px] font-bold tracking-wider uppercase">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="architect@plinth.ai"
              required
              className="h-10 w-full rounded-xl border-2 border-[#111317]/25 bg-white px-3 text-sm outline-none transition-colors focus:border-[#2952ff]"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-[10px] font-bold tracking-wider uppercase">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="h-10 w-full rounded-xl border-2 border-[#111317]/25 bg-white px-3 text-sm outline-none transition-colors focus:border-[#2952ff]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center rounded-full bg-[#111317] font-display-cond text-xl tracking-wide text-[#f4f1ea] transition-transform hover:scale-[1.01] hover:bg-[#e8502b] disabled:opacity-50"
          >
            {loading ? "PROCESSING..." : isSignup ? "CREATE ACCOUNT & LAUNCH →" : "SIGN IN →"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs font-medium text-[#111317]/75">
          <Link to="/" className="underline decoration-2 underline-offset-4 hover:text-[#2952ff]">
            ← Back to PLINTH landing page
          </Link>
        </p>
      </div>
    </div>
  );
}
