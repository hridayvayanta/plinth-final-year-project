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

const title = "PLINTH — Architecture, computed";
const description =
  "PLINTH is an AI platform that carries a building from bare ground to issued drawings: floor plans, massing, structure, cost, compliance and BOQ in one continuous model.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
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
    <main className="sweet-body min-h-screen overflow-x-hidden bg-[#034102]">
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
