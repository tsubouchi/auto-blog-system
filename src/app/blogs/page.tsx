import { getAllPosts, getAllCategories } from "@/lib/blog";
import { BlogListClient } from "@/components/blog-list-client";

export const metadata = { title: "Blog一覧 | AI Research Blog" };

export default function BlogsPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-2 tracking-tight">Blog</h1>
        <p className="text-gray-400 text-lg">
          AI・R&Dに関する最新の知見をお届けします
        </p>
      </header>
      <BlogListClient posts={posts} categories={categories} />
    </div>
  );
}
