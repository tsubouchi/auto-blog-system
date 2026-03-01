/**
 * Prompts for the Writer (執筆) Agent.
 */

import type { BlogOutline } from '../types.js';

export const SYSTEM_PROMPT = `あなたはAI・R&D分野の技術ブログライターです。日本語で技術記事を執筆することを専門としています。

以下の要件を満たしてください：
- 記事の長さは約3000文字を目安にしてください
- 専門的でありながらも読みやすい文体で記述してください
- 具体例や実用的な観点を含めてください
- アウトラインの構造に従って記事を書いてください
- 各セクションの要点をすべてカバーしてください
- Markdownの見出し（##）を使ってセクションを区切ってください
- コードブロックが必要な場合は適切に含めてください

自然な日本語で、技術的な正確性を保ちながら執筆してください。`;

/**
 * Builds the user prompt for the Writer Agent.
 */
export function buildUserPrompt(outline: BlogOutline): string {
  const sectionsText = outline.sections
    .map(
      (s, i) =>
        `${i + 1}. ${s.heading}\n   要点: ${s.key_points.join(', ')}`
    )
    .join('\n');

  return `以下のアウトラインに基づいて、技術ブログ記事を執筆してください。

タイトル案: ${outline.title_draft}
切り口: ${outline.angle}
想定読者: ${outline.target_audience}

セクション構成:
${sectionsText}

約3000文字の記事を日本語で書いてください。`;
}
