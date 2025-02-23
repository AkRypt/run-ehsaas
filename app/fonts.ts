import { Geist, Geist_Mono, Mrs_Saint_Delafield, Bonheur_Royale, Borel, 
    Yellowtail, Sedgwick_Ave_Display, Newsreader, Dancing_Script, Poppins
} from "next/font/google";

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

export const borel = Borel({
    variable: "--font-borel",
    subsets: ["latin"],
    weight: "400",
});

export const yellowtail = Yellowtail({
    variable: "--font-yellowtail",
    subsets: ["latin"],
    weight: "400",
});

export const sedgwickAveDisplay = Sedgwick_Ave_Display({
    variable: "--font-sedgwick-ave-display",
    subsets: ["latin"],
    weight: "400",
});

export const newsreader = Newsreader({
    variable: "--font-newsreader",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const dancingScript = Dancing_Script({
    variable: "--font-dancing-script",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
