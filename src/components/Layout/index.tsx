import Link from "next/link";
import { useState } from "react";

export type LayoutProps = {
    children?: JSX.Element;
};

export default function Layout({ children }: LayoutProps) {

    const [active, setActive] = useState(false);
    const navItems = ["home", "about", "blog", "teen pregnancy"];

    {/* if you dont want this goofy ass prop drilling then use a state lib or react context but idk how it works */}

    return (
        <div className="h-full w-full max-w-[800px] mx-auto">
            <div className="grid grid-rows-[auto_1fr] h-full p-[min(5vw,24px)] gap-6">
                <NavBar active={active} setActive={setActive} navItems={navItems}/>
                <div className="relative">
                    { active && (
                        <div className="absolute inset-0 bg-background -ml-2 block navBreak:hidden">
                            <div className="flex flex-col gap-2">
                                <NavLinks navItems={navItems} />
                            </div>
                        </div>
                    ) }
                    { children }
                </div>
            </div>
        </div>
    );
}

export type NavBarProps = {
    active?: boolean;
    setActive: any;
    navItems: string[];
};

function NavBar({ active, setActive, navItems }: NavBarProps) {

    return (
        <nav>
            <div className="-ml-2 hidden navBreak:block">
                <div className="flex gap-2">
                    <NavLinks navItems={navItems} />
                </div>
            </div>
            <div className="flex navBreak:hidden">
                <HamBorge onClick={() => setActive(!active)} active={active} />
            </div>
        </nav>
    );
}

export type NavLinksProps = {
    navItems: string[];
};

function NavLinks({ navItems }: NavLinksProps) {
    return (
        <>
            { navItems.map((navItem: string, i: number) => <Link key={i} className="capitalize px-2 py-1 hover:bg-neutral-800 rounded-md inline-block" href={`/${navItem}`}>{navItem}</Link>) }
        </>
    );
}

export type HamBorgeProps = {
    onClick: any;
    active?: boolean;
};

function HamBorge({ onClick, active }: HamBorgeProps) {
    return (
        <button className="flex navBreak:hidden transition-transform active:scale-75" onClick={onClick}>
            { active ? (
                <svg width={24} height={32} viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7L21 25" stroke="currentColor" stroke-width="2"/>
                    <path d="M21 7L3 25" stroke="currentColor" stroke-width="2"/>
                </svg>
            ) : (
                <svg width={24} height={32} viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="2" y={6} fill="currentColor"/>
                    <rect width="24" height="2" y={15} fill="currentColor"/>
                    <rect width="24" height="2" y={24} fill="currentColor"/>
                </svg>
            ) }
        </button>
    );
}