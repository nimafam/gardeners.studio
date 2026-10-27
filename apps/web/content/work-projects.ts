import shimojcoDraft from "@/public/work/shimojco/content-draft.json";
import nexelDraft from "@/public/work/nexel-branding/content-draft.json";
import danadayDraft from "@/public/work/danaday-branding/content-draft.json";
import sweetLifeDraft from "@/public/work/sweet-life-branding/content-draft.json";
import taliapharmedDraft from "@/public/work/taliapharmed-branding/content-draft.json";

export interface WorkProjectChapter {
    id: string;
    title: string;
    media: readonly string[];
    enabled: boolean;
}

export interface WorkProjectGalleryItem {
    id: string;
    label: string;
    src: string;
    fit: "contain" | "cover" | "vertical-pan";
}

export interface WorkProject {
    title: string;
    slug: string;
    client: string;
    industry: string;
    country: string;
    year: string;
    projectUrl?: string;
    services: readonly string[];
    challenge: string;
    contribution: readonly string[];
    deliverables: readonly string[];
    outcome: string;
    assets: {
        logo: string;
        symbol: string;
        logoMotion?: string;
        hero: string;
        secondary: string;
        detail: string;
        websiteDesktop?: string;
        websiteMobile?: string;
        websiteDevicesMockup?: string;
        editorialPrintMockup?: string;
        brandGiftsMockup?: string;
        businessCardsMockup?: string;
        toteBagMockup?: string;
        websiteMobileHandMockup?: string;
    };
    gallery: readonly WorkProjectGalleryItem[];
    chapters: readonly WorkProjectChapter[];
}

export const workProjects: readonly WorkProject[] = [
    {
        ...shimojcoDraft,
        year: "2024–2025",
        assets: {
            logo: shimojcoDraft.assets.logo,
            symbol: shimojcoDraft.assets.symbol,
            logoMotion: shimojcoDraft.assets.logoMotion,
            hero: "/work/shimojco/concept-mockups/editorial-print-concept-01.png",
            secondary: shimojcoDraft.assets.catalogueHero,
            detail: shimojcoDraft.assets.brochureOpen,
            websiteDesktop: shimojcoDraft.assets.websiteDesktop,
            websiteMobile: shimojcoDraft.assets.websiteMobile,
            websiteDevicesMockup: "/work/shimojco/concept-mockups/website-devices-concept-01.png",
            editorialPrintMockup: "/work/shimojco/concept-mockups/editorial-print-concept-01.png",
            brandGiftsMockup: "/work/shimojco/concept-mockups/brand-gifts-concept-01.png",
            businessCardsMockup: "/work/shimojco/concept-mockups/business-cards-grid-concept-02.png",
            toteBagMockup: "/work/shimojco/concept-mockups/tote-bag-hand-concept-01.png",
            websiteMobileHandMockup: "/work/shimojco/concept-mockups/website-mobile-hand-concept-01.png",
        },
        gallery: [
            {
                id: "website-desktop",
                label: "Digital · Corporate Website",
                src: shimojcoDraft.assets.websiteDesktop,
                fit: "vertical-pan",
            },
            {
                id: "website-mobile",
                label: "Digital · Mobile Experience",
                src: shimojcoDraft.assets.websiteMobile,
                fit: "vertical-pan",
            },
            {
                id: "catalogue-cover",
                label: "Editorial · Corporate Catalogue",
                src: "/work/shimojco/catalogue/catalogue-mockup-23.jpg",
                fit: "contain",
            },
            {
                id: "catalogue-story",
                label: "Editorial · Brand Story",
                src: "/work/shimojco/catalogue/catalogue-mockup-03.jpg",
                fit: "contain",
            },
            {
                id: "catalogue-health",
                label: "Editorial · Health Portfolio",
                src: "/work/shimojco/catalogue/catalogue-mockup-15.jpg",
                fit: "contain",
            },
            {
                id: "brochure-cover",
                label: "Print · Corporate Brochure",
                src: shimojcoDraft.assets.brochureCover,
                fit: "contain",
            },
            {
                id: "brochure-open",
                label: "Print · Brochure System",
                src: shimojcoDraft.assets.brochureOpen,
                fit: "contain",
            },
        ],
        chapters: [
            {
                id: "iranplex-2025",
                title: "IranPlex 2025",
                media: [],
                enabled: false,
            },
        ],
    },
    {
        ...nexelDraft,
        assets: {
            logo: nexelDraft.assets.logoVariations,
            symbol: nexelDraft.assets.logoVariations,
            hero: "/work/nexel-branding/concept-mockups/applied-brand-touchpoints-concept-01.png",
            secondary: nexelDraft.assets.guidelineCover,
            detail: "/work/nexel-branding/brand-guideline/guideline-04-logo-clear-space.png",
        },
        gallery: [
            { id: "logo-system", label: "Identity · Logo System", src: nexelDraft.assets.logoVariations, fit: "contain" },
            { id: "palette", label: "Identity · Color System", src: "/work/nexel-branding/brand-guideline/guideline-06-primary-palette.png", fit: "contain" },
            { id: "typography", label: "Identity · Typography", src: "/work/nexel-branding/brand-guideline/guideline-11-typography-composition.png", fit: "contain" },
            { id: "applications", label: "Identity · Applications", src: nexelDraft.assets.brandMockups, fit: "contain" },
        ],
        chapters: [],
    },
    {
        ...danadayDraft,
        year: "2024–2025",
        assets: {
            logo: danadayDraft.assets.logo,
            symbol: danadayDraft.assets.logo,
            logoMotion: danadayDraft.assets.motion,
            hero: "/work/danaday-branding/concept-mockups/executive-gift-cover-concept-01.png",
            secondary: danadayDraft.assets.guidelineOverview,
            detail: "/work/danaday-branding/catalogue/Mc/1.jpg",
            websiteDesktop: "/work/danaday-branding/website/Danaday - Main Page.png",
            websiteMobile: "/work/danaday-branding/website/DanaDay-Main Page.png",
        },
        gallery: [
            { id: "packaging-family", label: "Packaging · Product Family", src: "/work/danaday-branding/packaging/feed-bag-product-family.jpg", fit: "contain" },
            { id: "website-home", label: "Digital · Main Experience", src: "/work/danaday-branding/website/Danaday - Main Page.png", fit: "vertical-pan" },
            { id: "catalogue-system", label: "Editorial · Catalogue System", src: "/work/danaday-branding/catalogue/Mc/1.jpg", fit: "contain" },
        ],
        chapters: [],
    },
    {
        title: sweetLifeDraft.title,
        slug: sweetLifeDraft.slug,
        client: sweetLifeDraft.client,
        industry: sweetLifeDraft.industry,
        country: sweetLifeDraft.country,
        year: "2024–2025",
        projectUrl: sweetLifeDraft.projectUrl,
        services: sweetLifeDraft.services,
        challenge: sweetLifeDraft.challenge,
        contribution: sweetLifeDraft.contribution,
        deliverables: sweetLifeDraft.deliverables,
        outcome: sweetLifeDraft.outcomeNote,
        assets: {
            logo: sweetLifeDraft.assets.logo,
            symbol: sweetLifeDraft.assets.logo,
            logoMotion: sweetLifeDraft.assets.introVideo,
            hero: "/work/sweet-life-branding/concept-mockups/logo-construction-board-mockup-01.png",
            secondary: sweetLifeDraft.assets.guidelineOverview,
            detail: "/work/sweet-life-branding/concept-mockups/environmental-pattern-mockup-01.png",
            websiteDesktop: sweetLifeDraft.assets.website[0],
            websiteMobile: sweetLifeDraft.assets.website[1],
            websiteDevicesMockup: sweetLifeDraft.assets.conceptMockups[0].path,
            brandGiftsMockup: sweetLifeDraft.assets.conceptMockups[2].path,
            businessCardsMockup: sweetLifeDraft.assets.conceptMockups[1].path,
        },
        gallery: [
            { id: "logo-construction", label: "Identity · Logo Construction", src: "/work/sweet-life-branding/brand-guideline/work-logo-construction.png", fit: "contain" },
            { id: "website", label: "Digital · Responsive Experience", src: sweetLifeDraft.assets.conceptMockups[0].path, fit: "contain" },
            { id: "stationery", label: "Identity · Stationery Concept", src: sweetLifeDraft.assets.conceptMockups[1].path, fit: "contain" },
            { id: "environment", label: "Environment · Concept Visualization", src: sweetLifeDraft.assets.conceptMockups[3].path, fit: "contain" },
        ],
        chapters: [],
    },
    {
        title: taliapharmedDraft.title,
        slug: taliapharmedDraft.slug,
        client: taliapharmedDraft.client,
        industry: taliapharmedDraft.industry,
        country: taliapharmedDraft.country,
        year: "2024–2025",
        projectUrl: taliapharmedDraft.projectUrl,
        services: taliapharmedDraft.services,
        challenge: taliapharmedDraft.challenge,
        contribution: taliapharmedDraft.contribution,
        deliverables: taliapharmedDraft.deliverables,
        outcome: taliapharmedDraft.outcomeNote,
        assets: {
            logo: taliapharmedDraft.assets.logos[0],
            symbol: taliapharmedDraft.assets.logos[0],
            hero: taliapharmedDraft.assets.conceptMockups[5],
            secondary: taliapharmedDraft.assets.guidelineOverview,
            detail: taliapharmedDraft.assets.conceptMockups[5],
            websiteDesktop: taliapharmedDraft.assets.website[0],
            websiteMobile: taliapharmedDraft.assets.website[3],
            websiteDevicesMockup: taliapharmedDraft.assets.conceptMockups[0],
            brandGiftsMockup: taliapharmedDraft.assets.conceptMockups[4],
            businessCardsMockup: taliapharmedDraft.assets.stationeryMockups[4],
        },
        gallery: [
            { id: "identity-system", label: "Identity · Brand System", src: taliapharmedDraft.assets.conceptMockups[1], fit: "contain" },
            { id: "website", label: "Digital · Responsive Experience", src: taliapharmedDraft.assets.conceptMockups[0], fit: "contain" },
            { id: "packaging", label: "Packaging · Concept Family", src: taliapharmedDraft.assets.conceptMockups[2], fit: "contain" },
            { id: "stationery", label: "Identity · Stationery", src: taliapharmedDraft.assets.conceptMockups[5], fit: "contain" },
        ],
        chapters: [],
    },
];

export const featuredWorkProject = workProjects[0];
