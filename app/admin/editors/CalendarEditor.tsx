"use client";

import { useState, useEffect } from "react";
import { db } from "@/config";
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { convertGoogleDriveUrl } from "@/utilities";
import FormInput from "@/app/components/Form/FormInput";
import FormTextArea from "@/app/components/Form/FormTextArea";
import MediaUrlInput from "@/app/components/Form/MediaUrlInput";
import DatePicker from "@/app/components/Form/DatePicker";

interface CalendarEvent {
    id: string;
    date: string;
    title: string;
    description?: string;
    image?: string;
    uploadedAt: string;
}

const CalendarEditor = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const q = query(collection(db, "calendar"), orderBy("date", "asc"));
        const querySnapshot = await getDocs(q);
        setEvents(querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as CalendarEvent[]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Adding event...");

        try {
            const eventData: Omit<CalendarEvent, 'id'> = {
                date,
                title,
                description,
                image: imageUrl ? convertGoogleDriveUrl(imageUrl) : undefined,
                uploadedAt: new Date().toISOString()
            };

            await addDoc(collection(db, "calendar"), eventData);

            // Reset form
            setDate("");
            setTitle("");
            setDescription("");
            setImageUrl("");
            setStatus("Event added successfully!");
            fetchEvents();
        } catch (error) {
            setStatus(`Failed to add event: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const handleDelete = async (event: CalendarEvent) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
            await deleteDoc(doc(db, "calendar", event.id));
            setStatus("Event removed successfully!");
            fetchEvents();
        } catch (error) {
            setStatus("Failed to remove event. Please try again.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Add New Calendar Event</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <DatePicker
                        label="Date"
                        value={date}
                        onChange={setDate}
                        required
                    />

                    <FormInput
                        label="Title"
                        value={title}
                        onChange={setTitle}
                        placeholder="Event title"
                        required
                    />

                    <FormTextArea
                        label="Description"
                        value={description}
                        onChange={setDescription}
                        placeholder="Event description"
                    />

                    <MediaUrlInput
                        type="image"
                        value={imageUrl}
                        onChange={setImageUrl}
                        required
                    />

                    <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                        Add Event
                    </button>

                    {status && (
                        <p className={`text-sm ${status.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
                            {status}
                        </p>
                    )}
                </form>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Manage Calendar Events</h2>

                <div className="grid gap-4">
                    {events.map((event) => (
                        <div key={event.id} className="relative bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-2 flex-grow">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500">
                                            {new Date(event.date).toLocaleDateString()}
                                        </span>
                                        <h3 className="font-medium">{event.title}</h3>
                                    </div>
                                    {event.description && (
                                        <p className="text-gray-600">{event.description}</p>
                                    )}
                                    {event.image && (
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-48 h-32 object-cover rounded-lg"
                                            onError={(e) => {
                                                const img = e.target as HTMLImageElement;
                                                img.src = '/images/placeholder.jpg';
                                            }}
                                        />
                                    )}
                                </div>
                                <button
                                    onClick={() => handleDelete(event)}
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

export default CalendarEditor;