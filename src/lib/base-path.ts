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
