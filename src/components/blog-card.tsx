import Link from "next/link";
import type { BlogPost } from "@/lib/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="block group">
      <article className="border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-colors bg-gray-900/50 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <time className="text-sm text-gray-500 font-mono">{post.date}</time>
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 uppercase tracking-wider">
            {post.category}
          </span>
        </div>
        <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors leading-snug">
          {post.title}
        </h2>
        <p className="text-sm text-gray-400 line-clamp-2 mb-4 flex-1">
          {post.description}
        </p>
        <span className="text-sm font-medium text-blue-400 group-hover:text-blue-300">
          OPEN &rarr;
        </span>
      </article>
    </Link>
  );
}
