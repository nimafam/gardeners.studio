import Link from "next/link";

const sections = [
    {
        title: "Components",
        href: "/styleguide/components",
        description: "UI Components",
    },
    {
        title: "Animation",
        href: "/styleguide/animation",
        description: "Animation Library",
    },
    {
        title: "Motion",
        href: "/styleguide/motion",
        description: "Motion Library",
    },
    {
        title: "Experience",
        href: "/styleguide/experience",
        description: "Experience Engine",
    },
    {
        title: "WebGL",
        href: "/styleguide/webgl",
        description: "Three.js Playground",
    },
    {
        title: "Sections",
        href: "/styleguide/sections",
        description: "Website Sections",
    },
];

export default function StyleguidePage() {
    return (
        <div className="space-y-10">

            <div>

                <h2 className="text-4xl font-heading">
                    Styleguide
                </h2>

                <p className="mt-2 text-muted-foreground">
                    Development Playground
                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">


                {sections.map((section) => (

                    <Link
                        key={section.href}
                        href={section.href}
                        className="rounded-xl border bg-card p-6 transition hover:border-primary hover:shadow-lg"
                    >

                        <h3 className="font-semibold">
                            {section.title}
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {section.description}
                        </p>

                    </Link>

                ))}

            </div>

        </div>
    );
}
