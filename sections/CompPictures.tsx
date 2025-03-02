"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { bonheurRoyale } from "@/app/fonts";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/config";

interface Highlight {
    id: string;
    type: 'video' | 'image';
    title: string;
    description?: string;
    url?: string;
    youtubeId?: string;
    uploadedAt: string;
}

const CompPictures = () => {
    const [highlights, setHighlights] = useState<Highlight[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;

    useEffect(() => {
        fetchHighlights();
    }, []);

    const fetchHighlights = async () => {
        const q = query(collection(db, "highlights"), orderBy("uploadedAt", "desc"));
        const querySnapshot = await getDocs(q);
        setHighlights(querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Highlight[]);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % (highlights.length - itemsPerPage + 1));
    };

    const handlePrevious = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? 0 : prev - 1
        );
    };

    return (
        <section className="py-14 px-8 md:p-24">
            <div className="max-w-7xl mx-auto">
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
                            {highlights.map((highlight, index) => (
                                <motion.div
                                    key={highlight.id}
                                    className="relative flex-shrink-0 w-[calc(100%/3-1rem)] aspect-[4/3]"
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative h-full overflow-hidden rounded-2xl">
                                        {highlight.type === 'video' ? (
                                            <iframe
                                                src={`https://www.youtube.com/embed/${highlight.youtubeId}`}
                                                className="h-full w-full object-cover"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        ) : (
                                            <img
                                                src={highlight.url}
                                                alt={highlight.title}
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    const img = e.target as HTMLImageElement;
                                                    img.src = '/images/placeholder.jpg';
                                                }}
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                        <div className="absolute bottom-0 left-0 p-6 text-white">
                                            <h3 className="text-xl font-bold mb-2">
                                                {highlight.title}
                                            </h3>
                                            {highlight.description && (
                                                <p className="text-sm text-gray-200">
                                                    {highlight.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <div className="absolute -left-6 -right-6 top-1/2 bottom-12 flex -translate-y-1/2 justify-between">
                        <button
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className="rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-100 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex >= highlights.length - itemsPerPage}
                            className="rounded-full bg-white p-3 shadow-lg transition-all hover:bg-gray-100 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <ChevronRightIcon className="h-6 w-6 text-gray-800" />
                        </button>
                    </div>

                    <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-2">
                        {highlights.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 w-2 rounded-full transition-all ${
                                    index === currentIndex
                                        ? "bg-black w-6"
                                        : "bg-black/50"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompPictures;