import { createFileRoute, Link } from "@tanstack/react-router";
import { getToken } from "@/lib/api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "PLINTH — Blank Canvas" }],
  }),
  component: Index,
});

function Index() {
  const target = getToken() ? "/app" : "/login";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
      <p className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
        PLINTH · Clean Slate
      </p>
      <h1 className="mt-3 text-2xl font-medium tracking-tight">
        Landing frontend cleared — ready for reference redesign.
      </h1>
      <Link
        to={target}
        className="mt-6 inline-flex items-center border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        Open PLINTH →
      </Link>
    </main>
  );
}
