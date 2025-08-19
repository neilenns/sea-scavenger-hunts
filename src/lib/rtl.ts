/**
 * Utility functions for RTL (Right-to-Left) language support
 */

/**
 * Check if the given locale is a RTL language
 * @param locale The locale string to check
 * @returns true if the locale is RTL, false otherwise
 */
export function isRTLLocale(locale: string): boolean {
  // Currently only Arabic is supported as RTL
  return locale === "ar";
}