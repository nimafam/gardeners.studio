import type { ReactNode } from "react";
import { BlogMetaBarV3Mount } from "@/components/pages/BlogMetaBarV3Mount";
import { BlogAuthorButtonMount } from "@/components/pages/BlogAuthorButtonMount";
import { BlogEngagementV2Mount } from "@/components/pages/BlogEngagementV2Mount";

export default function BlogArticleLayout({ children }: { children: ReactNode }) {
  return <>{children}<BlogMetaBarV3Mount /><BlogAuthorButtonMount /><BlogEngagementV2Mount /><style>{`#comments article > div:nth-child(2) > *{display:revert!important}`}</style></>;
}
