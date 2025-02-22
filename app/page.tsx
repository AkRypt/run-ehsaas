"use client";

import AboutSection from '@/sections/AboutSection'
import HeroSection from '@/sections/HeroSection'
import Achievements from '@/sections/Achievements';
import CompPictures from '@/sections/CompPictures';
import Header from '@/sections/Header';

export default function Home() {
  return (
    <main className="text-neutral">

      <HeroSection />

      <AboutSection />

      <Achievements />

      <CompPictures />

    </main>
  )
}