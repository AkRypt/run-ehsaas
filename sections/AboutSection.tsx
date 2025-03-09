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
    <div id="about" className="relative py-20 px-8 md:p-24 bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-30 -z-10" />

      {/* Content Grid */}
      <div className="grid md:grid-cols-12 gap-16">
        {/* Image Side */}

        <img
          src={content?.img}
          alt="Team Performance"
          className="w-full h-full object-cover hidden md:block col-span-5 rounded-lg"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = '/images/placeholder.jpg';
          }}
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
                {content?.title}
              </h2>
              <div className="w-4/12 h-1 bg-red-500" />
            </div>

            <h4 className="text-2xl md:text-4xl font-bold text-gray-700">
              {content.subtitle.split("<red>")[0]}
              <span className={`${bonheurRoyale.className} text-5xl text-red-500 ml-2`}>
                {content.subtitle.split("<red>")[1]}
              </span>
            </h4>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-gray-600 text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-red-500 first-letter:mr-2 first-letter:float-left">
              {content.description1}
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              {content.description2}
            </p>
          </motion.div>

        </article>

      </div >
    </div>
  );
};

export default AboutSection;