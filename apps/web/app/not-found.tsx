import type { Metadata } from "next";
import { NotFoundMazeView } from "@/components/pages/NotFoundMazeView";

export const metadata: Metadata = { title: "Lost inside the garden" };

export default function NotFound() { return <NotFoundMazeView />; }
