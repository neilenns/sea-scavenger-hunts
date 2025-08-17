import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FR, US } from "country-flag-icons/react/3x2";
import { GlobeIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const languages = [
  { code: "en", flagComponent: US },
  { code: "fr", flagComponent: FR }, // cspell: disable-line
];

export interface LanguageSwitcherProperties {
  className?: string;
}

export default function LanguageSwitcher({
  className,
}: LanguageSwitcherProperties) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("components");

  // Extract current language from pathname
  const getCurrentLanguage = () => {
    const segments = pathname.split("/");
    const langCode = segments[1];
    return languages.find((lang) => lang.code === langCode) || languages[0];
  };

  const currentLanguage = getCurrentLanguage();
  const localizedLanguageString = t(
    `language-switcher.${currentLanguage.code}`,
  );
  const switchLanguage = (languageCode: string) => {
    const segments = pathname.split("/");

    // Replace the language segment (first segment after root)
    if (segments[1] && languages.some((lang) => lang.code === segments[1])) {
      segments[1] = languageCode;
    } else {
      // If no language in path, insert at beginning
      segments.splice(1, 0, languageCode);
    }

    const newPath = segments.join("/");
    const search =
      globalThis.window === undefined ? "" : globalThis.location.search;
    const hash =
      globalThis.window === undefined ? "" : globalThis.location.hash;
    router.push(`${newPath}${search}${hash}`);
  };

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
