"use client";

import Logo from "@/app/components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
    const pathname = usePathname();
    const [isHomePage, setisHomePage] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);  // New state for visibility
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const currentPath = pathname;
        if (currentPath === "/") {
            setisHomePage(true);
        } else {
            setisHomePage(false);
        }

        // Enhanced scroll handler
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Set hasScrolled state
            setHasScrolled(currentScrollY > 20);

            // Determine scroll direction and update header visibility
            if (currentScrollY < 20) {
                setIsVisible(true); // Always show header at top of page
            } else if (currentScrollY > lastScrollY) {
                setIsVisible(false); // Scrolling down
            } else {
                setIsVisible(true);  // Scrolling up
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname, lastScrollY]);

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
        <header
            className={`w-full fixed top-0 right-0 z-50 px-8 py-6 transition-all duration-300
                ${hasScrolled ?
                    'md:backdrop-blur-md md:bg-neutral-900/90 bg-neutral-900 shadow-xl' :
                    isHomePage ?
                        'bg-transparent' :
                        'bg-neutral-900'}
                ${hasScrolled ? 'shadow-[0_10px_30px_-10px_rgba(220,38,38,0.3)]' : ''}
                ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
        >

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-end space-x-12">
                {navLinks.map((link) => (
                    <Link
                        key={link.text}
                        href={link.href}
                        className="relative text-white/80 hover:text-white transition-colors text-lg group"
                    >
                        {link.text}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                ))}
            </nav>

            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden fixed top-8 right-8 z-50 w-10 h-10 bg-neutral-900 rounded-lg flex flex-col justify-center items-center gap-1.5 shadow-lg border border-neutral-800"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <span className={`w-6 h-0.5 bg-red-500 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-6 h-0.5 bg-red-500 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-6 h-0.5 bg-red-500 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <nav
                className={`fixed top-0 right-0 h-full w-64 bg-neutral-900 z-40 md:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } shadow-[-10px_0_30px_-15px_rgba(220,38,38,0.3)]`}
            >
                <div className="flex flex-col pt-24 px-6 space-y-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.text}
                            href={link.href}
                            className="text-white/80 hover:text-white transition-colors text-lg relative group"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="relative z-10">{link.text}</span>
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </div>
            </nav>

            <Link href="/"
                className={`w-[50%] md:w-[20%] h-[100%] md:h-[80%] flex justify-center items-center overflow-hidden absolute top-8 left-0 md:top-2 md:left-0 group`}
            >
                <Logo />
            </Link>
        </header>
    );
};

export default Header;