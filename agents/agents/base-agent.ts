/**
 * Abstract base class for all pipeline agents.
 * Provides common logic for calling the Anthropic API and parsing responses.
 */

import { getClient } from '../client.js';
import { MODEL_NAME, MAX_TOKENS } from '../config.js';

export abstract class BaseAgent<TInput, TOutput> {
  /** Display name of the agent (used in logging) */
  abstract readonly name: string;

  /** System prompt for the agent */
  abstract readonly systemPrompt: string;

  /**
   * Builds the user message content from the input.
   */
  abstract buildUserMessage(input: TInput): string;

  /**
   * Parses the raw text response from Claude into the typed output.
   */
  abstract parseResponse(responseText: string): TOutput;

  /**
   * Executes the agent: sends a request to Claude and returns the parsed output.
   */
  async run(input: TInput): Promise<TOutput> {
    const client = getClient();
    const userMessage = this.buildUserMessage(input);

    const response = await client.messages.create({
      model: MODEL_NAME,
      max_tokens: MAX_TOKENS,
      system: this.systemPrompt,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    // Extract text from the response content blocks
    const textBlocks = response.content.filter(
      (block) => block.type === 'text'
    );

    if (textBlocks.length === 0) {
      throw new Error(`[${this.name}] No text content in response`);
    }

    const responseText = textBlocks
      .map((block) => {
        if (block.type === 'text') {
          return block.text;
        }
        return '';
      })
      .join('\n');

    return this.parseResponse(responseText);
  }

  /**
   * Extracts a JSON object from a response that contains ```json fences.
   * Falls back to parsing the entire response as JSON if no fences are found.
   */
  protected extractJson<T>(responseText: string): T {
    // Try to find JSON within ```json ... ``` fences
    const jsonFenceRegex = /```json\s*\n?([\s\S]*?)\n?\s*```/;
    const match = responseText.match(jsonFenceRegex);

    if (match && match[1]) {
      try {
        return JSON.parse(match[1].trim()) as T;
      } catch (e) {
        throw new Error(
          `[${this.name}] Failed to parse JSON from fenced block: ${e instanceof Error ? e.message : String(e)}`
        );
      }
    }

    // Fallback: try parsing the entire response as JSON
    try {
      return JSON.parse(responseText.trim()) as T;
    } catch (e) {
      throw new Error(
        `[${this.name}] No valid JSON found in response. ` +
          `Expected JSON within \`\`\`json fences. ` +
          `Parse error: ${e instanceof Error ? e.message : String(e)}`
      );
    }
  }

  /**
   * Extracts text that appears after a ```json ... ``` block.
   * Returns the text after the closing fence, trimmed.
   */
  protected extractTextAfterJson(responseText: string): string {
    const jsonFenceRegex = /```json\s*\n?[\s\S]*?\n?\s*```/;
    const match = responseText.match(jsonFenceRegex);

    if (match) {
      const afterJson = responseText.slice(
        (match.index ?? 0) + match[0].length
      );
      return afterJson.trim();
    }

    return responseText.trim();
  }
}
