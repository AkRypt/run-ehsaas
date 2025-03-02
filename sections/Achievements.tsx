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
        <section className="py-14 px-8 md:p-24">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className={`text-4xl md:text-5xl mb-2 ${bonheurRoyale.className}`}>
                        Achievements
                    </h2>
                    <div className="h-1 w-20 bg-red-500 mx-auto mt-4 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((achievement) => (
                        <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                        >
                            {achievement.type === 'image' && achievement.imageUrl && (
                                <div className="relative h-48">
                                    <img
                                        src={achievement.imageUrl}
                                        alt={achievement.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const img = e.target as HTMLImageElement;
                                            img.src = '/images/placeholder.jpg';
                                        }}
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                                {achievement.description && (
                                    <p className="text-gray-600">{achievement.description}</p>
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