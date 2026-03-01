/**
 * Utility for writing the final blog post to a Markdown file with YAML frontmatter.
 */

import * as fs from 'fs';
import * as path from 'path';
import type { FinalBlog } from '../types.js';

/**
 * Writes a FinalBlog to content/blogs/{date}-{slug}.md with YAML frontmatter.
 * Returns the absolute path of the created file.
 */
export function writeBlogFile(blog: FinalBlog): string {
  const { frontmatter, body } = blog;

  // Build YAML frontmatter
  const yamlLines = [
    '---',
    `title: "${frontmatter.title}"`,
    `date: "${frontmatter.date}"`,
    `category: "${frontmatter.category}"`,
    `description: "${frontmatter.description}"`,
    `tags: [${frontmatter.tags.map((t) => `"${t}"`).join(', ')}]`,
    `slug: "${frontmatter.slug}"`,
    '---',
  ];

  const fileContent = yamlLines.join('\n') + '\n\n' + body.trim() + '\n';

  // Resolve output directory relative to project root (cwd when running via npm scripts)
  const projectRoot = process.cwd();
  const blogsDir = path.resolve(projectRoot, 'content', 'blogs');

  // Ensure the directory exists
  if (!fs.existsSync(blogsDir)) {
    fs.mkdirSync(blogsDir, { recursive: true });
  }

  const filename = `${frontmatter.date}-${frontmatter.slug}.md`;
  const filePath = path.resolve(blogsDir, filename);

  fs.writeFileSync(filePath, fileContent, 'utf-8');

  return filePath;
}
