import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { FlagComponent, FR, US } from "country-flag-icons/react/3x2";
import { GlobeIcon } from "lucide-react";
import type { Locale } from "next-intl";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { startTransition, useCallback, useMemo } from "react";

const languages = [
  { code: "en", flagComponent: US },
  { code: "fr", flagComponent: FR },
] as const satisfies ReadonlyArray<
  Readonly<{ code: Locale; flagComponent: FlagComponent }>
>;

export interface LanguageSwitcherProperties {
  className?: string;
}

export default function LanguageSwitcher({
  className,
}: LanguageSwitcherProperties) {
  const router = useRouter();
  const t = useTranslations("components");
  const locale = useLocale();
  const pathname = usePathname();
  const parameters = useParams();

  const currentLanguage = useMemo(
    () => languages.find((lang) => lang.code === locale) || languages[0],
    [locale],
  );

  const localizedLanguageString = t(
    `language-switcher.${currentLanguage.code}`,
  );

  const switchLanguage = useCallback(
    (nextLocale: Locale) => {
      startTransition(() => {
        router.replace(
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          { pathname, params: parameters },
          { locale: nextLocale },
        );
      });
    },
    [pathname, router, parameters],
  );

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            aria-label={localizedLanguageString}
          >
            <GlobeIcon
              className="h-4 w-4"
              aria-hidden="true"
              focusable="false"
            />
            <span className="hidden sm:inline-flex items-center gap-2">
              <currentLanguage.flagComponent
                className="w-4 h-3"
                aria-hidden="true"
                focusable="false"
              />
              {localizedLanguageString}
            </span>
            <span className="sm:hidden">
              <currentLanguage.flagComponent
                className="w-4 h-3"
                aria-hidden="true"
                focusable="false"
              />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[150px]">
          {languages.map((language) => {
            const selected = currentLanguage.code === language.code;

            return (
              <DropdownMenuItem
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                role="menuitemradio"
                aria-checked={selected}
                className={`cursor-pointer ${selected ? "bg-accent text-accent-foreground" : ""}`}
              >
                <language.flagComponent
                  className="w-4 h-3 mr-2"
                  aria-hidden="true"
                  focusable="false"
                />
                {t(`language-switcher.${language.code}`)}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
