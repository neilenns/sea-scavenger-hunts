import LanguageSwitcher from "@/components/language-switcher";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("post-security-page");

  return (
    <header className="sticky top-0 z-50 flex h-12 shrink-0 items-center gap-2 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger aria-label={t("sidebar-aria-label")} className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <h1 className="inline !text-base font-normal m-0 text-[var(--primary)]">
        {t("title")}
      </h1>
      <LanguageSwitcher className="ml-auto" />
    </header>
  );
}
