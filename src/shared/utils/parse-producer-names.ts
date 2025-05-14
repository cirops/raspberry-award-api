export function parseProducerNames(input: string): string[] {
  return input
    .replace(/\s*,\s*and\s+|\s+and\s+/gi, ',')
    .split(',')
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
}
