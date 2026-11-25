export type Arch3DMode =
  "hero" | "site" | "floor-plan" | "massing" | "interiors" | "cost" | "compliance";

export interface WorkspaceCategory {
  id: "studio" | "design" | "delivery" | "intelligence";
  name: string;
  summary: string;
  modules: { code: string; name: string; to: string; note?: string }[];
}

export const WORKSPACE_CATEGORIES: readonly WorkspaceCategory[] = [
  {
    id: "studio",
    name: "Studio",
    summary:
      "Organize your workspace and manage architectural projects from a central environment.",
    modules: [
      { code: "00", name: "Overview", to: "/app" },
      { code: "01", name: "Projects", to: "/app/projects" },
    ],
  },
  {
    id: "design",
    name: "Design",
    summary: "Explore floor plans, interiors, architectural visualization and site intelligence.",
    modules: [
      { code: "02", name: "Floor Planner", to: "/app/floor-planner" },
      { code: "03", name: "Interior Studio", to: "/app/interior" },
      { code: "04", name: "Visualization", to: "/app/visualization" },
      { code: "05", name: "Site Analysis", to: "/app/site-analysis" },
    ],
  },
  {
    id: "delivery",
    name: "Delivery",
    summary: "Manage costs, materials, compliance, collaboration and documentation.",
    modules: [
      {
        code: "06",
        name: "Cost & Materials",
        to: "/app/cost",
        note: "Indicative estimates",
      },
      {
        code: "07",
        name: "Compliance",
        to: "/app/compliance",
        note: "Decision support only",
      },
      { code: "08", name: "Collaboration", to: "/app/collaboration" },
      { code: "09", name: "Documents", to: "/app/documents" },
    ],
  },
  {
    id: "intelligence",
    name: "Intelligence",
    summary: "Access AI-powered assistance throughout your architectural workflow.",
    modules: [
      {
        code: "10",
        name: "AI Assistant",
        to: "/app/assistant",
        note: "Supportive design tool",
      },
    ],
  },
] as const;

export interface PullMenuItem {
  code: string;
  category: string;
  label: string;
  sub: string;
  to: string;
  thumb: string;
}

export const PULL_MENU_ITEMS: PullMenuItem[] = [
  {
    code: "00–01",
    category: "STUDIO",
    label: "OVERVIEW & PROJECTS",
    sub: "Central project dashboard, register and activity summary",
    to: "/app/projects",
    thumb: "/assets/final.jpg",
  },
  {
    code: "02",
    category: "DESIGN",
    label: "FLOOR PLANNER",
    sub: "2D calibrated floor planning, rooms and YOLOv8 detection",
    to: "/app/floor-planner",
    thumb: "/assets/blueprint.jpg",
  },
  {
    code: "03–04",
    category: "DESIGN",
    label: "INTERIOR STUDIO & VISUALIZATION",
    sub: "Material palettes, lighting previews and exterior/interior views",
    to: "/app/visualization",
    thumb: "/assets/glass.jpg",
  },
  {
    code: "05",
    category: "DESIGN",
    label: "SITE ANALYSIS",
    sub: "Plot dimensions, FAR envelope, sun path and Vastu orientation",
    to: "/app/site-analysis",
    thumb: "/assets/plot.jpg",
  },
  {
    code: "06–09",
    category: "DELIVERY",
    label: "COST, COMPLIANCE, COLLAB & DOCS",
    sub: "Indicative BOQ, rule checklists, review threads and PDF/CSV exports",
    to: "/app/cost",
    thumb: "/assets/facade.jpg",
  },
  {
    code: "10",
    category: "INTELLIGENCE",
    label: "AI ASSISTANT",
    sub: "Context-aware architectural design and planning copilot",
    to: "/app/assistant",
    thumb: "/assets/wireframe.jpg",
  },
];

export interface OrbitMode {
  id: Exclude<Arch3DMode, "hero">;
  rollLabel: string;
  category: string;
  topWord: string;
  bottomWord: string;
  subhead: string;
  bg: string;
  ink: string;
  tagBg: string;
  tagInk: string;
  tags: readonly string[];
  description: string;
  caveat?: string;
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
    rollLabel: "05 SITE",
    category: "DESIGN · 05",
    topWord: "UNDERSTAND THE",
    bottomWord: "LAND",
    subhead: "EVERYTHING YOUR PROJECT NEEDS. CONNECTED.",
    bg: "#1e3a8a",
    ink: "#f4f1ea",
    tagBg: "#e8502b",
    tagInk: "#ffffff",
    tags: ["PLOT & FAR", "SUN & WIND", "AI SITE ADVICE"],
    description:
      "Understand the land before designing on it. Review plot dimensions, permissible FAR, setbacks, solar orientation, and Vastu zone checks in one site intelligence workspace.",
    ctaLabel: "OPEN SITE ANALYSIS",
    to: "/app/site-analysis",
    leftCardImg: "/assets/plot.jpg",
    leftCardAlt: "Site analysis plot envelope",
    leftCardCaption: "Plot & Envelope Data",
    rightCardImg: "/assets/wireframe.jpg",
    rightCardAlt: "3D height and setback wireframe",
    rightCardCaption: "FAR & Setback Bounds",
  },
  {
    id: "floor-plan",
    rollLabel: "02 PLAN",
    category: "DESIGN · 02",
    topWord: "FLOOR",
    bottomWord: "PLANNER",
    subhead: "EVERYTHING YOUR PROJECT NEEDS. CONNECTED.",
    bg: "#f4f1ea",
    ink: "#111317",
    tagBg: "#2952ff",
    tagInk: "#ffffff",
    tags: ["2D PLANNING", "SCALE & MEASURE", "YOLO DETECT"],
    description:
      "Turn spatial requirements into meaningful spaces. Place and resize rooms on a calibrated 2D grid, detect doors/windows/zones from floor plan images, and track overlap rules.",
    ctaLabel: "OPEN FLOOR PLANNER",
    to: "/app/floor-planner",
    leftCardImg: "/assets/blueprint.jpg",
    leftCardAlt: "2D calibrated architectural floor plan",
    leftCardCaption: "Calibrated 2D Canvas",
    rightCardImg: "/assets/atrium.jpg",
    rightCardAlt: "Spatial layout and circulation",
    rightCardCaption: "Room & Door Detection",
  },
  {
    id: "massing",
    rollLabel: "04 3D",
    category: "DESIGN · 04",
    topWord: "VISUALIZE",
    bottomWord: "SPACE",
    subhead: "EVERYTHING YOUR PROJECT NEEDS. CONNECTED.",
    bg: "#111317",
    ink: "#f4f1ea",
    tagBg: "#2952ff",
    tagInk: "#ffffff",
    tags: ["EXTERIOR VIEWS", "INTERIOR VIEWS", "CONCEPT DECK"],
    description:
      "Experience the space before it exists. Compare exterior facade, living, dining, and lighting studies synchronized with your active project model.",
    ctaLabel: "OPEN VISUALIZATION",
    to: "/app/visualization",
    leftCardImg: "/assets/frame.jpg",
    leftCardAlt: "Structural elevation study",
    leftCardCaption: "Exterior & Structure",
    rightCardImg: "/assets/glass.jpg",
    rightCardAlt: "Daylight and facade visualization",
    rightCardCaption: "Perspective Previews",
  },
  {
    id: "interiors",
    rollLabel: "03 STUDIO",
    category: "DESIGN · 03",
    topWord: "INTERIOR",
    bottomWord: "STUDIO",
    subhead: "EVERYTHING YOUR PROJECT NEEDS. CONNECTED.",
    bg: "#c84b28",
    ink: "#fff8f3",
    tagBg: "#111317",
    tagInk: "#f4f1ea",
    tags: ["MATERIALS", "PALETTES", "ROOM STYLING"],
    description:
      "Design spaces that feel as good as they function. Explore materials, textures, colour palettes, and room-by-room interior finishes connected to project quantities.",
    ctaLabel: "OPEN INTERIOR STUDIO",
    to: "/app/interior",
    leftCardImg: "/assets/atrium.jpg",
    leftCardAlt: "Interior daylight study",
    leftCardCaption: "Material Selection",
    rightCardImg: "/assets/facade.jpg",
    rightCardAlt: "Architectural interior surface finishes",
    rightCardCaption: "Palette & Styling",
  },
  {
    id: "cost",
    rollLabel: "06 COST",
    category: "DELIVERY · 06",
    topWord: "COST &",
    bottomWord: "MATERIALS",
    subhead: "EVERYTHING YOUR PROJECT NEEDS. CONNECTED.",
    bg: "#d8b26e",
    ink: "#16110a",
    tagBg: "#111317",
    tagInk: "#f4f1ea",
    tags: ["BUDGET LEDGER", "BOQ CSV", "PACKAGE RATES"],
    description:
      "Better decisions. More predictable budgets. Track package breakdowns across Substructure, Superstructure, Envelope, and Interiors, and export Bill of Quantities CSVs.",
    caveat: "All cost figures are indicative estimates rather than guaranteed quotations.",
    ctaLabel: "OPEN COST & MATERIALS",
    to: "/app/cost",
    leftCardImg: "/assets/facade.jpg",
    leftCardAlt: "Material and cost package breakdown",
    leftCardCaption: "Package Breakdown",
    rightCardImg: "/assets/final.jpg",
    rightCardAlt: "Completed project budget tracking",
    rightCardCaption: "Indicative BOQ Export",
  },
  {
    id: "compliance",
    rollLabel: "07 CODE",
    category: "DELIVERY · 07",
    topWord: "DESIGN TO",
    bottomWord: "COMPLY",
    subhead: "EVERYTHING YOUR PROJECT NEEDS. CONNECTED.",
    bg: "#16382e",
    ink: "#f4f1ea",
    tagBg: "#e8502b",
    tagInk: "#ffffff",
    tags: ["SETBACKS & FAR", "NBC / BBMP", "PDF REPORTS"],
    description:
      "Design with regulations in mind. Run structured checklists covering setbacks, FAR, building height, stair width, ventilation, and ECBC envelope rules.",
    caveat: "Provides decision support and does not replace statutory building approvals.",
    ctaLabel: "OPEN COMPLIANCE",
    to: "/app/compliance",
    leftCardImg: "/assets/wireframe.jpg",
    leftCardAlt: "Regulatory compliance envelope",
    leftCardCaption: "Rule Checklists",
    rightCardImg: "/assets/plot.jpg",
    rightCardAlt: "Setback and height considerations",
    rightCardCaption: "Decision Support",
  },
] as const;

export interface JourneyChapter {
  num: string;
  headline: string;
  handNote: string;
  steps: readonly { num: string; label: string; to: string }[];
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
    headline: "FOUNDATION & PLAN",
    handNote: "steps 01 – 03",
    steps: [
      { num: "01", label: "Create a project", to: "/app/projects" },
      { num: "02", label: "Understand the site", to: "/app/site-analysis" },
      { num: "03", label: "Develop the floor plan", to: "/app/floor-planner" },
    ],
    sub: "Start in Projects & Site Analysis with plot bounds and FAR, then calibrate rooms and openings directly inside Floor Planner.",
    cta: "OPEN FLOOR PLANNER →",
    to: "/app/floor-planner",
    img: "/assets/blueprint.jpg",
    imgAlt: "Architectural floor plan drafting sheet",
    tiltClass: "-rotate-3",
    mode3d: "floor-plan",
  },
  {
    num: "2",
    headline: "SPACE & BUDGET",
    handNote: "steps 04 – 06",
    steps: [
      { num: "04", label: "Design the interiors", to: "/app/interior" },
      { num: "05", label: "Visualize the concept", to: "/app/visualization" },
      { num: "06", label: "Estimate costs & materials", to: "/app/cost" },
    ],
    sub: "Explore material palettes in Interior Studio, preview architectural views in Visualization, and monitor indicative budgets in Cost & Materials.",
    cta: "OPEN COST & MATERIALS →",
    to: "/app/cost",
    img: "/assets/facade.jpg",
    imgAlt: "Architectural facade and material study",
    tiltClass: "rotate-2",
    mode3d: "massing",
  },
  {
    num: "3",
    headline: "REVIEW & ISSUE",
    handNote: "steps 07 – 09",
    steps: [
      { num: "07", label: "Review compliance", to: "/app/compliance" },
      { num: "08", label: "Collaborate with team", to: "/app/collaboration" },
      { num: "09", label: "Prepare documentation", to: "/app/documents" },
    ],
    sub: "Run NBC/BBMP compliance checklists, coordinate review threads across disciplines, and organize exports in Documents.",
    cta: "OPEN DOCUMENTS →",
    to: "/app/documents",
    img: "/assets/final.jpg",
    imgAlt: "Completed architectural documentation view",
    tiltClass: "-rotate-2",
    mode3d: "compliance",
  },
] as const;

export const AI_STARTER_PROMPTS = [
  "Reduce room cost by 8%",
  "Check NBC 2016 compliance",
  "Suggest warmer material palette",
] as const;

export const FOOTER_ROLL_BADGES = [
  { label: "STUDIO", bg: "#2952ff", ink: "#ffffff", to: "/app" },
  { label: "DESIGN", bg: "#e8502b", ink: "#ffffff", to: "/app/floor-planner" },
  { label: "DELIVERY", bg: "#d8b26e", ink: "#16110a", to: "/app/cost" },
  { label: "AI COPILOT", bg: "#f4f1ea", ink: "#111317", to: "/app/assistant" },
] as const;
