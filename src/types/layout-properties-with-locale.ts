import type { Locale } from "next-intl";
import type { ReactNode } from "react";

export type LayoutPropertiesWithLocale = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}>;
