import { routing } from "@/i18n/routing";
import { WithChildren } from "@/types/with-children";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

// eslint-disable-next-line unicorn/prevent-abbreviations
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "post-security-page" });

  return {
    title: t("title"),
    description: t("description"),
    appleWebApp: {
      capable: true,
      title: t("title"),
    },
    icons: {
      other: {
        rel: "apple-touch-icon",
        url: "/icons/airside.png",
      },
    },
  };
}

export default async function Layout({ children, params }: WithChildren) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return <main>{children}</main>;
}
