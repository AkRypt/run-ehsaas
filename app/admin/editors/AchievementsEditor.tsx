"use client";

import { useState, useEffect } from "react";
import { db } from "@/config";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { convertGoogleDriveUrl } from "@/utilities";
import FormInput from "@/app/components/Form/FormInput";
import MediaUrlInput from "@/app/components/Form/MediaUrlInput";
import FormTextArea from "@/app/components/Form/FormTextArea";
import FormSelect from "@/app/components/Form/FormSelect";

interface Achievement {
    id: string;
    type: 'image' | 'text';
    title: string;
    description?: string;
    imageUrl?: string;
    originalUrl?: string;
    uploadedAt: string;
}

const AchievementsEditor = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [type, setType] = useState<'image' | 'text'>('text');
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        const querySnapshot = await getDocs(collection(db, "achievements"));
        setAchievements(querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Achievement[]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Adding achievement...");

        try {
            const achievementData: Partial<Achievement> = {
                type,
                title,
                uploadedAt: new Date().toISOString()
            };

            if (type === 'text') {
                achievementData.description = description;
            } else {
                const directUrl = convertGoogleDriveUrl(imageUrl);
                achievementData.imageUrl = directUrl;
                achievementData.originalUrl = imageUrl;
                achievementData.description = description;
            }

            await addDoc(collection(db, "achievements"), achievementData);

            // Reset form
            setTitle("");
            setDescription("");
            setImageUrl("");
            setStatus("Achievement added successfully!");
            fetchAchievements();
        } catch (error) {
            setStatus("Failed to add achievement. Please try again.");
        }
    };

    const handleDelete = async (achievement: Achievement) => {
        try {
            await deleteDoc(doc(db, "achievements", achievement.id));
            setStatus("Achievement removed successfully!");
            fetchAchievements();
        } catch (error) {
            setStatus("Failed to remove achievement. Please try again.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Add New Achievement</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormSelect
                        label="Achievement Type"
                        value={type}
                        onChange={(value) => setType(value as 'image' | 'text')}
                        options={[
                            { value: 'text', label: 'Text Achievement' },
                            { value: 'image', label: 'Image Achievement' }
                        ]}
                        required
                    />

                    <FormInput
                        label="Title"
                        value={title}
                        onChange={setTitle}
                        placeholder="Achievement title"
                        required
                    />


                    {type === 'image' && (
                        <MediaUrlInput
                            type="image"
                            value={imageUrl}
                            onChange={setImageUrl}
                            required
                        />
                    )}

                    <FormTextArea
                        label="Description"
                        value={description}
                        onChange={setDescription}
                        placeholder="Achievement description"
                        required
                    />


                    <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                        Add Achievement
                    </button>

                    {status && (
                        <p className={`text-sm ${status.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
                            {status}
                        </p>
                    )}
                </form>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Manage Achievements</h2>

                <div className="grid gap-4">
                    {achievements.map((achievement) => (
                        <div key={achievement.id} className="relative bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <h3 className="font-medium">{achievement.title}</h3>
                                    {achievement.type === 'image' && (
                                        <img
                                            src={achievement.imageUrl}
                                            alt={achievement.title}
                                            className="w-48 h-32 object-cover rounded-lg"
                                        />
                                    )}
                                    <p className="text-gray-600">{achievement.description}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(achievement)}
                                    className="text-red-600 hover:text-red-700"
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

export default AchievementsEditor;