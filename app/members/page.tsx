"use client";

import Header from "@/sections/Header";
import { motion } from "framer-motion";
import { bonheurRoyale } from "../fonts";
import CaptainCard from "./components/CaptainCard";
import V1CaptainCard from "./components/v1CaptainCard";
import EBoardCard from "./components/EBoardCard";

const eboard = [
  {
    name: "Simran Dabas",
    position: "Co-Captain",
    image: "/images/simran.jpg",
    school: "Rutgers"
  },
  {
    name: "Vanshika",
    position: "Co-Captain",
    image: "/images/simran.jpg",
    school: "Rutgers"
  },
  {
    name: "Joshua Kanattu",
    position: "Secretary",
    image: "/images/simran.jpg",
    school: "Rutgers"
  },
  {
    name: "Rishika Vadi",
    position: "VP & Treasurer",
    image: "/images/simran.jpg",
    school: "Rutgers"
  },
  {
    name: "Shrima Patel",
    position: "Production Chair",
    image: "/images/simran.jpg",
    school: "Rutgers"
  },
  {
    name: "Tanisha Verma",
    position: "PR Head",
    image: "/images/simran.jpg",
    school: "Rutgers"
  },
  {
    name: "Nila K",
    position: "Technical Chair",
    image: "/images/simran.jpg",
    school: "Rutgers"
  }
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
    <main className="overflow-hidden bg-neutral pb-40">

      {/* Hero Section with E-board */}
      <section className="min-h-screen relative pt-20 px-4">
        <h1 className={`text-6xl font-bold text-center text-white my-10 ${bonheurRoyale.className}`}>
          Meet the E-Board
        </h1>

        {/* <div className="flex justify-center gap-60">
          <CaptainCard member={eboard[0]} />
          <V1CaptainCard member={eboard[0]} />
        </div> */}

        {/* <div className="max-w-7xl mx-auto mt-20"> */}
        <div className="flex flex-col items-center justify-center">
          {/* Top row - Captains */}
          <div className="flex justify-center gap-12 px-2 md:max-w-[50%] mb-40">
            {eboard.slice(0, 2).map((member, index) => (
              <CaptainCard key={index} member={member} />
            ))}
          </div>

          {/* Bottom rows - Other E-board members in hexagonal layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-20 space-y-10 md:space-y-0 px-2 md:max-w-[70%] mx-auto">
            {eboard.slice(2).map((member, index) => (
              <motion.div
                key={member.name}
                // initial={{ opacity: 0,  }}
                animate={{
                  // opacity: 1,
                  // y: [1, 4].includes(index) ? -30 : 0 // Middle card elevated
                }}
                // transition={{ delay: (index + 2) * 0.2 }}
                // className={`relative border group ${index === 1 || index === 4 ? 'md:translate-y-12' : ''}`}
              >
                {/* <EBoardCard member={member} /> */}
                <CaptainCard member={member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default Members;