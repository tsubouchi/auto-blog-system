/**
 * CLI entry point for the blog generation pipeline.
 *
 * Usage:
 *   npx tsx agents/runner.ts "トピック名"
 *   npm run generate -- "トピック名"
 *
 * If no topic is provided, defaults to 'LLMの推論能力における最新研究動向'.
 */

import { runPipeline } from './pipeline.js';

const DEFAULT_TOPIC = 'LLMの推論能力における最新研究動向';

async function main(): Promise<void> {
  const topic = process.argv[2] || DEFAULT_TOPIC;

  console.log(`\nStarting blog generation for topic: "${topic}"\n`);

  try {
    const filePath = await runPipeline(topic);
    console.log(`\nGenerated blog file: ${filePath}`);
  } catch (error) {
    console.error('\nPipeline failed with error:');
    if (error instanceof Error) {
      console.error(`  ${error.message}`);
      if (error.stack) {
        console.error(`\nStack trace:\n${error.stack}`);
      }
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

main();
