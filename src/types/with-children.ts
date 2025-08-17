import type { Locale } from "next-intl";
import type { ReactNode } from "react";

export type WithChildren = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}>;
