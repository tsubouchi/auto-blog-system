/**
 * Planning (企画) Agent.
 * Takes a topic and produces a structured blog outline.
 */

import { BaseAgent } from './base-agent.js';
import { SYSTEM_PROMPT, buildUserPrompt } from '../prompts/planning.js';
import type { BlogOutline } from '../types.js';

interface PlanningInput {
  topic: string;
}

export class PlanningAgent extends BaseAgent<PlanningInput, BlogOutline> {
  readonly name = '企画エージェント (Planning)';
  readonly systemPrompt = SYSTEM_PROMPT;

  buildUserMessage(input: PlanningInput): string {
    return buildUserPrompt(input.topic);
  }

  parseResponse(responseText: string): BlogOutline {
    const outline = this.extractJson<BlogOutline>(responseText);

    // Validate the required fields
    if (!outline.title_draft) {
      throw new Error(`[${this.name}] Missing title_draft in outline`);
    }
    if (!outline.sections || !Array.isArray(outline.sections)) {
      throw new Error(`[${this.name}] Missing or invalid sections in outline`);
    }
    if (outline.sections.length === 0) {
      throw new Error(`[${this.name}] Outline has no sections`);
    }

    return outline;
  }
}
