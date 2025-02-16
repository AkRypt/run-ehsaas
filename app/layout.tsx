import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "./fonts";
import Script from "next/script";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
