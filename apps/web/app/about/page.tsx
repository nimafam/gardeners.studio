import type { Metadata } from "next";
import { AboutUsView } from "@/components/pages/AboutUsView";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return <AboutUsView />;
}
