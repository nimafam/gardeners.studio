import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/pages/GardenersPages";

export const metadata: Metadata = { title: "Projects" };
export default function ProjectsPage() { return <ProjectsPageContent />; }
