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
import { isRTLLocale } from "@/lib/rtl";
import { cn } from "@/lib/utils";
import { airportAreaNames } from "@/types/clue";
import { PlaneIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import * as React from "react";
import { useEffect, useState } from "react";

export function PostSecuritySidebar({
  ...properties
}: React.ComponentProps<typeof Sidebar>) {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState<string>("");
  const [isClearing, setIsClearing] = useState(false);
  const { setOpenMobile } = useSidebar();
  const locale = useLocale();
  const t = useTranslations("post-security-page");

  // RTL languages
  const isRTL = isRTLLocale(locale);
  const sidebarSide = isRTL ? "right" : "left";

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
    if (isClearing) return;

    setIsClearing(true);

    try {
      await clearAllAnswers();
      setOpen(false);

      // Use full page reload to ensure all components remount and reload state
      globalThis.location.reload();
    } catch (error) {
      console.error("Failed to clear answers", error);
    } finally {
      setIsClearing(false);
    }
  }

  return (
    <Sidebar
      side={sidebarSide}
      variant="floating"
      aria-label={t("sidebar.aria-label")}
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
                  <span className="font-medium">{t("sidebar.title")}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {airportAreaNames.map(({ key }) => {
              const anchorId = getAnchorId(key);
              return (
                <SidebarMenuItem key={key}>
                  <SidebarMenuButton asChild>
                    <a
                      href={`#${anchorId}`}
                      className="font-medium"
                      onClick={handleMenuItemClick}
                      aria-current={
                        hash === `#${anchorId}` ? "location" : undefined
                      }
                    >
                      {t(`areas.${key}`)}
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
            <Button variant="default">
              {t(`clear-answers-dialog.trigger`)}
            </Button>
          </DialogTrigger>
          <DialogContent className={cn(isRTL && "text-right")}>
            <DialogHeader className={cn(isRTL && "text-right sm:text-right")}>
              <DialogTitle>{t(`clear-answers-dialog.title`)}</DialogTitle>
              <DialogDescription>
                {t(`clear-answers-dialog.description`)}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className={cn("flex justify-end gap-2", isRTL && "flex-row-reverse")}>
              <Button variant="outline" onClick={() => setOpen(false)}>
                {t(`clear-answers-dialog.cancel`)}
              </Button>
              <Button
                variant="destructive"
                onClick={handleClear}
                disabled={isClearing}
                aria-busy={isClearing}
              >
                {t(`clear-answers-dialog.clear`)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarFooter>
    </Sidebar>
  );
}
