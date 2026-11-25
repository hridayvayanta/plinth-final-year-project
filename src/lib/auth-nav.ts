import { getToken } from "./api.ts";

export function normalizeBasePath(base?: string): string {
  const raw =
    base ??
    (typeof import.meta !== "undefined" && typeof import.meta.env !== "undefined"
      ? import.meta.env.BASE_URL
      : "/");
  if (!raw || raw === "/") return "";
  const withLeading = raw.startsWith("/") ? raw : `/${raw}`;
  return withLeading.replace(/\/+$/, "");
}

export function withBasePath(path: string, base?: string): string {
  const normalizedBase = normalizeBasePath(base);
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (!normalizedBase) return cleanPath;
  if (cleanPath === normalizedBase || cleanPath.startsWith(`${normalizedBase}/`)) {
    return cleanPath;
  }
  return `${normalizedBase}${cleanPath}`;
}

export function stripBasePath(pathname: string, base?: string): string {
  const normalizedBase = normalizeBasePath(base);
  if (!normalizedBase) return pathname || "/";
  if (pathname === normalizedBase) return "/";
  if (pathname.startsWith(`${normalizedBase}/`)) {
    return pathname.slice(normalizedBase.length) || "/";
  }
  return pathname || "/";
}

export const STUDIO_ROLE_IDS = [
  "architect",
  "project_admin",
  "super_admin",
  "client",
  "interior",
  "builder",
  "structural",
  "site",
  "vendor",
] as const;

export type StudioRoleId = (typeof STUDIO_ROLE_IDS)[number];

const STUDIO_ROLE_SET: ReadonlySet<string> = new Set(STUDIO_ROLE_IDS);

const ROLE_ALIASES: Readonly<Record<string, StudioRoleId>> = {
  superadmin: "super_admin",
  projectadmin: "project_admin",
  structural_engineer: "structural",
  interior_designer: "interior",
  site_engineer: "site",
  builder_contractor: "builder",
  contractor: "builder",
  vendor_supplier: "vendor",
  supplier: "vendor",
};

const DEFAULT_APP_PATH = "/app";

/**
 * Normalizes an arbitrary role string (backend enum, hyphenated marketing ID,
 * or display-style key) into a canonical `StudioRoleId`.
 */
export function normalizeRoleId(raw: string | null | undefined): StudioRoleId {
  if (!raw) return "architect";
  const normalized = raw
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  if (!normalized) return "architect";
  if (STUDIO_ROLE_SET.has(normalized)) {
    return normalized as StudioRoleId;
  }
  return ROLE_ALIASES[normalized] ?? "architect";
}

/**
 * Validates and normalizes an internal redirect target, rejecting external
 * origins, protocol-relative URLs, backslashes, and `/login` loops.
 */
export function sanitizeNextPath(raw: string | null | undefined): string {
  if (!raw) return DEFAULT_APP_PATH;
  const trimmed = raw.trim();
  if (
    !trimmed ||
    !trimmed.startsWith("/") ||
    trimmed.startsWith("//") ||
    trimmed.includes("\\") ||
    /[\r\n\t]/.test(trimmed)
  ) {
    return DEFAULT_APP_PATH;
  }

  try {
    const parsed = new URL(trimmed, "https://plinth.local");
    if (parsed.origin !== "https://plinth.local") {
      return DEFAULT_APP_PATH;
    }
    if (parsed.pathname === "/login" || parsed.pathname.startsWith("/login/")) {
      return DEFAULT_APP_PATH;
    }
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return DEFAULT_APP_PATH;
  }
}

/**
 * Builds a `/login?next=...` URL preserving a sanitized deep-link target.
 */
export function buildLoginUrl(targetPath: string): string {
  const safeTarget = sanitizeNextPath(targetPath);
  return `/login?next=${encodeURIComponent(safeTarget)}`;
}

/**
 * Navigates directly to `targetPath` when an auth token is present, or sends
 * the user through `/login?next=...` so they return there after sign-in.
 */
export function openPlinthTarget(targetPath: string): void {
  if (typeof window === "undefined") return;
  const safeTarget = sanitizeNextPath(targetPath);
  const dest = getToken() ? safeTarget : buildLoginUrl(safeTarget);
  window.location.href = withBasePath(dest);
}
