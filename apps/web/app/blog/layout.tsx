import type { ReactNode } from "react";
import { BlogPaginationMount } from "@/components/pages/BlogPaginationMount";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="blog-color-fix">
      {children}
      <BlogPaginationMount />
      <style>{`
        .blog-color-fix main:has(> section:nth-of-type(3)) > section:first-child > div[aria-hidden="true"]:first-child {
          background:
            radial-gradient(circle at 18% 24%, rgba(0, 63, 63, 0.26), transparent 31%),
            radial-gradient(circle at 88% 42%, rgba(91, 129, 47, 0.72), transparent 23%),
            linear-gradient(180deg, #eaeaea 0%, #eaeaea 78%, rgba(234, 234, 234, 0) 100%) !important;
        }
      `}</style>
    </div>
  );
}
