import Link from "next/link";

const navigation = [
    {
        title: "UI",
        href: "/styleguide/ui",
    },
    {
        title: "Animation",
        href: "/styleguide/animation",
    },
    {
        title: "Motion",
        href: "/styleguide/motion",
    },
    {
        title: "Experience",
        href: "/styleguide/experience",
    },
    {
        title: "WebGL",
        href: "/styleguide/webgl",
    },
    {
        title: "Sections",
        href: "/styleguide/sections",
    },
];

export function StyleguideSidebar() {
    return (
        <aside className="hidden w-72 shrink-0 border-r xl:flex">

            <div className="flex w-full flex-col p-8">

                <div className="mb-10">

                    <h2 className="font-heading text-2xl">

                        AKORD

                    </h2>

                    <p className="text-sm text-muted-foreground">

                        Styleguide

                    </p>

                </div>

                <nav className="space-y-2">

                    {navigation.map((item) => (

                        <Link
                            key={item.href}
                            href={item.href}
                            className="block rounded-lg px-4 py-3 text-sm transition hover:bg-muted hover:text-primary"
                        >

                            {item.title}

                        </Link>

                    ))}

                </nav>

                <div className="mt-auto border-t pt-6">

                    <p className="text-xs text-muted-foreground">

                        Version 0.1

                    </p>

                </div>

            </div>

        </aside>
    );
}