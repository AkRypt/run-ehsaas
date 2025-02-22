"use client";

import Logo from "@/app/components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
    const pathname = usePathname();
    const [isHomePage, setisHomePage] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const currentPath = pathname;
        if (currentPath === "/") {
            setisHomePage(true);
        } else {
            setisHomePage(false);
        }
    }, [pathname]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { href: "/#about", text: "About" },
        { href: "/members", text: "Members" },
        { href: "/calendar", text: "Calendar" },
        { href: "/performances", text: "Performances" },
        { href: "/gallery", text: "Gallery" },
        { href: "#footer", text: "Contact" },
    ];

    return (
        <header className={`w-full ${!isHomePage ? "relative bg-tertiary" : "absolute bg-transparent"} top-0 right-0 z-50 px-8 py-6`}>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-end space-x-12">
                {navLinks.map((link) => (
                    <Link
                        key={link.text}
                        href={link.href}
                        className="text-white/90 hover:text-white transition-colors text-lg"
                    >
                        {link.text}
                    </Link>
                ))}
            </nav>

            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden fixed top-8 right-8 z-50 w-10 h-10 bg-neutral flex flex-col justify-center items-center gap-1.5"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <span className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <nav
                className={`fixed top-0 right-0 h-full w-64 bg-neutral z-40 md:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col pt-24 px-6 space-y-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.text}
                            href={link.href}
                            className="text-white/90 hover:text-white transition-colors text-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.text}
                        </Link>
                    ))}
                </div>
            </nav>

            <Link href="/" 
            className={`w-[50%] md:w-[20%] h-[100%] md:h-[80%] flex justify-center items-center overflow-hidden absolute top-8 left-0 md:top-2 md:left-0 group`}
            >
                <Logo />
            </Link>


            {/* <Logo /> */}
        </header>
    );
};

export default Header;