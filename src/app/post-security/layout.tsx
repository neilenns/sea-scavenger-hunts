import { WithChildren } from "@/types/with-children";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post-security scavenger hunt",
  description: "Scavenger hunt for SEA airport, post-security",
  appleWebApp: {
    capable: true,
    title: "Scavenger hunt",
  },
  icons: {
    other: {
      rel: "apple-touch-icon",
      url: "/icons/airside.png",
    },
  },
};

export default async function Layout({ children }: WithChildren) {
  return <main>{children}</main>;
}
