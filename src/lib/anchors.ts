// Converts a string to a valid anchor id for airport area links
export function getAnchorId(name: string): string {
  return name.replaceAll(" ", "-").toLowerCase();
}
