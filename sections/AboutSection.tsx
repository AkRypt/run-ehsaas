"use client";

import { bonheurRoyale } from "@/app/fonts";
import { db } from "@/config";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AboutSection = () => {
  const [content, setContent] = useState<any>({
    title: "Our Story",
    subtitle: "Pushing Boundaries in Artistic Expression",
    description1: "",
    description2: "",
  });

  useEffect(() => {
    const fetchContent = async () => {
      const docRef = doc(db, "content", "about");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContent(docSnap.data());
      }
    };

    fetchContent();
  }, []);

  return (
    <div id="about" className="relative py-14 px-8 md:p-24">

      {/* Content Grid */}
      <div className="grid md:grid-cols-12 gap-16">
        {/* Image Side */}

        <img
          src="/images/ehsaas-hero.jpg"
          alt="Team Performance"
          className="w-full h-full object-cover hidden md:block col-span-5 rounded-xl"
        />

        {/* Text Content Side */}
        <article className="space-y-2 w-full md:col-span-7 text-neutral">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className=""
          >
            <div className="flex items-center gap-6">
              <h2 className={`text-4xl md:text-6xl m-0 mb-2 ${bonheurRoyale.className}`}>
                Our Story
              </h2>
              <div className="w-4/12 h-1 bg-red-500" />
            </div>

            <h4 className="m-0 text-2xl md:text-4xl font-bold italic">
              Pushing Boundaries in
              <span className={`${bonheurRoyale.className} text-5xl text-red-500`}> Artistic Expression</span>
            </h4>
          </motion.div>

          <p className="text-gray-800 text-lg">
            {content.description1}
          </p>

          <p className="text-gray-800 text-lg">
            {content.description2}
          </p>
        </article>

      </div >
    </div>
  );
};

export default AboutSection;