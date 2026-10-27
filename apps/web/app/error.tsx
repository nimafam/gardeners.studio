"use client";

import { useEffect } from "react";
import { SystemErrorView } from "@/components/pages/SystemErrorView";
import { DeityMotionStyles } from "@/components/pages/DeityMotionStyles";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <><SystemErrorView code="502" eyebrow="The guardian of the gateway is silent" title="The server god is not answering." description="The guardian that carries requests through this digital garden has lost its signal. Give it a moment, then summon the route again." onRetry={reset} /><DeityMotionStyles /></>;
}
