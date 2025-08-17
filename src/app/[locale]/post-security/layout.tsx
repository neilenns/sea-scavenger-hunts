import { routing } from "@/i18n/routing";
import { WithChildren } from "@/types/with-children";
import { hasLocale, Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

// eslint-disable-next-line unicorn/prevent-abbreviations
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: parameters,
}: Readonly<{
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await parameters;
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

export default async function Layout({
  children,
  params: parameters,
}: WithChildren) {
  const { locale } = await parameters;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return <main>{children}</main>;
}
