import { Geist, Geist_Mono, Mrs_Saint_Delafield, Bonheur_Royale } from "next/font/google";

export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const mrsSaintDelafield = Mrs_Saint_Delafield({
    variable: "--font-mrs-saint-delafield",
    subsets: ["latin"],
    weight: "400",
});

export const bonheurRoyale = Bonheur_Royale({
    variable: "--font-bonheur-royale",
    subsets: ["latin"],
    weight: "400",
});
