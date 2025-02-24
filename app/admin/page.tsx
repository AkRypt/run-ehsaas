"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { app, googleProvider } from "@/config";
import AdminDashboard from "./AdminDashboard";

const ALLOWED_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

const AdminPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user: any) => {
            if (user && user.email === ALLOWED_EMAIL) {
                setIsLoggedIn(true);
            } else if (user) {
                // If user is logged in but not authorized, sign them out
                auth.signOut();
                setError("Unauthorized email address");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleGoogleLogin = async () => {
        try {
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, googleProvider);

            if (result.user.email !== ALLOWED_EMAIL) {
                await auth.signOut();
                setError("Unauthorized email address");
                return;
            }

            setIsLoggedIn(true);
            setError("");
        } catch (error) {
            setError("Login failed. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </div>
        );
    }

    if (isLoggedIn) {
        return <AdminDashboard />;
    }

    return (
        <main className="min-h-screen bg-gray-100 py-20 px-4">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="flex flex-col items-center">
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-6 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <img
                            src="https://www.google.com/favicon.ico"
                            alt="Google"
                            className="w-6 h-6"
                        />
                        Sign in with Google
                    </button>

                    <p className="mt-4 text-sm text-gray-600 text-center">
                        Only authorized administrators can access this page.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default AdminPage;