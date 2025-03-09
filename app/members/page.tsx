"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { bonheurRoyale } from "../fonts";
import CaptainCard from "./components/CaptainCard";
import { db } from "@/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import ElegantCard from "./components/ElegantCard";
import V1CaptainCard from "./components/v1CaptainCard";
import V2Card from "./components/V2Card";

interface Member {
    id: string;
    name: string;
    position: string;
    school: string;
    image: string;
    isEboard: boolean;
    uploadedAt: string;
}

const Members = () => {
    const [eboardMembers, setEboardMembers] = useState<Member[]>([]);
    const [regularMembers, setRegularMembers] = useState<Member[]>([]);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        const q = query(collection(db, "members"), orderBy("uploadedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const allMembers = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Member[];

        setEboardMembers(allMembers.filter(member => member.isEboard));
        setRegularMembers(allMembers.filter(member => !member.isEboard));
    };

    // Separate captains from other e-board members
    const captains = eboardMembers.filter(member =>
        member.position.toLowerCase().includes('captain')
    );
    const otherEboard = eboardMembers.filter(member =>
        !member.position.toLowerCase().includes('captain')
    );

    return (
        <main className="overflow-hidden bg-neutral pb-40">
            <section className="min-h-screen relative pt-20 px-4">
                <h1 className={`text-6xl font-bold text-center text-white my-10 ${bonheurRoyale.className}`}>
                    Meet the E-Board
                </h1>

                <div className="flex flex-col items-center justify-center">

                    {/* TYPES OF CARDS BELOW. NEED TO CHOOSE ONE */}
                    {/* Top row - Captains */}
                    <div className="flex justify-center gap-12 px-2 md:max-w-[50%] mb-40">
                        {captains.map((member, index) => (
                            <CaptainCard key={member.id} member={member} />
                        ))}
                    </div>


                    <div className="flex justify-center gap-12 px-2 md:max-w-[50%] mb-40">
                        {captains.map((member, index) => (
                            <ElegantCard key={member.id} member={member} />
                        ))}
                    </div>


                    <div className="flex justify-center gap-12 px-2 md:max-w-[50%] mb-40">
                        {captains.map((member, index) => (
                            <V1CaptainCard key={member.id} member={member} />
                        ))}
                    </div>


                    <div className="flex justify-center gap-12 px-2 md:max-w-[50%] mb-40">
                        {captains.map(member => (
                            <V2Card key={member.id} member={member} />
                        ))}
                    </div>




                    {/* Bottom rows - Other E-board members */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-20 space-y-10 md:space-y-0 px-2 md:max-w-[70%] mx-auto">
                        {otherEboard.map((member) => (
                            <motion.div key={member.id}>
                                <CaptainCard member={member} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Regular Members Section */}
            {regularMembers.length > 0 && (
                <section className="pt-20 px-4">
                    <h2 className={`text-5xl font-bold text-center text-white mb-16 ${bonheurRoyale.className}`}>
                        Team Members
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {regularMembers.map((member) => (
                            <CaptainCard key={member.id} member={member} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
};

export default Members;