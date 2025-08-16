import type { ReactNode } from "react";

export type WithChildren = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;
