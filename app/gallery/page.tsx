"use client";

import Header from "@/sections/Header";
import { motion } from "framer-motion";
import { useState } from "react";

const GalleryPage = () => {

    const images = [
        "https://drive.usercontent.google.com/download?id=1UbJC2EpuhKx7Ne6exZUupHWpq57lZVHF",
        "https://drive.usercontent.google.com/download?id=1UbJC2EpuhKx7Ne6exZUupHWpq57lZVHF&authuser=1",
        "https://drive.google.com/uc?id=1UbJC2EpuhKx7Ne6exZUupHWpq57lZVHF",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
    ];


    const columns = [
        images.filter((_, i) => i % 4 === 0),
        images.filter((_, i) => i % 4 === 1),
        images.filter((_, i) => i % 4 === 2),
        images.filter((_, i) => i % 4 === 3),
    ];

    return (
        <main className="min-h-screen bg-base-300">

            <div className="py-20 px-4 md:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {columns.map((column, columnIndex) => (
                        <div key={columnIndex} className="grid gap-4">
                            {column.map((image, imageIndex) => (
                                <div key={`${columnIndex}-${imageIndex}`} className="">
                                    <motion.img
                                        className="h-full max-w-full rounded-lg"
                                        src={image}
                                        alt=""
                                        loading="lazy"
                                        transition={{ duration: columnIndex * 0.2 + imageIndex * 0.1 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

        </main>
    );
};

export default GalleryPage;