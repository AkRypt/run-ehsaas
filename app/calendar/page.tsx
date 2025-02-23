"use client";

import Header from "@/sections/Header";
import { useState } from "react";
import ImageModal from "../components/ImageModal";
import { bonheurRoyale, borel, dancingScript, mrsSaintDelafield, newsreader, sedgwickAveDisplay, yellowtail } from "../fonts";

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
            date: "2024-02-10",
            title: "Important Meeting",
            image: "https://i.imgur.com/7l0K9bI.jpeg"
        },
        {
            date: "2024-02-15",
            title: "Important Meeting",
            image: "https://i.imgur.com/7l0K9bI.jpeg"
        },
        {
            date: "2024-03-15",
            title: "Important Meeting",
            image: "https://i.imgur.com/7l0K9bI.jpeg"
        },
        // Add more events as needed
    ];


    return (
        <main className={`${newsreader.className} overflow-hidden min-h-screen pb-40 bg-gradient-to-br from-red-50 to-white`}>
            <div className="py-8 px-10 md:px-20">
                <h1 className={`${bonheurRoyale.className} text-6xl md:text-7xl text-center bg-gradient-to-r from-red-600 to-red-400
                               text-transparent bg-clip-text animate-gradient`}>
                    Our Calendar
                </h1>
                <p className="text-center text-gray-600 text-xl">
                    We've got some big events coming up, so make sure to mark your calendars!
                </p>
            </div>


            {/* Fun Disclaimer Message */}
            <div className="relative mx-auto max-w-[90%] md:max-w-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="bg-yellow-100 p-1 rounded-xl shadow-lg border-4 border-dashed border-yellow-300">
                    {/* Decorative Elements */}
                    <div className="absolute -top-3 -left-3 w-6 h-6 bg-red-400 rounded-full animate-bounce" />
                    <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-400 rounded-full animate-bounce delay-100" />

                    <p className="text-gray-700 text-lg font-medium text-center relative">
                        <span className="block text-xl font-bold text-red-400">
                            🎭 Psst! A little heads up! 🎭
                        </span>
                        While we try to keep this calendar as groovy as our dance moves,
                        some events might do a little freestyle!
                        <span className="block">
                            Catch all our latest moves on{' '}
                            <a
                                href="https://www.instagram.com/ehsaasdanceteam/"
                                className="inline-block text-red-500 hover:text-red-600 font-bold 
                                         hover:scale-110 transform transition-all duration-200"
                                target="_blank"
                                rel="noopener noreferrer"
                            >✨ Instagram ✨</a>
                        </span>
                    </p>

                    {/* Decorative Corner Lines */}
                    <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-blue-400 rounded-full animate-bounce delay-200" />
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-red-400 rounded-full animate-bounce delay-300" />
                </div>

                {/* Paper Tape Effect */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-yellow-200/80 
                             rotate-2 rounded-sm shadow-sm" />
            </div>


            {/* Main Calendar Component */}
            <div className={`${dancingScript.className} md:max-w-[70%] mx-auto mt-6 px-4`}>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl md:shadow-xl p-2 md:p-8 border border-red-100">
                    {/* Month Navigation */}
                    <div className="flex justify-between items-center mb-8">
                        <h2 className={`text-3xl md:text-4xl font-semibold text-red-600`}>
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </h2>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
                                className="p-3 rounded-full hover:bg-red-100 transition-colors duration-200 text-red-600 text-4xl"
                            >
                                ←
                            </button>
                            <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
                                className="p-3 rounded-full hover:bg-red-100 transition-colors duration-200 text-red-600 text-4xl"
                            >
                                →
                            </button>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2">
                        {/* Week days */}
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className="text-center font-semibold text-red-600 py-2 text-lg">
                                {day}
                            </div>
                        ))}

                        {/* Empty days */}
                        {[...Array(getFirstDayOfMonth(currentMonth))].map((_, index) => (
                            <div key={`empty-${index}`}
                                className="relative aspect-square rounded-lg bg-gray-50/50 flex items-center justify-center">
                                <div className="absolute w-full h-0.5 bg-gray-200/50 transform -rotate-45"></div>
                                <div className="absolute w-full h-0.5 bg-gray-200/50 transform rotate-45"></div>
                            </div>
                        ))}

                        {/* Calendar days */}
                        {[...Array(getDaysInMonth(currentMonth))].map((_, index) => (
                            <div
                                key={index + 1}
                                className="relative aspect-square w-full p-2 rounded-lg 
                                         hover:shadow-lg transition-all duration-50
                                         bg-white hover:bg-red-50 border border-red-100
                                         hover:scale-[1.02] transform"
                            >
                                <span className="absolute top-2 left-2 text-xs md:text-lg font-medium text-red-500">
                                    {index + 1}
                                </span>
                                <div className="mt-4 md:mt-8 flex flex-col gap-1 h-[90%] md:h-[70%] rounded-lg overflow-hidden">
                                    {events.map((event, eventIndex) => {
                                        const eventDate = new Date(event.date);
                                        if (eventDate.getDate() === index + 1 &&
                                            eventDate.getMonth() === currentMonth.getMonth()) {
                                            return (
                                                <div key={eventIndex} className="relative group">
                                                    <img
                                                        src={event.image}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover rounded-lg cursor-pointer 
                                                                 transition-all duration-300 group-hover:scale-105"
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
                            <div key={`empty-end-${index}`}
                                className="relative aspect-square rounded-lg bg-gray-50/50 flex items-center justify-center">
                                {/* Diagonal slash */}
                                <div className="absolute w-full h-0.5 bg-gray-200 transform -rotate-45"></div>
                                <div className="absolute w-full h-0.5 bg-gray-200 transform rotate-45"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {selectedImage && (
                <ImageModal
                    image={selectedImage.url}
                    title={selectedImage.title}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </main>
    );
};

export default Calendar;