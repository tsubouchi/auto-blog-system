/**
 * Pipeline orchestrator that chains all 5 agents sequentially.
 * Takes a topic string, runs each agent in order, and writes the final blog post.
 */

import { PlanningAgent } from './agents/planning-agent.js';
import { WriterAgent } from './agents/writer-agent.js';
import { EditorAgent } from './agents/editor-agent.js';
import { StructureAgent } from './agents/structure-agent.js';
import { SeoAgent } from './agents/seo-agent.js';
import { writeBlogFile } from './utils/file-writer.js';
import type { PipelineContext } from './types.js';

/**
 * Runs the full blog generation pipeline.
 * @param topic - The blog topic to generate content for
 * @returns The absolute file path of the generated blog post
 */
export async function runPipeline(topic: string): Promise<string> {
  const context: PipelineContext = { topic };

  console.log('='.repeat(60));
  console.log(`Blog Generation Pipeline`);
  console.log(`Topic: ${topic}`);
  console.log('='.repeat(60));

  // Stage 1: Planning (企画)
  console.log('\n[1/5] 企画エージェント (Planning) を実行中...');
  const planningAgent = new PlanningAgent();
  context.outline = await planningAgent.run({ topic });
  console.log(`  -> タイトル案: ${context.outline.title_draft}`);
  console.log(`  -> セクション数: ${context.outline.sections.length}`);

  // Stage 2: Writing (執筆)
  console.log('\n[2/5] 執筆エージェント (Writer) を実行中...');
  const writerAgent = new WriterAgent();
  context.draft = await writerAgent.run(context.outline);
  context.draft.outline = context.outline;
  console.log(`  -> 執筆完了 (${context.draft.body.length} 文字)`);

  // Stage 3: Editing (編集)
  console.log('\n[3/5] 編集エージェント (Editor) を実行中...');
  const editorAgent = new EditorAgent();
  context.edited = await editorAgent.run(context.draft);
  console.log(`  -> 編集完了 (${context.edited.body.length} 文字)`);
  console.log(`  -> 編集メモ: ${context.edited.edit_notes.slice(0, 100)}...`);

  // Stage 4: Structuring (構成)
  console.log('\n[4/5] 構成エージェント (Structure) を実行中...');
  const structureAgent = new StructureAgent();
  context.structured = await structureAgent.run(context.edited);
  console.log(`  -> 構成整形完了 (${context.structured.body.length} 文字)`);

  // Stage 5: SEO Optimization
  console.log('\n[5/5] SEOエージェント (SEO) を実行中...');
  const seoAgent = new SeoAgent();
  context.final = await seoAgent.run(context.structured);
  console.log(`  -> タイトル: ${context.final.frontmatter.title}`);
  console.log(`  -> スラッグ: ${context.final.frontmatter.slug}`);
  console.log(`  -> カテゴリ: ${context.final.frontmatter.category}`);
  console.log(`  -> タグ: ${context.final.frontmatter.tags.join(', ')}`);

  // Write the final blog post to a file
  console.log('\nファイルを書き出し中...');
  const filePath = writeBlogFile(context.final);
  console.log(`  -> 保存先: ${filePath}`);

  console.log('\n' + '='.repeat(60));
  console.log('Pipeline completed successfully!');
  console.log('='.repeat(60));

  return filePath;
}
