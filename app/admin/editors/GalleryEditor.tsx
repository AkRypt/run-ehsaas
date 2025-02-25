"use client";

import { useState, useEffect } from "react";
import { db } from "@/config";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const GalleryEditor = () => {
    const [images, setImages] = useState<any[]>([]);
    const [newImageUrl, setNewImageUrl] = useState("");
    const [caption, setCaption] = useState(""); // Add this state
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetchImages();
        // fetchDriveImages();
    }, []);

    const fetchDriveImages = async () => {
        const response = await fetch('/api/drive/images');
        const data = await response.json();
        setImages(data);
    };

    const fetchImages = async () => {
        const querySnapshot = await getDocs(collection(db, "gallery"));
        setImages(querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })));
    };

    // Convert Google Drive sharing URL to direct image URL
    const convertGoogleDriveUrl = (url: string) => {
        // Handle different Google Drive URL formats
        let fileId = "";

        // Format 1: https://drive.google.com/file/d/{fileId}/view...
        if (url.includes("/file/d/")) {
            fileId = url.split("/file/d/")[1].split("/")[0];
        }
        // Format 2: https://drive.google.com/open?id={fileId}
        else if (url.includes("?id=")) {
            fileId = url.split("?id=")[1].split("&")[0];
        }
        // Format 3: Already a direct link
        else if (url.includes("uc?id=")) {
            return url;
        }

        if (!fileId) {
            throw new Error("Invalid Google Drive URL");
        }

        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    };

    const handleAddImage = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Adding image...");

        try {
            const directUrl = convertGoogleDriveUrl(newImageUrl);

            // Add image info to Firestore
            await addDoc(collection(db, "gallery"), {
                url: directUrl,
                originalUrl: newImageUrl, // Store original URL for reference
                caption: caption,
                uploadedAt: new Date().toISOString()
            });

            setNewImageUrl("");
            setCaption("");
            setStatus("Image added successfully!");
            fetchImages();
        } catch (error) {
            setStatus("Failed to add image. Please check the URL and try again.");
        }
    };

    const handleDelete = async (image: any) => {
        try {
            await deleteDoc(doc(db, "gallery", image.id));
            setStatus("Image removed successfully!");
            fetchImages();
        } catch (error) {
            setStatus("Failed to remove image. Please try again.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Add New Image</h2>

                <form onSubmit={handleAddImage} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Google Drive Image URL
                        </label>
                        <input
                            type="url"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            placeholder="Paste Google Drive sharing link here"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            required
                        />
                        <div className="mt-2 text-sm text-gray-500">
                            How to get the URL:
                            <ol className="list-decimal ml-4 mt-1">
                                <li>Open the image in Google Drive</li>
                                <li>Click "Share" button</li>
                                <li>Set access to "Anyone with the link"</li>
                                <li>Copy the sharing link</li>
                            </ol>
                        </div>
                    </div>

                    {/* Add caption input field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image Caption (optional)
                        </label>
                        <input
                            type="text"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Add a caption for this image"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            maxLength={100}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                        Add Image
                    </button>

                    {status && (
                        <p className={`text-sm ${status.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
                            {status}
                        </p>
                    )}
                </form>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Manage Gallery Images</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image) => (
                        <div key={image.id} className="relative group">
                            <img
                                src={image.url}
                                alt=""
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                                <button
                                    onClick={() => handleDelete(image)}
                                    className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryEditor;