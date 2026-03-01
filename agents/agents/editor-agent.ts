/**
 * Editor (編集) Agent.
 * Takes a BlogDraft and produces an EditedBlog with corrections and edit notes.
 */

import { BaseAgent } from './base-agent.js';
import { SYSTEM_PROMPT, buildUserPrompt } from '../prompts/editor.js';
import type { BlogDraft, EditedBlog } from '../types.js';

export class EditorAgent extends BaseAgent<BlogDraft, EditedBlog> {
  readonly name = '編集エージェント (Editor)';
  readonly systemPrompt = SYSTEM_PROMPT;

  buildUserMessage(input: BlogDraft): string {
    return buildUserPrompt(input.body);
  }

  parseResponse(responseText: string): EditedBlog {
    if (!responseText.trim()) {
      throw new Error(`[${this.name}] Empty response from editor`);
    }

    // Split the response at "## 編集メモ" to separate body from edit notes
    const editNoteMarker = '## 編集メモ';
    const markerIndex = responseText.indexOf(editNoteMarker);

    let body: string;
    let editNotes: string;

    if (markerIndex !== -1) {
      body = responseText.slice(0, markerIndex).trim();
      editNotes = responseText
        .slice(markerIndex + editNoteMarker.length)
        .trim();
    } else {
      // If no edit notes section found, use the entire response as body
      body = responseText.trim();
      editNotes = '(編集メモなし)';
    }

    return { body, edit_notes: editNotes };
  }
}
