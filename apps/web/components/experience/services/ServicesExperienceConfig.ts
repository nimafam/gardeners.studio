import type { ServiceExperienceDefinition } from "@/types/services-experience";

export const servicesExperienceConfig =
    [
        /*
         * ====================================================
         * 01 — CORE
         * ====================================================
         */

        {
            id: "core",

            index: 0,

            number: "01",

            title: "Core",

            metaphor:
                "The Score",

            description:
                "Every great performance begins with a score. Akord's Core services lay the strategic foundation every business needs before anything else can take shape — defining purpose, structure, and direction with clarity.",

            services: [
                "Business strategy & development planning",
                "Market research & feasibility analysis",
                "Organizational structure consulting",
                "Business model design",
                "Investment readiness & growth roadmapping",
            ],

            /*
             * Foundation / structural assembly.
             */
            motionType:
                "foundation",

            start: 0,
            end: 0.2,
        },

        /*
         * ====================================================
         * 02 — IDENTITY
         * ====================================================
         */

        {
            id: "identity",

            index: 1,

            number: "02",

            title: "Identity",

            metaphor:
                "The Voice",

            description:
                "A voice is what makes a musician recognizable across a crowded hall. We craft identities that are unmistakable — coherent, expressive, and built to last across every touchpoint.",

            services: [
                "Brand naming",
                "Visual identity & logo design",
                "Brand book & guidelines",
                "Stationery & office suite design",
                "Verbal identity & tone of voice",
                "Sonic branding",
                "Tagline & slogan development",
            ],

            /*
             * Signal / expansion.
             */
            motionType:
                "signal",

            start: 0.2,
            end: 0.4,
        },

        /*
         * ====================================================
         * 03 — DIGITAL
         * ====================================================
         */

        {
            id: "digital",

            index: 2,

            number: "03",

            title: "Digital",

            metaphor:
                "The Stage",

            description:
                "The stage is where performance meets the audience. Our Digital services build the platforms and experiences through which businesses connect, communicate, and grow in the modern world.",

            services: [
                "Website design & development",
                "Mobile application development",
                "Virtual reality (VR) experiences",
                "Augmented reality (AR) experiences",
                "Interactive systems & installations",
                "Simulation systems",
            ],

            /*
             * Perspective / depth transition.
             */
            motionType:
                "perspective",

            start: 0.4,
            end: 0.6,
        },

        /*
         * ====================================================
         * 04 — PROMOTION
         * ====================================================
         */

        {
            id: "promotion",

            index: 3,

            number: "04",

            title: "Promotion",

            metaphor:
                "The Performance",

            description:
                "A composition only lives when it's performed. Akord designs and conducts promotional campaigns that carry the brand forward — strategic in intent, compelling in execution.",

            services: [
                "Campaign strategy & management",
                "Advertising material design",
                "Digital & print creative production",
                "Brand activation concepts",
            ],

            /*
             * Sweep / arc / outward motion.
             */
            motionType:
                "performance",

            start: 0.6,
            end: 0.8,
        },

        /*
         * ====================================================
         * 05 — EDGE
         * ====================================================
         */

        {
            id: "edge",

            index: 4,

            number: "05",

            title: "Edge",

            metaphor:
                "The Innovation",

            description:
                "The most memorable performances push boundaries. Edge brings the technologies of tomorrow into today's business — creating experiences and systems that set our clients apart in ways competitors can't easily follow.",

            services: [
                "Artificial intelligence (AI) integration",
                "Augmented reality (AR) solutions",
                "Virtual reality (VR) solutions",
                "Internet of Things (IoT) systems",
                "3D design & visualization",
                "3D printing & fabrication",
                "Custom gadget & hardware development",
                "Emerging technology consulting",
            ],

            /*
             * Convergence / transformation.
             */
            motionType:
                "convergence",

            start: 0.8,
            end: 1,
        },
    ] as const satisfies
    readonly ServiceExperienceDefinition[];