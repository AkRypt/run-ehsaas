"use client";

import Logo from "@/app/components/Logo";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
    const [isTransparent, setIsTransparent] = useState(false);

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath === "/") {
            setIsTransparent(true);
        } else {
            setIsTransparent(false);
        }
    }, [])
    return (
        <header className={`absolute w-full ${isTransparent ? "bg-transparent" : "bg-neutral"} top-0 right-0 z-50 px-8 py-6`}>
            <nav className="hidden md:flex items-center justify-end space-x-12">
                <Link href="/#about" className="text-white/90 hover:text-white transition-colors text-lg">About</Link>
                <Link href="/members" className="text-white/90 hover:text-white transition-colors text-lg">Members</Link>
                <Link href="/calendar" className="text-white/90 hover:text-white transition-colors text-lg">Calendar</Link>
                <Link href="/performances" className="text-white/90 hover:text-white transition-colors text-lg">Performances</Link>
                <Link href="/gallery" className="text-white/90 hover:text-white transition-colors text-lg">Gallery</Link>
                <Link href="#contact" className="text-white/90 hover:text-white transition-colors text-lg">Contact</Link>
            </nav>

            <Logo />
        </header>
    )
}

export default Header;