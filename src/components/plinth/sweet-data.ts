import type { StudioRoleId } from "@/lib/auth-nav";

export type Arch3DMode =
  "hero" | "site" | "floor-plan" | "massing" | "interiors" | "cost" | "compliance";

export interface PullMenuItem {
  code: string;
  label: string;
  sub: string;
  to: string;
  thumb: string;
}

export const PULL_MENU_ITEMS: PullMenuItem[] = [
  {
    code: "01",
    label: "SITE & PLOT AI",
    sub: "Coordinates, setbacks, solar & FAR",
    to: "/app/site-analysis",
    thumb: "/assets/plot.jpg",
  },
  {
    code: "02",
    label: "FLOOR PLANNER",
    sub: "2D CAD + YOLOv8 AI detection",
    to: "/app/floor-planner",
    thumb: "/assets/blueprint.jpg",
  },
  {
    code: "03",
    label: "3D & INTERIORS",
    sub: "Massing, materials & furniture fit",
    to: "/app/visualization",
    thumb: "/assets/glass.jpg",
  },
  {
    code: "04",
    label: "COST & BOQ",
    sub: "Live quantities & package ledger",
    to: "/app/cost",
    thumb: "/assets/facade.jpg",
  },
  {
    code: "05",
    label: "COMPLIANCE & AI",
    sub: "NBC / BBMP rules & building copilot",
    to: "/app/compliance",
    thumb: "/assets/wireframe.jpg",
  },
  {
    code: "06",
    label: "FULL STUDIO",
    sub: "All 11 workspaces & 9 roles",
    to: "/app",
    thumb: "/assets/final.jpg",
  },
];

export interface OrbitMode {
  id: Exclude<Arch3DMode, "hero">;
  rollLabel: string;
  topWord: string;
  bottomWord: string;
  subhead: string;
  bg: string;
  ink: string;
  tagBg: string;
  tagInk: string;
  accent: string;
  tags: readonly string[];
  description: string;
  ctaLabel: string;
  to: string;
  leftCardImg: string;
  leftCardAlt: string;
  leftCardCaption: string;
  rightCardImg: string;
  rightCardAlt: string;
  rightCardCaption: string;
}

export const ORBIT_MODES: readonly OrbitMode[] = [
  {
    id: "site",
    rollLabel: "01 PLOT",
    topWord: "READ THE",
    bottomWord: "GROUND",
    subhead: "MEET THE 6 ENGINES",
    bg: "#1e3a8a",
    ink: "#f4f1ea",
    tagBg: "#e8502b",
    tagInk: "#ffffff",
    accent: "#60a5fa",
    tags: ["SOLAR PATH", "SETBACKS", "FAR 1.75"],
    description:
      "Drop a coordinate or plot polygon. PLINTH computes buildable envelope, setbacks, ground coverage, and solar orientation in 3D before you draw a single wall.",
    ctaLabel: "OPEN PLOT AI",
    to: "/app/site-analysis",
    leftCardImg: "/assets/plot.jpg",
    leftCardAlt: "Site analysis buildable plot perimeter",
    leftCardCaption: "445.9 sqm · Bengaluru",
    rightCardImg: "/assets/wireframe.jpg",
    rightCardAlt: "Wireframe buildable volume envelope",
    rightCardCaption: "Max Height 12.0m",
  },
  {
    id: "floor-plan",
    rollLabel: "02 PLAN",
    topWord: "DRAW THE",
    bottomWord: "PLATES",
    subhead: "MEET THE 6 ENGINES",
    bg: "#f4f1ea",
    ink: "#111317",
    tagBg: "#2952ff",
    tagInk: "#ffffff",
    accent: "#2952ff",
    tags: ["2D CAD", "YOLO DETECT", "CORE GRID"],
    description:
      "Edit live calibrated rooms, detect doors, windows, and zones from uploaded blueprints using YOLOv8 vision, and extrude floor geometry straight into 3D.",
    ctaLabel: "OPEN PLANNER",
    to: "/app/floor-planner",
    leftCardImg: "/assets/blueprint.jpg",
    leftCardAlt: "Architectural blueprint plan",
    leftCardCaption: "Calibrated 1:100 Grid",
    rightCardImg: "/assets/atrium.jpg",
    rightCardAlt: "Circulation and daylight atrium",
    rightCardCaption: "5 Ground Rooms Live",
  },
  {
    id: "massing",
    rollLabel: "03 3D",
    topWord: "EXTRUDE",
    bottomWord: "MASSING",
    subhead: "MEET THE 6 ENGINES",
    bg: "#111317",
    ink: "#f4f1ea",
    tagBg: "#2952ff",
    tagInk: "#ffffff",
    accent: "#e8502b",
    tags: ["3D EXTRUDE", "FACADE LOD", "DAYLIGHT"],
    description:
      "Floor plates extrude automatically into structural frames, glazing mullions, and solar massing studies—no manual export to external 3D tools.",
    ctaLabel: "OPEN 3D VIEW",
    to: "/app/visualization",
    leftCardImg: "/assets/frame.jpg",
    leftCardAlt: "Structural frame elevation",
    leftCardCaption: "Steel & Slab Cores",
    rightCardImg: "/assets/glass.jpg",
    rightCardAlt: "Glazing facade system",
    rightCardCaption: "Streamed Envelope",
  },
  {
    id: "interiors",
    rollLabel: "04 ROOMS",
    topWord: "DRESS THE",
    bottomWord: "INTERIOR",
    subhead: "MEET THE 6 ENGINES",
    bg: "#c84b28",
    ink: "#fff8f3",
    tagBg: "#111317",
    tagInk: "#f4f1ea",
    accent: "#f5d08a",
    tags: ["INTERIOR AI", "MATERIALS", "CLEARANCE"],
    description:
      "Specify Warm Travertine, Brushed Oak, or Fair-face Concrete room by room with anthropometric furniture fit, lead times, and attached rates.",
    ctaLabel: "OPEN INTERIORS",
    to: "/app/interior",
    leftCardImg: "/assets/atrium.jpg",
    leftCardAlt: "Daylit architectural atrium interior",
    leftCardCaption: "Material Palettes",
    rightCardImg: "/assets/facade.jpg",
    rightCardAlt: "Architectural glazing and material study",
    rightCardCaption: "Anthropometric Fit",
  },
  {
    id: "cost",
    rollLabel: "05 COST",
    topWord: "PRICE THE",
    bottomWord: "LEDGER",
    subhead: "MEET THE 6 ENGINES",
    bg: "#d8b26e",
    ink: "#16110a",
    tagBg: "#111317",
    tagInk: "#f4f1ea",
    accent: "#2952ff",
    tags: ["AUTO BOQ", "LIVE RATES", "CSV EXPORT"],
    description:
      "Every slab, wall, and finish drives a live Indian-Rupee cost surface and Bill of Quantities—change a room size and watch the budget update instantaneously.",
    ctaLabel: "OPEN COST & BOQ",
    to: "/app/cost",
    leftCardImg: "/assets/facade.jpg",
    leftCardAlt: "Facade system material takeoff",
    leftCardCaption: "Budget ₹1.50 Cr",
    rightCardImg: "/assets/final.jpg",
    rightCardAlt: "Completed Pavilion cost model",
    rightCardCaption: "Variance −3.2%",
  },
  {
    id: "compliance",
    rollLabel: "06 CODE",
    topWord: "PROVE IT",
    bottomWord: "COMPLIES",
    subhead: "MEET THE 6 ENGINES",
    bg: "#16382e",
    ink: "#f4f1ea",
    tagBg: "#e8502b",
    tagInk: "#ffffff",
    accent: "#6ee7b7",
    tags: ["NBC 2016", "BBMP / VASTU", "AI COPILOT"],
    description:
      "Run continuous rule-graph audits for setbacks, stair widths, fire travel, and ECBC envelope U-values—or ask the AI Assistant anything about the building.",
    ctaLabel: "RUN AUDIT",
    to: "/app/compliance",
    leftCardImg: "/assets/wireframe.jpg",
    leftCardAlt: "Structural grid compliance model",
    leftCardCaption: "NBC & BBMP Rules",
    rightCardImg: "/assets/plot.jpg",
    rightCardAlt: "Site setback rule envelope",
    rightCardCaption: "Live PDF Reports",
  },
] as const;

export interface JourneyChapter {
  num: string;
  headline: string;
  handNote: string;
  sub: string;
  cta: string;
  to: string;
  img: string;
  imgAlt: string;
  tiltClass: string;
  mode3d: Exclude<Arch3DMode, "hero">;
}

export const JOURNEY_CHAPTERS: readonly JourneyChapter[] = [
  {
    num: "1",
    headline: "TO IDEATE",
    handNote: "ground to calibrated plan",
    sub: "Start with bare coordinates, solar azimuth, and setbacks — then resolve circulation-correct floor plates with AI floorplan detection.",
    cta: "LAUNCH FLOOR PLANNER →",
    to: "/app/floor-planner",
    img: "/assets/blueprint.jpg",
    imgAlt: "Architectural floor plan drafting sheet",
    tiltClass: "-rotate-3",
    mode3d: "floor-plan",
  },
  {
    num: "2",
    headline: "TO SIMULATE",
    handNote: "live cost & 3D massing",
    sub: "Extrude massing, test Warm Travertine & steel specs, and track every rupee across Substructure, Superstructure, and Interiors in real time.",
    cta: "INSPECT COST & BOQ →",
    to: "/app/cost",
    img: "/assets/facade.jpg",
    imgAlt: "Architectural steel and glass facade",
    tiltClass: "rotate-2",
    mode3d: "massing",
  },
  {
    num: "3",
    headline: "TO VALIDATE",
    handNote: "code & copilot verified",
    sub: "Audit BBMP setbacks, NBC fire stairs, and Vastu zones automatically, export versioned PDF sets, and query the AI Copilot directly.",
    cta: "ASK BUILDING AI →",
    to: "/app/assistant",
    img: "/assets/final.jpg",
    imgAlt: "Completed Glass Pavilion architectural render",
    tiltClass: "-rotate-2",
    mode3d: "compliance",
  },
] as const;

export const FOOTER_ROLE_SHORTCUTS: { label: string; roleId: StudioRoleId }[] = [
  { label: "Architect", roleId: "architect" },
  { label: "Structural Eng", roleId: "structural" },
  { label: "Interior Lead", roleId: "interior" },
  { label: "Client", roleId: "client" },
  { label: "Admin", roleId: "super_admin" },
];

export const FOOTER_ROLL_BADGES = [
  { label: "PLOT AI", bg: "#2952ff", ink: "#ffffff", to: "/app/site-analysis" },
  { label: "FLOOR AI", bg: "#e8502b", ink: "#ffffff", to: "/app/floor-planner" },
  { label: "COST BOQ", bg: "#d8b26e", ink: "#16110a", to: "/app/cost" },
  { label: "CODE AI", bg: "#f4f1ea", ink: "#111317", to: "/app/compliance" },
] as const;
