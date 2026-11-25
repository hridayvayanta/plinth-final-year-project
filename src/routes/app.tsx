import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Wordmark } from "@/components/plinth/dashboard/site-chrome";
import { cn } from "@/lib/utils";
import { normalizeRoleId, type StudioRoleId } from "@/lib/auth-nav";
import { useAuth } from "@/hooks/use-auth";
import { useProjects } from "@/hooks/use-api";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const ROLES_LIST: { id: StudioRoleId; label: string; focus: string[] }[] = [
  {
    id: "architect",
    label: "Architect",
    focus: ["Floor Planner", "AI Assistant", "Site Analysis"],
  },
  { id: "project_admin", label: "Project Admin", focus: ["Overview", "Projects", "Compliance"] },
  {
    id: "super_admin",
    label: "Super Admin",
    focus: ["Overview", "Projects", "Compliance", "Documents"],
  },
  { id: "client", label: "Client", focus: ["Overview", "Cost & Materials", "Visualization"] },
  { id: "structural", label: "Structural Engineer", focus: ["Compliance", "Documents"] },
  { id: "interior", label: "Interior Designer", focus: ["Interior Studio", "Visualization"] },
  { id: "builder", label: "Builder / Contractor", focus: ["Cost & Materials", "Documents"] },
  { id: "site", label: "Site Engineer", focus: ["Overview", "Floor Planner", "Documents"] },
  { id: "vendor", label: "Vendor / Supplier", focus: ["Cost & Materials", "Documents"] },
];

const nav: { group: string; items: { to: string; label: string; code: string }[] }[] = [
  {
    group: "Studio",
    items: [
      { to: "/app", label: "Overview", code: "00" },
      { to: "/app/projects", label: "Projects", code: "01" },
    ],
  },
  {
    group: "Design",
    items: [
      { to: "/app/floor-planner", label: "Floor Planner", code: "02" },
      { to: "/app/interior", label: "Interior Studio", code: "03" },
      { to: "/app/visualization", label: "Visualization", code: "04" },
      { to: "/app/site-analysis", label: "Site Analysis", code: "05" },
    ],
  },
  {
    group: "Delivery",
    items: [
      { to: "/app/cost", label: "Cost & Materials", code: "06" },
      { to: "/app/compliance", label: "Compliance", code: "07" },
      { to: "/app/collaboration", label: "Collaboration", code: "08" },
      { to: "/app/documents", label: "Documents", code: "09" },
    ],
  },
  {
    group: "Intelligence",
    items: [{ to: "/app/assistant", label: "AI Assistant", code: "10" }],
  },
];

function AppLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { data: projectsData } = useProjects();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const [activeRole, setActiveRole] = useState<StudioRoleId>(() => {
    if (
      typeof window !== "undefined" &&
      typeof localStorage !== "undefined" &&
      typeof localStorage.getItem === "function"
    ) {
      try {
        return normalizeRoleId(localStorage.getItem("plinth_user_role") || user?.role);
      } catch {
        return normalizeRoleId(user?.role);
      }
    }
    return normalizeRoleId(user?.role);
  });

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof localStorage !== "undefined" &&
      typeof localStorage.setItem === "function"
    ) {
      try {
        localStorage.setItem("plinth_user_role", activeRole);
      } catch {
        // ignore
      }
    }
  }, [activeRole]);

  const currentProject = projectsData?.projects?.[0];
  const roleObj = ROLES_LIST.find((r) => r.id === activeRole) ?? ROLES_LIST[0]!;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Studio Bar (#034102 + #b6fe00 Brand Identity) */}
      <header className="sticky top-0 z-40 flex h-12 shrink-0 items-center gap-4 border-b-2 border-[#034102] bg-[#034102] px-4 text-[#f8f8f2]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-[#b6fe00]/50 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-[#b6fe00] uppercase lg:hidden"
          aria-label="Toggle navigation"
        >
          Menu
        </button>

        <Link
          to="/"
          className="flex items-center gap-2 rounded-full bg-[#b6fe00] px-3 py-1 text-[#034102]"
        >
          <span className="block h-2 w-2 rounded-full bg-[#034102]" aria-hidden />
          <Wordmark className="text-[11px] font-extrabold" />
        </Link>

        <span className="hidden h-4 w-px bg-[#b6fe00]/25 sm:block" />

        {/* Live Project Badge linking to Projects */}
        <Link
          to="/app/projects"
          className="hidden min-w-0 items-baseline gap-3 transition-opacity hover:opacity-85 sm:flex"
        >
          <span className="truncate text-[13px] font-semibold text-[#f8f8f2]">
            {currentProject?.name || "The Glass Pavilion"}
          </span>
          <span className="truncate font-mono text-[10px] tracking-[0.12em] text-[#b6fe00]/85 uppercase">
            {currentProject?.code || "PRJ-001"} · {currentProject?.location || "Bengaluru, KA"}
          </span>
        </Link>

        {/* Role Selector & User Actions */}
        <div className="ml-auto flex items-center gap-2.5">
          <Link
            to="/"
            className="hidden items-center rounded-full border border-[#b6fe00]/35 px-2.5 py-1 font-mono text-[10px] text-[#b6fe00] transition-colors hover:bg-[#b6fe00] hover:text-[#034102] md:inline-flex"
          >
            ← Site
          </Link>

          {/* Discipline Role Selector */}
          <div className="flex items-center gap-1.5 rounded-full border border-[#b6fe00]/35 bg-[#013900] px-2.5 py-1">
            <span className="font-mono text-[10px] text-[#b6fe00]/80 uppercase">Role:</span>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(normalizeRoleId(e.target.value))}
              className="cursor-pointer bg-transparent text-[11px] font-semibold text-[#f8f8f2] outline-none"
            >
              {ROLES_LIST.map((r) => (
                <option key={r.id} value={r.id} className="bg-[#034102] text-[#f8f8f2]">
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden text-[12px] text-[#f8f8f2]/80 sm:inline">
              {user?.full_name || "Sneha Iyer"}
            </span>
            <button
              onClick={logout}
              title="Sign Out"
              className="h-7 rounded-full border border-[#b6fe00]/50 px-3 font-mono text-[10px] font-semibold text-[#b6fe00] transition-colors hover:bg-[#b6fe00] hover:text-[#034102]"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "z-30 w-56 shrink-0 border-r border-border bg-sidebar",
            "fixed inset-y-12 left-0 overflow-y-auto transition-transform lg:sticky lg:top-12 lg:h-[calc(100vh-3rem)] lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <nav className="py-4">
            {nav.map((g) => (
              <div key={g.group} className="mb-5">
                <p className="label-tech px-4 pb-2">{g.group}</p>
                <ul>
                  {g.items.map((it) => {
                    const active =
                      it.to === "/app"
                        ? pathname === "/app" || pathname === "/app/"
                        : pathname.startsWith(it.to);
                    const isFocus = roleObj.focus.includes(it.label);
                    return (
                      <li key={it.to}>
                        <Link
                          to={it.to}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "relative flex items-center gap-3 border-l-4 px-4 py-2 text-[13px] transition-colors",
                            active
                              ? "border-[#034102] bg-[#b6fe00]/35 font-semibold text-[#034102]"
                              : "border-transparent text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
                          )}
                        >
                          <span className="font-mono text-[10px] opacity-65">{it.code}</span>
                          <span className="flex-1">{it.label}</span>
                          {isFocus && (
                            <span
                              className="h-2 w-2 rounded-full bg-[#034102] ring-2 ring-[#b6fe00]"
                              title={`Recommended for ${roleObj.label}`}
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="space-y-2 border-t border-border p-4">
            <p className="label-tech">Discipline Mode</p>
            <p className="text-[12px] font-semibold text-foreground">{roleObj.label}</p>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Recommended modules highlighted with indicator.
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
