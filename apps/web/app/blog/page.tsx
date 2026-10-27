import type { Metadata } from "next";
import { BlogPageContent } from "@/components/pages/BlogPages";

export const metadata: Metadata = { title: "Journal" };
export default function BlogPage() { return <BlogPageContent />; }
