import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  let messagesModule;
  let resolvedLocale = locale;
  try {
    messagesModule = await import(`../../messages/${locale}.json`);
  } catch {
    resolvedLocale = routing.defaultLocale;
    messagesModule = await import(
      `../../messages/${routing.defaultLocale}.json`
    );
  }

  return {
    locale: resolvedLocale,
    messages: messagesModule.default,
  };
});
