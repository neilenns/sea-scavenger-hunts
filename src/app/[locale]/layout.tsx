import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";
import { LayoutPropertiesWithLocale } from "@/types/layout-properties-with-locale";
import type { Locale } from "next-intl";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
  const t = await getTranslations({ locale, namespace: "main-page" });

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

export default async function RootLayout({
  children,
  params: parameters,
}: LayoutPropertiesWithLocale) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await parameters;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
