"use client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { postSecurityClues } from "@/data/post-security-clues";
import { getAnchorId } from "@/lib/anchors";
import { AirportArea, airportAreaNames, Clue } from "@/types/clue";
import { useTranslations } from "next-intl";
import { ClueItem } from "./clue-item";
import { Header } from "./header";
import { PostSecuritySidebar } from "./sidebar";

const NAMESPACE = "post-security-page" as const;

export default function Page() {
  const t = useTranslations("post-security-page");

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

  // Sort clues within each area by sortOrder
  for (const area of Object.keys(grouped) as Array<keyof typeof grouped>) {
    grouped[area].sort((a, b) => {
      const aSortOrder = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const bSortOrder = b.sortOrder ?? Number.MAX_SAFE_INTEGER;
      return aSortOrder - bSortOrder;
    });
  }

  return (
    <main className="min-h-screen flex flex-col">
      <SidebarProvider>
        <PostSecuritySidebar />
        <SidebarInset className="flex flex-col">
          <Header />
          <div className="flex-1 p-4">
            <div className="grid gap-6 max-w-2xl mx-auto">
              <p>{t("introduction1")}</p>
              <p>{t("introduction2")}</p>
              <p>{t("introduction3")}</p>
              {airportAreaNames.map(({ area, key }) => {
                const areaClues = grouped[area];

                if (!areaClues || areaClues.length === 0) return;

                const anchorId = getAnchorId(key);

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
                        {t(`areas.${key}`)}
                      </h2>
                    </a>
                    {areaClues.map((clue) => (
                      <ClueItem
                        key={clue.id}
                        clue={clue}
                        namespace={NAMESPACE}
                      />
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
