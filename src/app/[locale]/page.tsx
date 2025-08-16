"use client";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("main-page");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1>{t("title")}</h1>
    </main>
  );
}
