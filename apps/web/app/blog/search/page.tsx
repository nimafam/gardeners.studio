import type { Metadata } from "next";
import { BlogSearchResultsView } from "@/components/pages/BlogSearchResultsView";
import { placeholderPosts } from "@/components/pages/BlogPages";

export const metadata: Metadata = { title: "Search the Journal" };

type Props = { searchParams: Promise<{ q?: string; author?: string }> };

export default async function BlogSearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const needle = query.toLowerCase();
  const posts = placeholderPosts.filter((post) => !needle || `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(needle));
  return <BlogSearchResultsView posts={posts} query={query} author={params.author} />;
}
