import { notFound } from "next/navigation";

import { workProjects } from "@/content/work-projects";
import { ProjectDetailView } from "@/components/pages/ProjectDetailView";

export function generateStaticParams() {
  return workProjects.map((project) => ({ slug: project.slug }));
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = workProjects.find((item) => item.slug === slug);

  if (!project) notFound();

  return <ProjectDetailView project={project} />;
}
