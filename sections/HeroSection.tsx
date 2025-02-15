"use client";

import { bonheurRoyale, geistMono } from "@/app/fonts";
import Image from "next/image"

const HeroSection = () => {
    return (
        <section>
            <div className="relative w-full h-screen">
                {/* Hero Image with Overlay */}
                <Image
                    src="/images/ehsaas-hero.jpg"
                    alt="Dance Team Hero"
                    fill
                    priority
                    className="object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-red-900/60" />
            </div >

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4" >
                {/* Text Content */}
                < h2 className={`${geistMono.className} text-2xl font-bold md:text-4xl text-white mb-4 text-center
                [text-shadow:_3px_3px_0_rgb(220_38_38),_6px_6px_0_rgba(0,0,0,0.2)]
                `}>RU - N</h2>

                <h1 className={`${bonheurRoyale.className} text-5xl md:text-9xl font-bold text-white mb-4 text-center
                [text-shadow:_3px_3px_0_rgb(220_38_38),_6px_6px_0_rgba(0,0,0,0.2)]
                `}>
                    EHSAAS
                </h1>

                <p className={`${bonheurRoyale.className} text-md md:text-4xl text-gray-200 max-w-2xl text-center mb-8 animate-slide-up-delayed`}>
                    Dance to Live, Live to Dance
                </p>

                {/* CTA Button */}
                <button className={`${bonheurRoyale.className} text-4xl px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full 
                transform transition-all duration-300 hover:scale-105
                shadow-lg hover:shadow-red-500/50 cursor-pointer`}>
                    Join Our Journey
                </button>
            </div>
        </section>
    )
}

export default HeroSection;