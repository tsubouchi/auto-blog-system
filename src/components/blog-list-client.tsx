"use client";

import { useState, useMemo } from "react";
import type { BlogPost } from "@/lib/types";
import { CategoryFilter } from "./category-filter";
import { SearchBar } from "./search-bar";
import { BlogCard } from "./blog-card";

interface Props {
  posts: BlogPost[];
  categories: string[];
}

export function BlogListClient({ posts, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "ALL" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-gray-500 text-center py-12">
          該当する記事が見つかりません
        </p>
      )}
    </>
  );
}
