/**
 * Structure (構成) Agent.
 * Takes an EditedBlog and produces a StructuredBlog with proper Markdown formatting.
 */

import { BaseAgent } from './base-agent.js';
import { SYSTEM_PROMPT, buildUserPrompt } from '../prompts/structure.js';
import type { EditedBlog, StructuredBlog } from '../types.js';

export class StructureAgent extends BaseAgent<EditedBlog, StructuredBlog> {
  readonly name = '構成エージェント (Structure)';
  readonly systemPrompt = SYSTEM_PROMPT;

  buildUserMessage(input: EditedBlog): string {
    return buildUserPrompt(input.body);
  }

  parseResponse(responseText: string): StructuredBlog {
    if (!responseText.trim()) {
      throw new Error(`[${this.name}] Empty response from structure agent`);
    }

    return {
      body: responseText.trim(),
    };
  }
}
