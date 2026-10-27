"use client";

import { createContext } from "react";

import type { ExperienceContextValue } from "@/types/experience";

export const ExperienceContext =
    createContext<ExperienceContextValue | null>(null);