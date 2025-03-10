"use client";

import AboutSection from '@/sections/AboutSection'
import HeroSection from '@/sections/HeroSection'
import Achievements from '@/sections/Achievements';
import CompPictures from '@/sections/CompPictures';

export default function Home() {
  return (
    <main className="text-neutral pb-20">

      <HeroSection />

      <AboutSection />

      <Achievements />

      <CompPictures />

    </main>
  )
}