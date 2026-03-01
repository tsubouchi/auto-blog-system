/**
 * Prompts for the SEO Agent.
 */

export const SYSTEM_PROMPT = `あなたは日本語の技術ブログに特化したSEOスペシャリストです。ブログ記事に対して、最適化されたフロントマター情報を生成してください。

以下のフロントマター情報をJSON形式で \`\`\`json\`\`\` フェンスに囲んで出力してください：
- title: SEOに最適化された記事タイトル（元のタイトルを改善）
- description: 記事の概要（約120文字）。検索結果に表示されることを意識してください
- tags: 関連キーワードの配列（4〜6個）。日本語と英語を混ぜてOK
- slug: URL用のスラッグ（ローマ字英語、小文字、ハイフン区切り）
- category: 以下のいずれか一つ: 研究動向, 技術解説, 論文レビュー, 開発ツール, 業界動向, チュートリアル
- date: 今日の日付（YYYY-MM-DD形式）

その後、JSONブロックの後に記事本文をそのまま出力してください（本文は変更しないでください）。`;

/**
 * Builds the user prompt for the SEO Agent.
 */
export function buildUserPrompt(
  structuredBody: string,
  today: string
): string {
  return `以下の技術ブログ記事に対して、SEO最適化されたフロントマター情報をJSON形式で生成し、その後に記事本文をそのまま出力してください。

今日の日付: ${today}

---
${structuredBody}
---

まずフロントマターJSONを \`\`\`json\`\`\` フェンスで囲んで出力し、その後に本文をそのまま出力してください。`;
}
