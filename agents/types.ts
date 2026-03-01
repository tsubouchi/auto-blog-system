/**
 * Type definitions for the AI blog generation pipeline.
 */

/** Section within a blog outline */
export interface OutlineSection {
  heading: string;
  key_points: string[];
}

/** Output of the Planning Agent */
export interface BlogOutline {
  title_draft: string;
  angle: string;
  target_audience: string;
  sections: OutlineSection[];
}

/** Output of the Writer Agent */
export interface BlogDraft {
  outline: BlogOutline;
  body: string;
}

/** Output of the Editor Agent */
export interface EditedBlog {
  body: string;
  edit_notes: string;
}

/** Output of the Structure Agent */
export interface StructuredBlog {
  body: string;
}

/** Frontmatter metadata for a blog post */
export interface Frontmatter {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  category: string;
  date: string;
}

/** Output of the SEO Agent (final pipeline output) */
export interface FinalBlog {
  frontmatter: Frontmatter;
  body: string;
}

/** Context passed through the pipeline */
export interface PipelineContext {
  topic: string;
  outline?: BlogOutline;
  draft?: BlogDraft;
  edited?: EditedBlog;
  structured?: StructuredBlog;
  final?: FinalBlog;
}
