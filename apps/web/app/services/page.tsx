import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/pages/GardenersPages";

export const metadata: Metadata = { title: "Services" };
export default function ServicesPage() { return <ServicesPageContent />; }
