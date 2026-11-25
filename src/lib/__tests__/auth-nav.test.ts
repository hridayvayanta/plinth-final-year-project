import { afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  STUDIO_ROLE_IDS,
  buildLoginUrl,
  normalizeRoleId,
  openPlinthTarget,
  sanitizeNextPath,
} from "../auth-nav.ts";
import { ai, auth, clearToken, getToken, setToken } from "../api.ts";

describe("sanitizeNextPath", () => {
  it("preserves safe internal app paths", () => {
    assert.equal(sanitizeNextPath("/app/floor-planner"), "/app/floor-planner");
    assert.equal(sanitizeNextPath("/app/assistant?prompt=hello"), "/app/assistant?prompt=hello");
  });

  it("rejects external, protocol-relative, backslash, login, and empty paths", () => {
    assert.equal(sanitizeNextPath("https://evil.com"), "/app");
    assert.equal(sanitizeNextPath("http://evil.com/app"), "/app");
    assert.equal(sanitizeNextPath("//evil.com"), "/app");
    assert.equal(sanitizeNextPath("/\\evil.com"), "/app");
    assert.equal(sanitizeNextPath("/login"), "/app");
    assert.equal(sanitizeNextPath("/login?next=/app"), "/app");
    assert.equal(sanitizeNextPath(null), "/app");
    assert.equal(sanitizeNextPath(undefined), "/app");
    assert.equal(sanitizeNextPath("   "), "/app");
  });
});

describe("normalizeRoleId", () => {
  it("normalizes hyphenated, uppercased, and backend role variants", () => {
    assert.equal(normalizeRoleId("super-admin"), "super_admin");
    assert.equal(normalizeRoleId("SUPER_ADMIN"), "super_admin");
    assert.equal(normalizeRoleId("project-admin"), "project_admin");
    assert.equal(normalizeRoleId("structural_engineer"), "structural");
    assert.equal(normalizeRoleId("interior_designer"), "interior");
  });

  it("falls back to architect for unknown or missing roles", () => {
    assert.equal(normalizeRoleId("unknown"), "architect");
    assert.equal(normalizeRoleId(null), "architect");
    assert.equal(normalizeRoleId(undefined), "architect");
  });

  it("preserves every canonical StudioRoleId", () => {
    for (const roleId of STUDIO_ROLE_IDS) {
      assert.equal(normalizeRoleId(roleId), roleId);
    }
  });
});

describe("buildLoginUrl", () => {
  it("encodes safe target path into login next query param", () => {
    assert.equal(buildLoginUrl("/app/cost"), "/login?next=%2Fapp%2Fcost");
  });

  it("sanitizes unsafe targets before building login URL", () => {
    assert.equal(buildLoginUrl("https://evil.com"), "/login?next=%2Fapp");
  });
});

describe("openPlinthTarget", () => {
  const originalWindow = globalThis.window;

  afterEach(() => {
    clearToken();
    if (originalWindow === undefined) {
      delete (globalThis as { window?: unknown }).window;
    } else {
      (globalThis as { window: unknown }).window = originalWindow;
    }
  });

  it("redirects unauthenticated callers to login with next param", () => {
    const fakeWindow = { location: { href: "", pathname: "/", search: "" } };
    (globalThis as { window: unknown }).window = fakeWindow;
    clearToken();

    openPlinthTarget("/app/floor-planner");
    assert.equal(fakeWindow.location.href, "/login?next=%2Fapp%2Ffloor-planner");
  });

  it("navigates authenticated callers directly to sanitized target", () => {
    const fakeWindow = { location: { href: "", pathname: "/", search: "" } };
    (globalThis as { window: unknown }).window = fakeWindow;
    setToken("test-token");

    openPlinthTarget("/app/floor-planner");
    assert.equal(fakeWindow.location.href, "/app/floor-planner");
  });
});

describe("api 401 redirect guard", () => {
  const originalWindow = globalThis.window;
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    clearToken();
    globalThis.fetch = originalFetch;
    if (originalWindow === undefined) {
      delete (globalThis as { window?: unknown }).window;
    } else {
      (globalThis as { window: unknown }).window = originalWindow;
    }
  });

  it("apiFetch preserves deep link on 401 outside /login", async () => {
    const fakeWindow = {
      location: { href: "", pathname: "/app/cost", search: "?view=boq" },
    };
    (globalThis as { window: unknown }).window = fakeWindow;
    setToken("expired-token");
    globalThis.fetch = async () => new Response(null, { status: 401 });

    await assert.rejects(() => auth.me(), /Unauthorized/);
    assert.equal(getToken(), null);
    assert.equal(fakeWindow.location.href, "/login?next=%2Fapp%2Fcost%3Fview%3Dboq");
  });

  it("apiFetch does not redirect on 401 while already on /login", async () => {
    const fakeWindow = {
      location: { href: "/login", pathname: "/login", search: "" },
    };
    (globalThis as { window: unknown }).window = fakeWindow;
    setToken("stale-token");
    globalThis.fetch = async () => new Response(null, { status: 401 });

    await assert.rejects(() => auth.login("user@plinth.ai", "wrong"), /Unauthorized/);
    assert.equal(getToken(), null);
    assert.equal(fakeWindow.location.href, "/login");
  });

  it("apiUpload preserves deep link on 401 outside /login and skips redirect on /login", async () => {
    const fakeWindow = {
      location: {
        href: "",
        pathname: "/app/floor-planner",
        search: "?floor=2",
      },
    };
    (globalThis as { window: unknown }).window = fakeWindow;
    setToken("expired-token");
    globalThis.fetch = async () => new Response(null, { status: 401 });

    const dummyFile = new File(["plan"], "plan.png", { type: "image/png" });
    await assert.rejects(() => ai.detectFloorplan(dummyFile), /Unauthorized/);
    assert.equal(fakeWindow.location.href, "/login?next=%2Fapp%2Ffloor-planner%3Ffloor%3D2");

    fakeWindow.location = { href: "/login", pathname: "/login", search: "" };
    await assert.rejects(() => ai.detectFloorplan(dummyFile), /Unauthorized/);
    assert.equal(fakeWindow.location.href, "/login");
  });
});
