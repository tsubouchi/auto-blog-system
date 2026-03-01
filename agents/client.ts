/**
 * Anthropic SDK singleton client.
 */

import Anthropic from '@anthropic-ai/sdk';

let client: Anthropic | null = null;

/**
 * Returns a singleton Anthropic client instance.
 * Uses ANTHROPIC_API_KEY from environment variables.
 */
export function getClient(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error(
        'ANTHROPIC_API_KEY environment variable is not set. ' +
          'Please set it before running the pipeline.'
      );
    }
    client = new Anthropic({ apiKey });
  }
  return client;
}
