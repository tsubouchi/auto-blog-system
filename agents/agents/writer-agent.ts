/**
 * Writer (執筆) Agent.
 * Takes a BlogOutline and produces a BlogDraft with the full article body.
 */

import { BaseAgent } from './base-agent.js';
import { SYSTEM_PROMPT, buildUserPrompt } from '../prompts/writer.js';
import type { BlogOutline, BlogDraft } from '../types.js';

export class WriterAgent extends BaseAgent<BlogOutline, BlogDraft> {
  readonly name = '執筆エージェント (Writer)';
  readonly systemPrompt = SYSTEM_PROMPT;

  buildUserMessage(input: BlogOutline): string {
    return buildUserPrompt(input);
  }

  parseResponse(responseText: string): BlogDraft {
    // The writer returns the article body as plain text/markdown.
    // We don't need to extract JSON here.
    if (!responseText.trim()) {
      throw new Error(`[${this.name}] Empty response from writer`);
    }

    return {
      outline: {} as BlogOutline, // Will be set by the pipeline
      body: responseText.trim(),
    };
  }
}
