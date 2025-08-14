"use client";

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
  useSidebar,
} from "@/components/ui/sidebar";
import { clearAllAnswers } from "@/hooks/clear-all-answers";
import { getAnchorId } from "@/lib/anchors";
import { airportAreaNames } from "@/types/clue";
import { PlaneIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect, useState } from "react";

export function PostSecuritySidebar({
  ...properties
}: React.ComponentProps<typeof Sidebar>) {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState<string>("");
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  useEffect(() => {
    const update = () => setHash(globalThis.location?.hash ?? "");
    update();
    globalThis.addEventListener?.("hashchange", update);
    return () => globalThis.removeEventListener?.("hashchange", update);
  }, []);

  const handleMenuItemClick = () => {
    // Close the sidebar on mobile/floating mode
    setOpenMobile(false);
  };

  async function handleClear() {
    try {
      await clearAllAnswers();
      setOpen(false);

      // Prefer soft refresh when available
      if (router?.refresh) {
        router.refresh();
      } else {
        globalThis.location.reload();
      }
    } catch (error) {
      console.error("Failed to clear answers", error);
    }
  }

  return (
    <Sidebar
      variant="floating"
      aria-label="Post-security hunt navigation"
      {...properties}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <PlaneIcon aria-hidden="true" className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">SEA scavenger hunt</span>
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
                    <a
                      href={`#${anchorId}`}
                      className="font-medium"
                      onClick={handleMenuItemClick}
                      aria-current={
                        hash === `#${anchorId}` ? "page" : undefined
                      }
                    >
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
            <Button variant="default">Clear answers</Button>
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
