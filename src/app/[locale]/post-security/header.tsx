"use client";
import LanguageSwitcher from "@/components/language-switcher";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { isRTLLocale } from "@/lib/rtl";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

export function Header() {
  const locale = useLocale();
  const t = useTranslations("post-security-page");
  
  // RTL languages
  const isRTL = isRTLLocale(locale);

  return (
    <header className={cn("sticky top-0 z-50 flex h-12 shrink-0 items-center gap-2 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", isRTL && "flex-row-reverse")}>
      <SidebarTrigger
        aria-label={t("header.trigger-aria-label")}
        className={cn(isRTL ? "-mr-1" : "-ml-1")}
      />
      <Separator
        orientation="vertical"
        className={cn("data-[orientation=vertical]:h-4", isRTL ? "ml-2" : "mr-2")}
      />
      <h1 className="inline !text-base font-normal m-0 text-[var(--primary)]">
        {t("title")}
      </h1>
      <LanguageSwitcher className={cn(isRTL ? "mr-auto" : "ml-auto")} />
    </header>
  );
}
