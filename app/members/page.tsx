"use client";

import Header from "@/sections/Header";
import { motion } from "framer-motion";
import Starfield from "../components/Starfield";
import AuroraBorealis from "../components/AuroraBorealis";
import { bonheurRoyale } from "../fonts";

const eboard = [
    {
        name: "Simran Dabas",
        position: "Captain",
        image: "/images/simran.jpg",
        year: "Senior",
        major: "Computer Science"
    },
    {
        name: "Vanshika",
        position: "Co-Captain",
        image: "/images/simran.jpg",
        year: "Junior",
        major: "Business Administration"
    },
    {
        name: "Joshua Kanattu",
        position: "Co-Captain",
        image: "/images/simran.jpg",
        year: "Junior",
        major: "Business Administration"
    },
    {
        name: "Aathira Nair",
        position: "Co-Captain",
        image: "/images/simran.jpg",
        year: "Junior",
        major: "Business Administration"
    },
    {
        name: "Rishika Vadi",
        position: "Co-Captain",
        image: "/images/simran.jpg",
        year: "Junior",
        major: "Business Administration"
    },
    {
        name: "Shrima Patel",
        position: "Co-Captain",
        image: "/images/simran.jpg",
        year: "Junior",
        major: "Business Administration"
    },
    {
        name: "Tanisha Verma",
        position: "Co-Captain",
        image: "/images/simran.jpg",
        year: "Junior",
        major: "Business Administration"
    },
    {
        name: "Nila K",
        position: "Co-Captain",
        image: "/images/simran.jpg",
        year: "Junior",
        major: "Business Administration"
    },
    // Add more E-board members
];

const teamMembers = [
    {
        name: "Priya Shah",
        position: "Dancer",
        image: "/images/members/priya.jpg",
        year: "Sophomore"
    },
    // Add more team members
];

const Members = () => {

    return (
        <main className="special overflow-hidden">
            <Header />
            <canvas id="starfield" className="fixed inset-0 w-full h-full" />

            {/* Hero Section with E-board */}
            <section className="min-h-screen relative pt-20 px-4">
                <h1 className={`text-6xl font-bold text-center text-white my-10 ${bonheurRoyale.className}`}
                >
                    Meet the E-Board
                </h1>

                <div className="max-w-7xl mx-auto">
                    {/* Top row - Captains */}
                    <div className="flex justify-center gap-12 mb-16">
                        {eboard.slice(0, 2).map((member, index) => (
                            <div className="">
                                <p className="text-red-200 text-center font-semibold mb-2">{member.position}</p>
                                <div key={member.name} className="relative aspect-[7/8] w-[300px] border border-transparent group">


                                    <img src="/images/frames/gold.png" alt="" className="absolute inset-0 w-full h-full z-10" />

                                    {/* Card Content */}
                                    <div className="relative h-full rounded-2xl overflow-hidden m-10">
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent 
                                              " />
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 m-4 mb-6 text-white transform transition-transform 
                                              duration-200 group-hover:translate-y-[-10px]">
                                            <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                                            {/* <p className="text-red-200 font-semibold mb-2">{member.position}</p> */}
                                            <div className="h-px w-12 bg-red-500/50 mb-3" />
                                            <p className="text-sm text-gray-200">
                                                {member.year} • {member.major}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom rows - Other E-board members in hexagonal layout */}
                    <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {eboard.slice(2).map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{
                                    opacity: 1,
                                    y: [1, 4].includes(index) ? -30 : 0 // Middle card elevated
                                }}
                                transition={{ delay: (index + 2) * 0.2 }}
                                className={`relative group ${index === 1 || index === 4 ? 'translate-y-12' : ''
                                    }`}
                            >
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-red-900/50 to-transparent 
                                  transition-opacity duration-300 group-hover:opacity-75" />
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform 
                                  duration-500 group-hover:translate-y-[-10px]">
                                        <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                                        <p className="text-red-200 font-medium mb-2">{member.position}</p>
                                        <div className="h-px w-12 bg-red-500/50 mb-3" />
                                        <p className="text-sm text-gray-200">
                                            {member.year} • {member.major}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="min-h-screen relative bg-white mt-20 px-4">
                TEAM MEMBERS
            </section>

        </main>
    );
};

export default Members;