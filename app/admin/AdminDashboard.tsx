"use client";

import { useState, useEffect } from "react";
import { db } from "@/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AboutEditor from "./editors/AboutEditor";
import { getAuth, signOut } from "firebase/auth";
import GalleryEditor from "./editors/GalleryEditor";

const tabs = [
    { id: 'about', label: 'About Section' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'performances', label: 'Performances' },
    { id: 'gallery', label: 'Gallery' },
];

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('gallery');

    const handleLogout = async () => {
        const auth = getAuth();
        await signOut(auth);
    };

    const renderEditor = () => {
        switch (activeTab) {
            case 'about':
                return <AboutEditor />;
            // case 'achievements':
            //     return <AchievementsEditor />;
            // case 'highlights':
            //     return <HighlightsEditor />;
            // case 'timeline':
            //     return <TimelineEditor />;
            // case 'performances':
            //     return <PerformancesEditor />;
            case 'gallery':
                return <GalleryEditor />;
            default:
                return null;
        }
    };


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm text-red-600 hover:text-red-700"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                                        ? 'border-red-500 text-red-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Editor Area */}
                <div className="mt-6">
                    {renderEditor()}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;