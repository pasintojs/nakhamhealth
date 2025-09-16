"use client";
import { useState } from "react";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import UpcomingEventsSection from "./components/UpcomingEventsSection";
import ServicesSection from "./components/ServicesSection";
import NewsSectionDynamic from "./components/NewsSection-Dynamic";
import AnimatedCallToAction from "./components/AnimatedCallToAction";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  return (
    <>
      <LoadingScreen onLoadingComplete={handleLoadingComplete} />

      <div
        className={`min-h-screen text-slate-900 bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))] transition-opacity duration-500 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <NavBar />
        <HeroSection />
        <UpcomingEventsSection />
        <NewsSectionDynamic />
        <ServicesSection />
        <AnimatedCallToAction />
        <Footer />
      </div>
    </>
  );
}
