"use client";

import { db } from "@/config";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GalleryImage {
    id: string;
    url: string;
    caption?: string;
    uploadedAt: string;
}

const GalleryPage = () => {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "gallery"));
            const fetchedImages = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as GalleryImage[];

            fetchedImages.sort((a, b) =>
                new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
            );

            setImages(fetchedImages);
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-16 bg-black">
            <div className="pt-10 pb-40">

                <div className="px-4 md:px-8">
                    {loading ? (
                        <div className="text-center text-white">Loading gallery...</div>
                    ) : images.length === 0 ? (
                        <div className="text-center text-gray-400">
                            No images available
                        </div>
                    ) : (
                        <div className="columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance] w-full">
                            {images.map((image, index) => (
                                <motion.div
                                    key={image.id}
                                    className="break-inside-avoid mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="relative group">
                                        <img
                                            src={image.url}
                                            alt={image.caption || ""}
                                            className="w-full rounded-lg shadow-lg transition-all duration-300 
                                                     group-hover:shadow-2xl group-hover:scale-[1.02]"
                                            onError={(e) => {
                                                const img = e.target as HTMLImageElement;
                                                img.src = '/images/placeholder.jpg';
                                            }}
                                        />
                                        {image.caption && (
                                            <div className="absolute inset-0 bg-black bg-opacity-0 
                                                          group-hover:bg-opacity-40 scale-[1.02] transition-all 
                                                          rounded-lg flex items-end">
                                                <p className="text-white p-4 opacity-0 
                                                          group-hover:opacity-100 transition-opacity">
                                                    {image.caption}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default GalleryPage;