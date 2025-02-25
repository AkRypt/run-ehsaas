"use client";

import { db } from "@/config";
import Header from "@/sections/Header";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { google } from "googleapis";
import { useEffect, useState } from "react";

const GalleryPage = () => {
    const [images, setImages] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // setImages(images1);
        fetchImages();
        // fetchDriveImages();
    }, []);

    const fetchImages = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "gallery"));
            const fetchedImages = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as any));

            // Sort by uploadedAt if needed
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


    const images1 = [
        // { url: "https://drive.usercontent.google.com/download?id=1UbJC2EpuhKx7Ne6exZUupHWpq57lZVHF", caption: "Caption 1" },
        // { url: "https://drive.usercontent.google.com/download?id=1UbJC2EpuhKx7Ne6exZUupHWpq57lZVHF&authuser=1" },
        // { url: "https://drive.google.com/uc?id=1UbJC2EpuhKx7Ne6exZUupHWpq57lZVHF" },
        { url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg", caption: "Caption 3" },
        { url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" },
        { url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" },
        { url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" },
        { url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" },
        { url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" },
        { url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" },
        { url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" },
        { url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" },
        { url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" },
        { url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" },
        { url: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" },
    ];


    const columns = [
        images?.filter((_: any, i: any) => i % 4 === 0),
        images?.filter((_: any, i: any) => i % 4 === 1),
        images?.filter((_: any, i: any) => i % 4 === 2),
        images?.filter((_: any, i: any) => i % 4 === 3),
    ];

    return (
        <main className="min-h-screen bg-base-300">

            <div className="py-20 px-4 md:px-8">
                {images.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No images available
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {columns.map((column, columnIndex) => (
                            <div key={columnIndex} className="grid gap-4">
                                {column.map((image: any, imageIndex: any) => (
                                    <div
                                        key={`${columnIndex}-${imageIndex}`}
                                        className="relative group"
                                    >
                                        <motion.img
                                            className="h-full max-w-full rounded-lg object-contain"
                                            src={image.url}
                                            alt={image.caption || ""}
                                            transition={{
                                                duration: columnIndex * 0.2 + imageIndex * 0.1
                                            }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        />
                                        {image.caption && (
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-end">
                                                <p className="text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {image.caption}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </main>
    );
};

export default GalleryPage;