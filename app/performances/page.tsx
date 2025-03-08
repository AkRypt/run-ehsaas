"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bonheurRoyale } from "@/app/fonts";
import Timeline from "@/sections/Timeline";
import { db } from "@/config";
import { doc, getDoc } from "firebase/firestore";

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
    const [performanceData, setPerformanceData] = useState<YearData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPerformances();
    }, []);

    const fetchPerformances = async () => {
        try {
            const docRef = doc(db, "content", "performances");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data().years || [];
                setPerformanceData(data);
                // Set the most recent year as selected if there is data
                if (data.length > 0) {
                    setSelectedYear(data[0].year);
                }
            }
        } catch (error) {
            console.error("Error fetching performances:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-purple-500 flex items-center justify-center">
                <div className="text-white text-2xl">Loading performances...</div>
            </main>
        );
    }

    return (
        <main className="min-h-screen text-black pb-40">
            <div className="pt-32 px-8 md:px-24">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${bonheurRoyale.className} text-5xl md:text-7xl text-center mb-10`}
                >
                    Our Performances
                </motion.h1>

                {performanceData.length > 0 ? (
                    <>
                        <Timeline
                            performanceData={performanceData}
                            selectedYear={selectedYear}
                            setSelectedYear={setSelectedYear}
                            setCurrentIndex={setCurrentIndex}
                        />

                        <AnimatePresence mode="wait">
                            {selectedYear && (
                                <motion.div
                                    key={selectedYear}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="relative w-[80%] mx-auto"
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
                                                    className="mt-4"
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
                    </>
                ) : (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white text-center text-xl"
                    >
                        No performances available yet. Check back soon!
                    </motion.p>
                )}
            </div>
        </main>
    );
};

export default PerformancesPage;