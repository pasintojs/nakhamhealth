import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import UpcomingEventsSection from "./components/UpcomingEventsSection";
import ServicesSection from "./components/ServicesSection";
import NewsSectionDynamic from "./components/NewsSection-Dynamic";
import AnimatedCallToAction from "./components/AnimatedCallToAction";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen text-slate-900 bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))]">
      <NavBar />
      <HeroSection />
      <UpcomingEventsSection />
      <NewsSectionDynamic />
      <ServicesSection />
      <AnimatedCallToAction />
      <Footer />
    </div>
  );
}
