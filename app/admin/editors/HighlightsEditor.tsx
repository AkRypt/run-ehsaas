"use client";

import { useState, useEffect } from "react";
import { db } from "@/config";
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { convertGoogleDriveUrl, convertYouTubeUrl, extractYouTubeId } from "@/utilities";
import FormInput from "@/app/components/Form/FormInput";
import MediaUrlInput from "@/app/components/Form/MediaUrlInput";
import FormTextArea from "@/app/components/Form/FormTextArea";
import FormSelect from "@/app/components/Form/FormSelect";

interface Highlight {
    id: string;
    type: 'video' | 'image';
    title: string;
    description?: string;
    url?: string;
    youtubeId?: string;
    uploadedAt: string;
}

const HighlightsEditor = () => {
    const [highlights, setHighlights] = useState<Highlight[]>([]);
    const [type, setType] = useState<'video' | 'image'>('video');
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState("");

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



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Adding highlight...");

        try {
            const highlightData: Omit<Highlight, 'id'> = {
                type,
                title,
                description,
                uploadedAt: new Date().toISOString()
            };

            if (type === 'video') {
                highlightData.youtubeId = extractYouTubeId(url);
            } else {
                highlightData.url = convertGoogleDriveUrl(url);
            }

            await addDoc(collection(db, "highlights"), highlightData);

            // Reset form
            setTitle("");
            setDescription("");
            setUrl("");
            setStatus("Highlight added successfully!");
            fetchHighlights();
        } catch (error) {
            setStatus(`Failed to add highlight: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const handleDelete = async (highlight: Highlight) => {
        if (!confirm('Are you sure you want to delete this highlight?')) return;

        try {
            await deleteDoc(doc(db, "highlights", highlight.id));
            setStatus("Highlight removed successfully!");
            fetchHighlights();
        } catch (error) {
            setStatus("Failed to remove highlight. Please try again.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Add New Highlight</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormSelect
                        label="Highlight Type"
                        value={type}
                        onChange={(value) => setType(value as 'video' | 'image')}
                        options={[
                            { value: 'video', label: 'Video Highlight' },
                            { value: 'image', label: 'Image Highlight' }
                        ]}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Highlight Type
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as 'video' | 'image')}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                        >
                            <option value="video">YouTube Video</option>
                            <option value="image">Image</option>
                        </select>
                    </div>

                    <FormInput
                        label="Title"
                        value={title}
                        onChange={setTitle}
                        placeholder="Highlight title"
                        required
                    />

                    <MediaUrlInput
                        type={type === 'video' ? 'youtube' : 'image'}
                        value={url}
                        onChange={setUrl}
                        required
                    />

                    <FormTextArea
                        label="Description (optional)"
                        value={description}
                        onChange={setDescription}
                        placeholder="Add a description"
                    />

                    <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                        Add Highlight
                    </button>

                    {status && (
                        <p className={`text-sm ${status.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
                            {status}
                        </p>
                    )}
                </form>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Manage Highlights</h2>

                <div className="grid gap-6">
                    {highlights.map((highlight) => (
                        <div key={highlight.id} className="relative bg-gray-50 p-4 rounded-lg">
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-medium text-lg">{highlight.title}</h3>
                                    <button
                                        onClick={() => handleDelete(highlight)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>

                                {highlight.type === 'video' ? (
                                    <div className="relative w-full aspect-video">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${highlight.youtubeId}`}
                                            className="absolute inset-0 w-full h-full rounded-lg"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src={highlight.url}
                                        alt={highlight.title}
                                        className="w-full max-h-96 object-cover rounded-lg"
                                        onError={(e) => {
                                            const img = e.target as HTMLImageElement;
                                            img.src = '/images/placeholder.jpg';
                                        }}
                                    />
                                )}

                                {highlight.description && (
                                    <p className="text-gray-600">{highlight.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HighlightsEditor;