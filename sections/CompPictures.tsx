"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { bonheurRoyale } from "@/app/fonts";

const CompPictures = () => {

    const images = [
        {
            url: "/images/ehsaas-hero.jpg",
            title: "National Championships 2023",
            description: "First place performance at UCLA"
        },
        {
            url: "/images/ehsaas-logo.png",
            title: "Bollywood America",
            description: "Opening act at the grand finale"
        },
        {
            url: "/images/comp3.jpg",
            title: "Dance Off 2023",
            description: "Championship performance in New York"
        },
        {
            url: "/images/ehsaas-logo.png",
            title: "Bollywood America",
            description: "Opening act at the grand finale"
        },
        {
            url: "/images/comp3.jpg",
            title: "Dance Off 2023",
            description: "Championship performance in New York"
        },
        {
            url: "/images/ehsaas-logo.png",
            title: "Bollywood America",
            description: "Opening act at the grand finale"
        },
        {
            url: "/images/comp3.jpg",
            title: "Dance Off 2023",
            description: "Championship performance in New York"
        },
        {
            url: "/images/ehsaas-logo.png",
            title: "Bollywood America",
            description: "Opening act at the grand finale"
        },
        {
            url: "/images/comp3.jpg",
            title: "Dance Off 2023",
            description: "Championship performance in New York"
        },
        // Add more images as needed
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % (images.length - itemsPerPage + 1));
    };

    const handlePrevious = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? 0 : prev - 1
        );
    };

    return (
        <section className="py-14 px-8 md:p-24">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className={`text-4xl md:text-6xl ${bonheurRoyale.className}`}>
                        Competition Highlights
                    </h2>
                    <div className="h-1 w-20 bg-red-500 mx-auto mt-4 rounded-full" />
                </motion.div>

                {/* Multi-Image Carousel Container */}
                <div className="relative w-full">
                    <div className="overflow-hidden pb-6">
                        <motion.div
                            className="flex gap-6"
                            animate={{
                                x: `-${currentIndex * (100 / itemsPerPage)}%`
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeInOut"
                            }}
                        >
                            {images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    className="relative flex-shrink-0 w-[calc(100%/3-1rem)] aspect-[4/3]"
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative h-full overflow-hidden rounded-2xl">
                                        <img
                                            src={image.url}
                                            alt={image.title}
                                            className="h-full w-full object-cover"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                        {/* Image Info */}
                                        <div className="absolute bottom-0 left-0 p-6 text-white">
                                            <h3 className="text-xl font-bold mb-2">
                                                {image.title}
                                            </h3>
                                            <p className="text-sm text-gray-200">
                                                {image.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute -left-6 -right-6 top-1/2 bottom-12 flex -translate-y-1/2 justify-between">
                        <button
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className="rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex >= images.length - itemsPerPage}
                            className="rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRightIcon className="h-6 w-6 text-gray-800" />
                        </button>
                    </div>

                    {/* Dots Navigation */}
                    <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 w-2 rounded-full transition-all ${index === currentIndex
                                    ? "bg-black w-6"
                                    : "bg-black/50"
                                    }`}
                            />
                        ))}
                    </div>
                </div>


            </div>


        </section>
    )
}

export default CompPictures;