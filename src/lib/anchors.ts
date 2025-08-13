// Converts a string to a valid anchor id for airport area links
export function getAnchorId(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFKD") // split diacritics
    .replaceAll(/[\u0300-\u036F]/g, "") // remove diacritics
    .replaceAll(/[^a-z0-9\s-]/g, "") // remove punctuation/symbols
    .replaceAll(/\s+/g, "-") // collapse whitespace to dashes
    .replaceAll(/-+/g, "-"); // collapse multiple dashes
}
