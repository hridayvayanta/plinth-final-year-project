import { createFileRoute } from "@tanstack/react-router";
import { useSmoothScroll } from "@/lib/anim";
import { Preloader } from "@/components/plinth/Preloader";
import { PullMenu } from "@/components/plinth/PullMenu";
import { SoundPill } from "@/components/plinth/SoundPill";
import { SweetHero } from "@/components/plinth/SweetHero";
import { OrbitalDial } from "@/components/plinth/OrbitalDial";
import { GiantJourney } from "@/components/plinth/GiantJourney";
import { MakeItBuild } from "@/components/plinth/MakeItBuild";
import { SweetFooter } from "@/components/plinth/SweetFooter";

const title = "PLINTH — AI-Powered Architectural Design & Project Management Platform";
const description =
  "Explore PLINTH, an integrated architectural workspace for floor planning, interior design, 3D visualization, site analysis, cost estimation, compliance and AI-assisted project management.";
const keywords =
  "AI architecture software, architectural design platform, AI floor planner, architectural project management, interior design software, architectural visualization, construction cost estimation, site analysis software, architectural AI assistant, ArchTech, architectural planning tools, AI-powered architecture";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  useSmoothScroll();

  return (
    <main className="sweet-body min-h-screen overflow-x-hidden bg-[#111317]">
      <Preloader />
      <PullMenu />
      <SoundPill />
      <SweetHero />
      <OrbitalDial />
      <GiantJourney />
      <MakeItBuild />
      <SweetFooter />
    </main>
  );
}
