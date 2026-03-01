/**
 * Configuration constants for the AI blog generation pipeline.
 */

/** Claude model to use for all agents */
export const MODEL_NAME = 'claude-sonnet-4-20250514';

/** Maximum tokens for Claude responses */
export const MAX_TOKENS = 4096;

/** Temperature setting for generation (higher = more creative) */
export const TEMPERATURE = 0.7;

/** Target blog length in characters (approximate) */
export const TARGET_BLOG_LENGTH = 3000;

/** Supported blog categories */
export const CATEGORIES = [
  '研究動向',
  '技術解説',
  '論文レビュー',
  '開発ツール',
  '業界動向',
  'チュートリアル',
] as const;

export type Category = (typeof CATEGORIES)[number];
