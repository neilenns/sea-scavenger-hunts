"use client";
import LanguageSwitcher from "@/components/language-switcher";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocale, useTranslations } from "next-intl";

export function Header() {
  const locale = useLocale();
  const t = useTranslations("post-security-page");
  
  // RTL languages
  const isRTL = locale === "ar";

  return (
    <header className={`sticky top-0 z-50 flex h-12 shrink-0 items-center gap-2 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <SidebarTrigger
        aria-label={t("header.trigger-aria-label")}
        className={isRTL ? "-mr-1" : "-ml-1"}
      />
      <Separator
        orientation="vertical"
        className={`data-[orientation=vertical]:h-4 ${isRTL ? 'ml-2' : 'mr-2'}`}
      />
      <h1 className="inline !text-base font-normal m-0 text-[var(--primary)]">
        {t("title")}
      </h1>
      <LanguageSwitcher className={isRTL ? "mr-auto" : "ml-auto"} />
    </header>
  );
}
