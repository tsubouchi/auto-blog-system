import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | AI Research Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const htmlContent = await markdownToHtml(post.content);

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        href="/blogs"
        className="text-blue-400 hover:text-blue-300 text-sm mb-8 block transition-colors"
      >
        &larr; Back to Blog
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <time className="text-sm text-gray-500 font-mono">{post.date}</time>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 uppercase tracking-wider">
            {post.category}
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-4 leading-tight">{post.title}</h1>
        <p className="text-gray-400 text-lg">{post.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div
        className="prose prose-invert prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
