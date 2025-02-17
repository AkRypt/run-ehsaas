"use client";

import Header from "@/sections/Header";
import { useState } from "react";
import ImageModal from "../components/ImageModal";

const Calendar = () => {

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

    // Get days in month and first day of month
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getLastDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    };

    // Sample events (you can replace with your actual events data)
    const events = [
        {
            date: "2024-03-15",
            title: "Important Meeting",
            image: "https://i.imgur.com/7l0K9bI.jpeg"
        },
        // Add more events as needed
    ];


    return (
        <main className="overflow-hidden min-h-screen pb-40 bg-gray-50">
            <Header />

            <div className="h-20"></div>

            {/* Disclaimer Message */}
            <div className="mt-20 text-center text-gray-600 bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                <p className="text-sm">
                    ⚠️ Please note: This calendar may not include all events.
                    For the most up-to-date information and additional events,
                    follow us on <a
                        href="https://instagram.com/your_handle"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Instagram
                    </a>.
                </p>
            </div>

            {selectedImage && (
                <ImageModal
                    image={selectedImage.url}
                    title={selectedImage.title}
                    onClose={() => setSelectedImage(null)}
                />
            )}

            <div className="md:max-w-[60%] mx-auto mt-20 px-4">
                <div className="bg-white rounded-3xl md:shadow-xl md:p-8">
                    {/* Month Navigation */}
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </h2>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                ←
                            </button>
                            <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                →
                            </button>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7">
                        {/* Week days */}
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className="text-center font-semibold text-gray-600 py-2">
                                {day}
                            </div>
                        ))}

                        {/* Calendar days */}
                        {[...Array(getFirstDayOfMonth(currentMonth))].map((_, index) => (
                            <div key={`empty-${index}`} className="relative aspect-square border flex items-center justify-center">
                                {/* Diagonal slash */}
                                <div className="absolute w-full h-0.5 bg-gray-200 transform -rotate-45"></div>
                                <div className="absolute w-full h-0.5 bg-gray-200 transform rotate-45"></div>
                            </div>
                        ))}

                        {[...Array(getDaysInMonth(currentMonth))].map((_, index) => (
                            <div
                                key={index + 1}
                                className="aspect-square p-2 border hover:shadow-md transition-shadow
                                         bg-white hover:bg-gray-50 relative"
                            >
                                <span className="absolute top-1 left-1 font-medium">{index + 1}</span>
                                {/* Event images would go here */}
                                <div className="mt-6 flex flex-col gap-1">
                                    {events.map((event, eventIndex) => {
                                        const eventDate = new Date(event.date);
                                        if (eventDate.getDate() === index + 1 &&
                                            eventDate.getMonth() === currentMonth.getMonth()) {
                                            return (
                                                <div key={eventIndex} className="relative h-16">
                                                    <img
                                                        src={event.image}
                                                        alt={event.title}
                                                        className="rounded-lg object-cover w-full h-full cursor-pointer 
                                                                 hover:opacity-90 transition-opacity"
                                                        onClick={() => setSelectedImage({
                                                            url: event.image,
                                                            title: event.title
                                                        })}
                                                    />
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </div>
                        ))}

                        {[...Array(6 - getLastDayOfMonth(currentMonth))].map((_, index) => (
                            <div key={`empty-end-${index}`} className="relative aspect-square border flex items-center justify-center">
                                {/* Diagonal slash */}
                                <div className="absolute w-full h-0.5 bg-gray-200 transform -rotate-45"></div>
                                <div className="absolute w-full h-0.5 bg-gray-200 transform rotate-45"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Calendar;