"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { postSecurityClues } from "@/data/post-security-clues";
import { getAnchorId } from "@/lib/anchors";
import { AirportArea, airportAreaNames, Clue } from "@/types/clue";
import { ClueItem } from "./clue-item";
import { PostSecuritySidebar } from "./sidebar";

export default function Page() {
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

  for (const clue of postSecurityClues) {
    if (!grouped[clue.airportArea]) grouped[clue.airportArea] = [];
    grouped[clue.airportArea].push(clue);
  }

  return (
    <main className="overflow-y-auto p-4">
      <SidebarProvider>
        <PostSecuritySidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger aria-label="Open sidebar" className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-base font-semibold">SEA scavenger hunt</h1>
          </header>
          <div className="grid gap-6 max-w-2xl mx-auto">
            <p>
              Welcome to SEA! This scavenger hunt helps you explore the entire
              airport. How many items can you find?
            </p>
            <p>
              All answers and items can be found in public spaces. There is no
              need to go through any doors, and don&apos;t accidentally exit to
              the pre-security side of the airport when hunting for items!
            </p>
            {airportAreaNames.map(({ area, name }) => {
              const areaClues = grouped[area];

              if (!areaClues || areaClues.length === 0) return;

              const anchorId = getAnchorId(name);

              return (
                <div key={area} role="region" aria-labelledby={anchorId}>
                  <h2 id={anchorId} className="flex items-center gap-2">
                    {name}
                    <a
                      href={`#${anchorId}`}
                      aria-label={`Link to ${name}`}
                      className="ml-1 text-muted-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      #
                    </a>
                  </h2>
                  {areaClues.map((clue) => (
                    <div key={clue.id} className="py-2">
                      <Card>
                        <CardHeader>{clue.clue}</CardHeader>
                        <CardContent className="px-4">
                          <ClueItem clue={clue} />
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
