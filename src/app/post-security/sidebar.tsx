import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { clearAllAnswers } from "@/hooks/clear-all-answers";
import { getAnchorId } from "@/lib/anchors";
import { airportAreaNames } from "@/types/clue";
import { PlaneIcon } from "lucide-react";
import { useState } from "react";

export function PostSecuritySidebar({
  ...properties
}: React.ComponentProps<typeof Sidebar>) {
  const [open, setOpen] = useState(false);

  async function handleClear() {
    await clearAllAnswers();
    setOpen(false);
    globalThis.location.reload(); // reset components
  }

  return (
    <Sidebar variant="floating" {...properties}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <PlaneIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">SEA Scavenger hunt</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {airportAreaNames.map(({ area, name }) => {
              const anchorId = getAnchorId(name);
              return (
                <SidebarMenuItem key={area}>
                  <SidebarMenuButton asChild>
                    <a href={`#${anchorId}`} className="font-medium">
                      {name}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
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
      </SidebarFooter>
    </Sidebar>
  );
}
