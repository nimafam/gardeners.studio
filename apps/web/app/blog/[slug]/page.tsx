import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { placeholderPosts } from "@/components/pages/BlogPages";
import { BlogArticleUnifiedView } from "@/components/pages/BlogArticleUnifiedView";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return placeholderPosts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const post = placeholderPosts.find((item) => item.slug === slug); return { title: post?.title ?? "Journal" }; }
export default async function ArticlePage({ params }: Props) { const { slug } = await params; const post = placeholderPosts.find((item) => item.slug === slug); if (!post) notFound(); return <BlogArticleUnifiedView post={post} />; }
