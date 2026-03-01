/**
 * Utility for generating URL-safe slugs.
 */

/**
 * Converts a string to a URL-safe slug.
 * - Converts to lowercase
 * - Replaces spaces and underscores with hyphens
 * - Removes non-alphanumeric characters (except hyphens)
 * - Collapses multiple hyphens into one
 * - Trims leading/trailing hyphens
 */
export function toSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
