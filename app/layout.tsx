import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "./fonts";
import Header from "@/sections/Header";
import { Footer } from "@/sections/Footer";

export const metadata: Metadata = {
    title: "Ehsaas Dance Team",
    description: "Dance Team at Rutgers University-Newark",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.className} antialiased`}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
