"use client";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePostSecurityClues } from "@/hooks/use-post-security-clues";
import { getAnchorId } from "@/lib/anchors";
import { AirportArea, airportAreaNames, Clue } from "@/types/clue";
import { ClueItem } from "./clue-item";
import { PostSecuritySidebar } from "./sidebar";

export default function Page() {
  const localizedClues = usePostSecurityClues();

  const grouped: Record<AirportArea, Clue[]> = {
    [AirportArea.AIRPORT_WIDE]: [],
    [AirportArea.CENTRAL_TERMINAL]: [],
    [AirportArea.CONCOURSE_A]: [],
    [AirportArea.CONCOURSE_B]: [],
    [AirportArea.CONCOURSE_C]: [],
    [AirportArea.CONCOURSE_D]: [],
    [AirportArea.NORTH_SATELLITE]: [],
    [AirportArea.SOUTH_SATELLITE]: [],
  };

  for (const clue of localizedClues) {
    if (!grouped[clue.airportArea]) grouped[clue.airportArea] = [];
    grouped[clue.airportArea].push(clue);
  }

  return (
    <main className="min-h-screen flex flex-col">
      <SidebarProvider>
        <PostSecuritySidebar />
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-50 flex h-12 shrink-0 items-center gap-2 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger aria-label="Open sidebar" className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="inline !text-base font-normal m-0 text-[var(--primary)]">
              SEA scavenger hunt
            </h1>
          </header>
          <div className="flex-1 p-4">
            <div className="grid gap-6 max-w-2xl mx-auto">
              <p>
                Welcome to SEA! This scavenger hunt helps you explore the entire
                airport. How many items can you find?
              </p>
              <p>
                All answers and items can be found in public spaces. There is no
                need to go through any doors, and don&apos;t accidentally exit
                to the pre-security side of the airport when hunting for items!
              </p>
              <p>
                Your answers are stored locally in your browser and are never
                sent to a server.
              </p>
              {airportAreaNames.map(({ area, name }) => {
                const areaClues = grouped[area];

                if (!areaClues || areaClues.length === 0) return;

                const anchorId = getAnchorId(name);

                return (
                  <div
                    key={area}
                    role="region"
                    aria-labelledby={anchorId}
                    className="space-y-2"
                  >
                    <a
                      href={`#${anchorId}`}
                      className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <h2
                        id={anchorId}
                        tabIndex={-1}
                        className="flex items-center gap-2 text-[var(--primary)]"
                      >
                        {name}
                      </h2>
                    </a>
                    {areaClues.map((clue) => (
                      <ClueItem key={clue.id} clue={clue} />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
