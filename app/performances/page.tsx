"use client";

import Header from "@/sections/Header";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { bonheurRoyale } from "@/app/fonts";
import Timeline from "@/sections/Timeline";

interface Performance {
    title: string;
    youtubeId: string;
    date: string;
    description: string;
}

interface YearData {
    year: string;
    performances?: Performance[];
}

const PerformancesPage = () => {
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const performanceData: YearData[] = [
        {
            year: "2024",
            performances: [
                {
                    title: "National Championships",
                    youtubeId: "v87mhjF9utY",
                    date: "March 15, 2024",
                    description: "First place performance at UCLA"
                },
                {
                    title: "National Championships",
                    youtubeId: "your_youtube_id",
                    date: "March 15, 2024",
                    description: "First place performance at UCLA"
                },
                {
                    title: "National Championships",
                    youtubeId: "your_youtube_id",
                    date: "March 15, 2024",
                    description: "First place performance at UCLA"
                },
                // Add more performances
            ]
        },
        {
            year: "2023",
            performances: [
                {
                    title: "Bollywood America",
                    youtubeId: "your_youtube_id",
                    date: "November 20, 2023",
                    description: "Opening act at the grand finale"
                },
                {
                    title: "Bollywood America",
                    youtubeId: "your_youtube_id",
                    date: "November 20, 2023",
                    description: "Opening act at the grand finale"
                },
                // Add more performances
            ]
        },
        {
            year: "2022",
            performances: [
                {
                    title: "Bollywood America",
                    youtubeId: "your_youtube_id",
                    date: "November 20, 2023",
                    description: "Opening act at the grand finale"
                },
                // Add more performances
            ]
        },
        {
            year: "2021",
            performances: [
                {
                    title: "Bollywood America",
                    youtubeId: "your_youtube_id",
                    date: "November 20, 2023",
                    description: "Opening act at the grand finale"
                },
                // Add more performances
            ]
        },
        {
            year: "2020",
        },
        // Add more years
    ];

    return (
        <main className="min-h-screen bg-purple-500 pb-40">
            <Header />

            {/* Title Section */}
            <div className="pt-32 px-8 md:px-24">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${bonheurRoyale.className} text-5xl md:text-7xl text-white text-center mb-20`}
                >
                    Our Performances
                </motion.h1>


                {/* Timeline */}
                <Timeline
                    performanceData={performanceData}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    setCurrentIndex={setCurrentIndex}
                />

                {/* Performance Carousel */}
                <AnimatePresence mode="wait">
                    {selectedYear && (
                        <motion.div
                            key={selectedYear}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="relative max-w-7xl mx-auto"
                        >
                            <div className={`grid gap-8 ${
                                // Dynamic grid columns based on number of performances
                                (() => {
                                    const performances = performanceData?.find(d => d.year === selectedYear)?.performances || [];
                                    if (performances.length >= 3) return 'grid-cols-1 md:grid-cols-3';
                                    if (performances.length === 2) return 'grid-cols-1 md:grid-cols-2';
                                    return 'grid-cols-1';
                                })()
                                }`}>
                                {performanceData?.find(d => d.year === selectedYear)?.performances?.map((performance, index) => (
                                    <motion.div
                                        key={performance.youtubeId}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="relative group"
                                    >
                                        <div className="aspect-video bg-black rounded-xl overflow-hidden 
                                                      shadow-lg transition-transform duration-300 
                                                      group-hover:scale-[1.02] group-hover:shadow-2xl">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={`https://www.youtube.com/embed/${performance.youtubeId}`}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <motion.div
                                            className="mt-4 text-white"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 + index * 0.1 }}
                                        >
                                            <h3 className="text-2xl font-bold">{performance.title}</h3>
                                            <p className="text-gray-400">{performance.date}</p>
                                            <p className="mt-2 text-gray-200">{performance.description}</p>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
};

export default PerformancesPage;