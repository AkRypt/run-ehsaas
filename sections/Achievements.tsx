"use client";

import { useState, useEffect } from "react";
import { bonheurRoyale } from "@/app/fonts";
import { motion } from "framer-motion";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/config";

interface Achievement {
    id: string;
    type: 'image' | 'text';
    title: string;
    description?: string;
    imageUrl?: string;
    uploadedAt: string;
}

const Achievements = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        const q = query(collection(db, "achievements"), orderBy("uploadedAt", "desc"));
        const querySnapshot = await getDocs(q);
        setAchievements(querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Achievement[]);
    };

    return (
        <section className="py-20 px-8 md:p-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className={`text-5xl md:text-6xl mb-4 ${bonheurRoyale.className} text-gray-800`}>
                        Our Achievements
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Celebrating our milestones and successes along the journey
                    </p>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-red-400 to-red-600 mx-auto mt-6 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ 
                                y: -8,
                                transition: { duration: 0.2 }
                            }}
                            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
                        >
                            {achievement.type === 'image' && achievement.imageUrl && (
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={achievement.imageUrl}
                                        alt={achievement.title}
                                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                                        onError={(e) => {
                                            const img = e.target as HTMLImageElement;
                                            img.src = '/images/placeholder.jpg';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            )}
                            <div className={`p-8 ${achievement.type === 'text' ? 'pt-12' : ''}`}>
                                <motion.h3 
                                    className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-red-600 transition-colors duration-300"
                                >
                                    {achievement.title}
                                </motion.h3>
                                {achievement.description && (
                                    <p className="text-gray-600 leading-relaxed">
                                        {achievement.description}
                                    </p>
                                )}
                                {achievement.type === 'text' && (
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full -mr-10 -mt-10" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;