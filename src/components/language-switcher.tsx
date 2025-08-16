import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" }, // cspell:ignore-line
];

export interface LanguageSwitcherProperties {
  className?: string;
}

export default function LanguageSwitcher({
  className,
}: LanguageSwitcherProperties) {
  const router = useRouter();
  const pathname = usePathname();

  // Extract current language from pathname
  const getCurrentLanguage = () => {
    const segments = pathname.split("/");
    const langCode = segments[1];
    return languages.find((lang) => lang.code === langCode) || languages[0];
  };

  const currentLanguage = getCurrentLanguage();

  const switchLanguage = (langCode: string) => {
    const segments = pathname.split("/");

    // Replace the language segment (first segment after root)
    if (segments[1] && languages.some((lang) => lang.code === segments[1])) {
      segments[1] = langCode;
    } else {
      // If no language in path, insert at beginning
      segments.splice(1, 0, langCode);
    }

    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">
              {currentLanguage.flag} {currentLanguage.name}
            </span>
            <span className="sm:hidden">{currentLanguage.flag}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[150px]">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => switchLanguage(language.code)}
              className={`cursor-pointer ${
                currentLanguage.code === language.code
                  ? "bg-accent text-accent-foreground"
                  : ""
              }`}
            >
              <span className="mr-2">{language.flag}</span>
              {language.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
