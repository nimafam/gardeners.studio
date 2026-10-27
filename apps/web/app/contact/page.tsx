import type { Metadata } from "next";
import { ContactUsView } from "@/components/pages/ContactUsView";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <ContactUsView />;
}
