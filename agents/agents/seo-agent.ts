/**
 * SEO Agent.
 * Takes a StructuredBlog and produces a FinalBlog with optimized frontmatter.
 */

import { BaseAgent } from './base-agent.js';
import { SYSTEM_PROMPT, buildUserPrompt } from '../prompts/seo.js';
import type { StructuredBlog, FinalBlog, Frontmatter } from '../types.js';

export class SeoAgent extends BaseAgent<StructuredBlog, FinalBlog> {
  readonly name = 'SEOエージェント (SEO)';
  readonly systemPrompt = SYSTEM_PROMPT;

  private today: string;

  constructor() {
    super();
    // Get today's date in YYYY-MM-DD format
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  buildUserMessage(input: StructuredBlog): string {
    return buildUserPrompt(input.body, this.today);
  }

  parseResponse(responseText: string): FinalBlog {
    if (!responseText.trim()) {
      throw new Error(`[${this.name}] Empty response from SEO agent`);
    }

    // Extract the JSON frontmatter from the fenced block
    const frontmatter = this.extractJson<Frontmatter>(responseText);

    // Validate required frontmatter fields
    if (!frontmatter.title) {
      throw new Error(`[${this.name}] Missing title in frontmatter`);
    }
    if (!frontmatter.slug) {
      throw new Error(`[${this.name}] Missing slug in frontmatter`);
    }
    if (!frontmatter.date) {
      // Fallback to today's date
      frontmatter.date = this.today;
    }

    // Extract the body text after the JSON block
    const body = this.extractTextAfterJson(responseText);

    if (!body) {
      throw new Error(
        `[${this.name}] No body content found after frontmatter JSON`
      );
    }

    return { frontmatter, body };
  }
}
