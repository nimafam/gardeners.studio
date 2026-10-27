import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { placeholderPosts } from "@/components/pages/BlogPages";
import { BlogAuthorArchiveView } from "@/components/pages/BlogAuthorArchiveView";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return [{ slug: "jessy-james" }]; }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; return { title: slug === "jessy-james" ? "Articles by Jessy James" : "Author" }; }
export default async function AuthorArchivePage({ params }: Props) { const { slug } = await params; if (slug !== "jessy-james") notFound(); return <BlogAuthorArchiveView posts={placeholderPosts} />; }
