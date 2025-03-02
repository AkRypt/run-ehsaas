"use client";

import { useState, useEffect } from "react";
import { db } from "@/config";
import { collection, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { extractYouTubeId } from "@/utilities";
import DatePicker from "@/app/components/Form/DatePicker";
import FormInput from "@/app/components/Form/FormInput";
import FormTextArea from "@/app/components/Form/FormTextArea";
import MediaUrlInput from "@/app/components/Form/MediaUrlInput";

interface Performance {
    title: string;
    youtubeId: string;
    date: string;
    description: string;
}

interface YearPerformances {
    year: string;
    performances: Performance[];
}

const PerformancesEditor = () => {
    const [yearData, setYearData] = useState<YearPerformances[]>([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [title, setTitle] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetchPerformances();
    }, []);

    const fetchPerformances = async () => {
        try {
            const docRef = doc(db, "content", "performances");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setYearData(docSnap.data().years || []);
            } else {
                // Initialize if document doesn't exist
                await setDoc(docRef, { years: [] });
                setYearData([]);
            }
        } catch (error) {
            setStatus("Failed to fetch performances");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Adding performance...");

        try {
            const youtubeId = extractYouTubeId(youtubeUrl);

            const newPerformance: Performance = {
                title,
                youtubeId,
                date,
                description
            };

            const updatedYearData = [...yearData];
            const yearIndex = updatedYearData.findIndex(y => y.year === selectedYear);

            if (yearIndex === -1) {
                // Add new year
                updatedYearData.push({
                    year: selectedYear,
                    performances: [newPerformance]
                });
            } else {
                // Add to existing year
                updatedYearData[yearIndex].performances.push(newPerformance);
            }

            // Sort years in descending order
            updatedYearData.sort((a, b) => parseInt(b.year) - parseInt(a.year));

            await setDoc(doc(db, "content", "performances"), {
                years: updatedYearData
            });

            setYearData(updatedYearData);

            // Reset form
            setTitle("");
            setYoutubeUrl("");
            setDate("");
            setDescription("");
            setStatus("Performance added successfully!");
        } catch (error) {
            setStatus(`Failed to add performance: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const handleDelete = async (yearIndex: number, performanceIndex: number) => {
        if (!confirm('Are you sure you want to delete this performance?')) return;

        try {
            const updatedYearData = [...yearData];
            updatedYearData[yearIndex].performances.splice(performanceIndex, 1);

            // Remove year if no performances left
            if (updatedYearData[yearIndex].performances.length === 0) {
                updatedYearData.splice(yearIndex, 1);
            }

            await setDoc(doc(db, "content", "performances"), {
                years: updatedYearData
            });

            setYearData(updatedYearData);
            setStatus("Performance removed successfully!");
        } catch (error) {
            setStatus("Failed to remove performance");
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Add New Performance</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Year
                        </label>
                        <input
                            type="number"
                            min="2000"
                            max="2100"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            required
                        />
                    </div>

                    <FormInput
                        label="Title"
                        value={title}
                        onChange={setTitle}
                        placeholder="Performance title"
                        required
                    />

                    <MediaUrlInput
                        type="youtube"
                        value={youtubeUrl}
                        onChange={setYoutubeUrl}
                        required
                    />

                    <DatePicker
                        label="Date"
                        value={date}
                        onChange={setDate}
                        required
                    />

                    <FormTextArea
                        label="Description"
                        value={description}
                        onChange={setDescription}
                        placeholder="Performance description"
                    />


                    <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                        Add Performance
                    </button>

                    {status && (
                        <p className={`text-sm ${status.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
                            {status}
                        </p>
                    )}
                </form>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Manage Performances</h2>

                <div className="space-y-8">
                    {yearData.map((yearGroup, yearIndex) => (
                        <div key={yearGroup.year} className="space-y-4">
                            <h3 className="text-xl font-medium">{yearGroup.year}</h3>
                            <div className="grid gap-4">
                                {yearGroup.performances.map((performance, perfIndex) => (
                                    <div key={`${yearGroup.year}-${perfIndex}`} className="relative bg-gray-50 p-4 rounded-lg">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-medium">{performance.title}</h4>
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(performance.date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleDelete(yearIndex, perfIndex)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            <div className="relative w-full aspect-video">
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${performance.youtubeId}`}
                                                    className="absolute inset-0 w-full h-full rounded-lg"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </div>

                                            <p className="text-gray-600">{performance.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PerformancesEditor;