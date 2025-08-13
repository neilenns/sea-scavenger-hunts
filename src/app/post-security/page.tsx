"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { postSecurityClues } from "@/data/post-security-clues";
import { clearAllAnswers } from "@/hooks/clear-all-answers";
import { AirportArea, airportAreaNames, Clue } from "@/types/clue";
import { useState } from "react";
import { ClueItem } from "./clue-item";

export default function Page() {
  const [open, setOpen] = useState(false);

  const grouped: Record<AirportArea, Clue[]> = {
    [AirportArea.AIRPORT_WIDE]: [],
    [AirportArea.CENTRAL_TERMINAL]: [],
    [AirportArea.CONCOURSE_A]: [],
    [AirportArea.CONCOURSE_B]: [],
    [AirportArea.CONCOURSE_C]: [],
    [AirportArea.CONCOURSE_D]: [],
    [AirportArea.CONCOURSE_N]: [],
    [AirportArea.CONCOURSE_S]: [],
  };

  for (const clue of postSecurityClues) {
    if (!grouped[clue.airportArea]) grouped[clue.airportArea] = [];
    grouped[clue.airportArea].push(clue);
  }

  async function handleClear() {
    await clearAllAnswers();
    setOpen(false);
    globalThis.location.reload(); // reset components
  }

  return (
    <main className="overflow-y-auto p-4">
      <div className="grid gap-6 max-w-2xl mx-auto">
        <h1>Neil&apos;s SEA post-security scavenger hunt</h1>
        <p>
          Welcome to SEA! This scavenger hunt helps you explore the entire
          airport. How many items can you find?
        </p>
        <p>
          All answers and items can be found in public spaces. There is no need
          to enter any secure areas, and don&lsquo;t accidentally exit to the
          secure side of the airport when hunting for items!
        </p>
        <div className="p-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">Clear answers</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Clear all answers?</DialogTitle>
                <DialogDescription>
                  This will delete all saved answers. This action cannot be
                  undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleClear}>
                  Clear
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {Object.keys(airportAreaNames).map((key) => {
          const area = Number(key) as AirportArea;
          const areaClues = grouped[area];
          if (!areaClues || areaClues.length === 0) return;
          return (
            <div key={area}>
              <h2>{airportAreaNames[area]}</h2>
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
    </main>
  );
}
