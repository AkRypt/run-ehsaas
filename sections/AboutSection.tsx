"use client";

import { bonheurRoyale } from "@/app/fonts";
import { motion } from "framer-motion";

const AboutSection = () => {

  return (
    <section id="about" className="py-14 px-8 md:p-24">


      {/* Content Grid */}
      <div className="grid md:grid-cols-12 gap-16">
        {/* Image Side */}

        <img
          src="/images/ehsaas-hero.jpg"
          alt="Team Performance"
          className="w-full h-full object-cover hidden md:block col-span-5 rounded-xl"
        />


        {/* Text Content Side */}
        <article className="prose space-y-2 w-full md:col-span-7 text-neutral">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >

            <h2 className={`text-4xl md:text-6xl mb-2 ${bonheurRoyale.className}`}>
              Our Story
            </h2>
            <div className="w-4/12 h-1 bg-red-500" />
          </motion.div>

          <h4 className="text-2xl md:text-4xl italic">
            Pushing Boundaries in
            <span className={`${bonheurRoyale.className} text-5xl text-red-500`}> Artistic Expression</span>
          </h4>
          <p className="text-gray-800 text-lg">
            Ehsaas is a nationally competing colligate South-Asian dance team that was established in 2009 at Rutgers University-Newark.
            The team consists of members from both Rutgers University-Newark and the New Jersey Institute of Technology
            who train vigorously to improve their talent and display their love for dance. The team wishes to further spread their passion for
            Indian culture and dance through their performances and cultural events.
          </p>
          <p className="text-gray-800 text-lg">
            We came together for one reason. A reason that is an addiction. An addiction that makes us laugh, brings a smile, and drys our tears.
            Dance is our gateway to feel, express, and say things we can't with words. Moving together, synchronized as one, we dance united.
          </p>
        </article>
      </div>


    </section >
  );
};

export default AboutSection;