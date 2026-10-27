import type { Metadata } from "next";
import { BadGatewayDeityView } from "@/components/pages/BadGatewayDeityView";
export const metadata: Metadata = { title: "Bad gateway" };
export default function BadGatewayPage() { return <BadGatewayDeityView/>; }
