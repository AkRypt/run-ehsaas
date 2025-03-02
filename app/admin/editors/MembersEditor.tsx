"use client";

import { useState, useEffect } from "react";
import { db } from "@/config";
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { convertGoogleDriveUrl } from "@/utilities";
import FormInput from "@/app/components/Form/FormInput";
import MediaUrlInput from "@/app/components/Form/MediaUrlInput";

interface Member {
    id: string;
    name: string;
    position: string;
    school: string;
    image: string;
    isEboard: boolean;
    originalUrl?: string;
    uploadedAt: string;
}

const MembersEditor = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [school, setSchool] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [status, setStatus] = useState("");
    const [isEboard, setIsEboard] = useState(false);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        const q = query(collection(db, "members"), orderBy("uploadedAt", "desc"));
        const querySnapshot = await getDocs(q);
        setMembers(querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Member[]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Adding member...");

        try {
            const memberData: Omit<Member, 'id'> = {
                name,
                position,
                school,
                image: convertGoogleDriveUrl(imageUrl),
                isEboard,
                originalUrl: imageUrl,
                uploadedAt: new Date().toISOString()
            };

            await addDoc(collection(db, "members"), memberData);

            // Reset form
            setName("");
            setPosition("");
            setSchool("");
            setImageUrl("");
            setIsEboard(false);
            setStatus("Member added successfully!");
            fetchMembers();
        } catch (error) {
            setStatus(`Failed to add member: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const handleDelete = async (member: Member) => {
        if (!confirm('Are you sure you want to remove this member?')) return;

        try {
            await deleteDoc(doc(db, "members", member.id));
            setStatus("Member removed successfully!");
            fetchMembers();
        } catch (error) {
            setStatus("Failed to remove member. Please try again.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Add New Member</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput
                        label="Name"
                        value={name}
                        onChange={setName}
                        placeholder="Member's full name"
                        required
                    />

                    <FormInput
                        label="Position"
                        value={position}
                        onChange={setPosition}
                        placeholder="e.g., Captain, Co-Captain, Secretary"
                        required
                    />

                    <FormInput
                        label="School"
                        value={school}
                        onChange={setSchool}
                        placeholder="e.g., Rutgers"
                        required
                    />

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isEboard"
                            checked={isEboard}
                            onChange={(e) => setIsEboard(e.target.checked)}
                            className="h-4 w-4 text-red-500 rounded border-gray-300 focus:ring-red-500"
                        />
                        <label htmlFor="isEboard" className="text-sm font-medium text-gray-700">
                            E-Board Member
                        </label>
                    </div>

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
                        Add Member
                    </button>

                    {status && (
                        <p className={`text-sm ${status.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
                            {status}
                        </p>
                    )}
                </form>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Manage Members</h2>

                <div className="grid gap-4">
                    {members.map((member) => (
                        <div key={member.id} className="relative bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-16 h-16 object-cover rounded-full"
                                        onError={(e) => {
                                            const img = e.target as HTMLImageElement;
                                            img.src = '/images/placeholder.jpg';
                                        }}
                                    />
                                    <div>
                                        <h3 className="font-medium">{member.name}</h3>
                                        <p className="text-gray-600">
                                            {member.position}
                                            {member.isEboard && <span className="ml-2 text-red-500 text-sm">(E-Board)</span>}
                                        </p>
                                        <p className="text-gray-500 text-sm">{member.school}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(member)}
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

export default MembersEditor;