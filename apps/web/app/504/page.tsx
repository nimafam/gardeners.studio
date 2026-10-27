import type { Metadata } from "next";
import { SundialTimeoutView } from "@/components/pages/SundialTimeoutView";
export const metadata: Metadata = { title: "Gateway timeout" };
export default function GatewayTimeoutPage() { return <SundialTimeoutView/>; }
